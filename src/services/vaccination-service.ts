import { VaccineFromDB, HealthUnitFromDB, VaccinationFormData } from '@/schemas/vaccination-schema'

/**
 * Serviço para gerenciar dados de vacinação
 */
export class VaccinationService {
  private static instance: VaccinationService
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  static getInstance(): VaccinationService {
    if (!VaccinationService.instance) {
      VaccinationService.instance = new VaccinationService()
    }
    return VaccinationService.instance
  }

  /**
   * Busca todas as vacinas ativas do banco
   */
  async getAvailableVaccines(): Promise<VaccineFromDB[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/public/vaccines`)

      if (!response.ok) {
        throw new Error('Erro ao buscar vacinas')
      }

      const data = await response.json()

      // A API retorna um array direto de vacinas
      return Array.isArray(data)
        ? data.map((vaccine) => ({
            ...vaccine,
            id: vaccine._id || vaccine.id,
          }))
        : []
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
   * Busca todas as UBS ativas
   */
  async getAvailableHealthUnits(): Promise<HealthUnitFromDB[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/public/health-units`)

      if (!response.ok) {
        throw new Error('Erro ao buscar UBS')
      }

      const data = await response.json()

      // A API pode retornar um array direto ou um objeto com healthUnits
      const healthUnits = Array.isArray(data) ? data : data.healthUnits || []
      return healthUnits.map((unit: HealthUnitFromDB & { _id?: string }) => ({
        ...unit,
        id: unit._id || unit.id,
      }))
    } catch (error) {
      console.error('Erro ao buscar UBS:', error)
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
   * Salva o registro de vacinação localmente
   * TODO: Integrar com backend quando necessário
   */
  saveVaccinationRecord(data: VaccinationFormData): void {
    try {
      const existingRecords = this.getLocalVaccinationRecords()
      const newRecord = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
      }

      const updatedRecords = [...existingRecords, newRecord]
      localStorage.setItem('vaccination_records', JSON.stringify(updatedRecords))
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
