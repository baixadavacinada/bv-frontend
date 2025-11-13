import { VaccineFromDB, HealthUnitFromDB, VaccinationFormData } from '@/schemas/vaccination-schema'
import { cacheService } from './cache-service'

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

  /**
   * Busca todas as vacinas ativas do banco (com cache)
   */
  async getAvailableVaccines(): Promise<VaccineFromDB[]> {
    try {
      // Tenta recuperar do cache primeiro
      const cachedVaccines = cacheService.getCache<VaccineFromDB[]>(VACCINES_CACHE_KEY)
      if (cachedVaccines) {
        return cachedVaccines
      }

      // Se não estiver em cache, busca da API
      const response = await fetch(`${this.baseUrl}/api/public/vaccines`)

      if (!response.ok) {
        throw new Error('Erro ao buscar vacinas')
      }

      const data = await response.json()

      const vaccines = Array.isArray(data)
        ? data.map((vaccine) => ({
            ...vaccine,
            id: vaccine._id || vaccine.id,
          }))
        : []

      // Salva em cache
      if (vaccines.length > 0) {
        cacheService.setCache(VACCINES_CACHE_KEY, vaccines)
      }

      return vaccines
    } catch (error) {
      console.error('Erro ao buscar vacinas:', error)
      return []
    }
  }

  /**
   * Busca uma vacina específica pelo ID
   */
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

  /**
   * Busca todas as unidades de saúde (UBS) ativas do banco (com cache de 1 semana)
   */
  async getAvailableHealthUnits(): Promise<HealthUnitFromDB[]> {
    try {
      // Tenta recuperar do cache primeiro
      const cachedHealthUnits = cacheService.getCache<HealthUnitFromDB[]>(HEALTH_UNITS_CACHE_KEY)
      if (cachedHealthUnits) {
        return cachedHealthUnits
      }

      // Se não estiver em cache, busca da API
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

      // Salva em cache (expira em 1 semana)
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

  /**
   * Salva o registro de vacinação no backend vinculado ao perfil do usuário
   */
  async saveVaccinationRecord(data: VaccinationFormData): Promise<VaccinationFormData> {
    try {
      // Primeiro salva localmente como backup
      const existingRecords = this.getLocalVaccinationRecords()
      const newRecord = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
      }

      const updatedRecords = [...existingRecords, newRecord]
      localStorage.setItem('vaccination_records', JSON.stringify(updatedRecords))

      // Depois tenta salvar no backend
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

        const response = await fetch(`${this.baseUrl}/api/public/user/vaccines`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Inclui cookies com auth
          body: JSON.stringify(vaccineData),
        })

        if (!response.ok) {
          console.warn('Erro ao salvar vacina no backend:', response.statusText)
          // Continua mesmo se falhar - dados estão salvos localmente
        }

        const result = await response.json()
        return result.data || data
      } catch (backendError) {
        console.warn('Erro ao comunicar com backend:', backendError)
        // Falha silenciosa - dados já foram salvos localmente
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
