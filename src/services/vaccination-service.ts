import { VaccineFromDB, HealthUnitFromDB, VaccinationFormData } from '@/schemas/vaccination-schema'
import { cacheService } from './cache-service'
import { apiClient } from './api'

const HEALTH_UNITS_CACHE_KEY = 'cache_health_units'
const VACCINES_CACHE_KEY = 'cache_vaccines'

/**
 * Serviço para gerenciar dados de vacinação
 */
export class VaccinationService {
  private static instance: VaccinationService
  private baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  static getInstance(): VaccinationService {
    if (!VaccinationService.instance) {
      VaccinationService.instance = new VaccinationService()
    }
    return VaccinationService.instance
  }

  async getAvailableVaccines(): Promise<VaccineFromDB[]> {
    try {
      const cachedVaccines = cacheService.getCache<VaccineFromDB[]>(VACCINES_CACHE_KEY)
      if (cachedVaccines && Array.isArray(cachedVaccines) && cachedVaccines.length > 0) {
        console.log('Retornando vacinas do cache:', cachedVaccines)
        return cachedVaccines
      }

      console.log('Buscando vacinas da API em:', `${this.baseUrl}/api/public/vaccines`)
      const response = await fetch(`${this.baseUrl}/api/public/vaccines`)

      if (!response.ok) {
        throw new Error('Erro ao buscar vacinas')
      }

      const data = await response.json()
      console.log('Resposta da API:', data)

      let vaccines: VaccineFromDB[] = []

      // Handle different response formats
      if (Array.isArray(data)) {
        console.log('Formato: Array direto')
        vaccines = data.map((vaccine: VaccineFromDB) => ({
          ...vaccine,
          id: vaccine._id || vaccine.id,
        }))
      } else if (data?.success === true && data?.data && Array.isArray(data.data)) {
        console.log('Formato: {success: true, data: [...]}')
        vaccines = data.data.map((vaccine: VaccineFromDB) => ({
          ...vaccine,
          id: vaccine._id || vaccine.id,
        }))
      } else if (data?.data && Array.isArray(data.data)) {
        console.log('Formato: data.data é array')
        vaccines = data.data.map((vaccine: VaccineFromDB) => ({
          ...vaccine,
          id: vaccine._id || vaccine.id,
        }))
      } else if (data?.vaccines && Array.isArray(data.vaccines)) {
        console.log('Formato: data.vaccines é array')
        vaccines = data.vaccines.map((vaccine: VaccineFromDB) => ({
          ...vaccine,
          id: vaccine._id || vaccine.id,
        }))
      } else {
        console.warn('Formato desconhecido:', data)
        console.warn('Tipo de data:', typeof data)
        vaccines = []
      }

      console.log('Vacinas processadas:', vaccines)

      if (vaccines.length > 0) {
        cacheService.setCache(VACCINES_CACHE_KEY, vaccines)
      }

      return vaccines
    } catch (error) {
      console.error('Erro ao buscar vacinas:', error)
      return []
    }
  }

  clearVaccinesCache(): void {
    cacheService.removeCache(VACCINES_CACHE_KEY)
  }

  async getVaccineById(id: string): Promise<VaccineFromDB | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/admin/vaccines/${id}`)

      if (!response.ok) {
        return null
      }

      const data = await response.json()
      const vaccine = data.vaccine || data
      return vaccine ? { ...vaccine, id: vaccine._id || vaccine.id } : null
    } catch (error) {
      console.error('Erro ao buscar vacina:', error)
      return null
    }
  }

  async getAvailableHealthUnits(): Promise<HealthUnitFromDB[]> {
    try {
      const cachedHealthUnits = cacheService.getCache<HealthUnitFromDB[]>(HEALTH_UNITS_CACHE_KEY)
      if (cachedHealthUnits) {
        return cachedHealthUnits
      }

      const url = `${this.baseUrl}/api/public/health-units`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Erro ao buscar unidades de saúde')
      }

      const data = await response.json()

      const healthUnits = Array.isArray(data)
        ? data.map((unit) => ({
            ...unit,
            id: unit._id || unit.id,
          }))
        : []

      if (healthUnits.length > 0) {
        cacheService.setCache(HEALTH_UNITS_CACHE_KEY, healthUnits)
      }

      return healthUnits
    } catch (error) {
      console.error('Erro ao buscar unidades de saúde:', error)
      return []
    }
  }

  /**
   * Busca uma UBS específica pelo ID
   */
  async getHealthUnitById(id: string): Promise<HealthUnitFromDB | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/public/health-units/${id}`)

      if (!response.ok) {
        return null
      }

      const data = await response.json()
      const healthUnit = data.healthUnit || data
      return healthUnit ? { ...healthUnit, id: healthUnit._id || healthUnit.id } : null
    } catch (error) {
      console.error('Erro ao buscar UBS:', error)
      return null
    }
  }

  async saveVaccinationRecord(data: VaccinationFormData): Promise<VaccinationFormData> {
    try {
      const existingRecords = this.getLocalVaccinationRecords()
      const newRecord = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
      }

      const updatedRecords = [...existingRecords, newRecord]
      localStorage.setItem('vaccination_records', JSON.stringify(updatedRecords))

      try {
        const vaccineData = {
          vaccineId: data.vaccineId || Date.now().toString(),
          vaccineName: data.vaccineName,
          manufacturer: data.manufacturer || undefined,
          dose: data.dose,
          batchNumber: data.batchNumber || undefined,
          applicationDate: data.applicationDate,
          healthUnitName: data.healthUnitName || data.customLocation,
          city: data.city || data.customCity,
          state: data.state || data.customState,
        }

        const result = await apiClient.post<VaccinationFormData>(
          '/api/public/user/vaccines',
          vaccineData,
        )
        return result || data
      } catch (backendError) {
        console.warn('Erro ao comunicar com backend:', backendError)
        return data
      }
    } catch (error) {
      console.error('Erro ao salvar registro de vacinação:', error)
      throw new Error('Não foi possível salvar o registro')
    }
  }

  /**
   * Recupera registros de vacinação salvos localmente
   */
  getLocalVaccinationRecords(): (VaccinationFormData & { id: string; createdAt: string })[] {
    try {
      const records = localStorage.getItem('vaccination_records')
      return records ? JSON.parse(records) : []
    } catch (error) {
      console.error('Erro ao recuperar registros:', error)
      return []
    }
  }

  /**
   * Remove um registro específico
   */
  removeVaccinationRecord(id: string): void {
    try {
      const existingRecords = this.getLocalVaccinationRecords()
      const updatedRecords = existingRecords.filter((record) => record.id !== id)
      localStorage.setItem('vaccination_records', JSON.stringify(updatedRecords))
    } catch (error) {
      console.error('Erro ao remover registro:', error)
      throw new Error('Não foi possível remover o registro')
    }
  }

  /**
   * Busca vacinas por nome (para autocomplete)
   */
  async searchVaccinesByName(query: string): Promise<VaccineFromDB[]> {
    try {
      const vaccines = await this.getAvailableVaccines()
      return vaccines.filter(
        (vaccine) =>
          vaccine.name.toLowerCase().includes(query.toLowerCase()) ||
          vaccine.manufacturer.toLowerCase().includes(query.toLowerCase()),
      )
    } catch (error) {
      console.error('Erro ao buscar vacinas por nome:', error)
      return []
    }
  }

  /**
   * Busca UBS por nome ou cidade
   */
  async searchHealthUnitsByName(query: string): Promise<HealthUnitFromDB[]> {
    try {
      const healthUnits = await this.getAvailableHealthUnits()
      return healthUnits.filter(
        (unit) =>
          unit.name.toLowerCase().includes(query.toLowerCase()) ||
          unit.city.toLowerCase().includes(query.toLowerCase()) ||
          unit.neighborhood.toLowerCase().includes(query.toLowerCase()),
      )
    } catch (error) {
      console.error('Erro ao buscar UBS por nome:', error)
      return []
    }
  }
}

export const vaccinationService = VaccinationService.getInstance()
