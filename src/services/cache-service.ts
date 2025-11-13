/**
 * Serviço de cache com expira\u00e7\u00e3o para dados
 */

const CACHE_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000 // 1 semana em ms

interface CachedData<T> {
  data: T
  timestamp: number
}

export class CacheService {
  private static instance: CacheService

  static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService()
    }
    return CacheService.instance
  }

  /**
   * Salva dados em cache com timestamp
   */
  setCache<T>(key: string, data: T): void {
    try {
      const cachedData: CachedData<T> = {
        data,
        timestamp: Date.now(),
      }
      localStorage.setItem(key, JSON.stringify(cachedData))
    } catch (error) {
      console.error(`Erro ao salvar cache para chave ${key}:`, error)
    }
  }

  /**
   * Recupera dados em cache se ainda forem válidos
   */
  getCache<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key)
      if (!item) {
        return null
      }

      const cachedData: CachedData<T> = JSON.parse(item)
      const now = Date.now()
      const age = now - cachedData.timestamp

      // Verifica se o cache ainda é válido (menos de 1 semana)
      if (age > CACHE_EXPIRATION_TIME) {
        // Cache expirou, remover
        localStorage.removeItem(key)
        return null
      }

      return cachedData.data
    } catch (error) {
      console.error(`Erro ao recuperar cache para chave ${key}:`, error)
      return null
    }
  }

  /**
   * Remove cache de uma chave específica
   */
  removeCache(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Erro ao remover cache para chave ${key}:`, error)
    }
  }

  /**
   * Limpa todo o cache
   */
  clearAllCache(): void {
    try {
      const keys: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && (key.startsWith('cache_') || key.startsWith('vaccination_'))) {
          keys.push(key)
        }
      }
      keys.forEach((key) => localStorage.removeItem(key))
    } catch (error) {
      console.error('Erro ao limpar cache:', error)
    }
  }

  /**
   * Retorna o tempo até expiração em ms
   */
  getTimeToExpiration(key: string): number {
    try {
      const item = localStorage.getItem(key)
      if (!item) {
        return 0
      }

      const cachedData: CachedData<unknown> = JSON.parse(item)
      const now = Date.now()
      const age = now - cachedData.timestamp
      const timeLeft = CACHE_EXPIRATION_TIME - age

      return Math.max(0, timeLeft)
    } catch {
      return 0
    }
  }
}

export const cacheService = CacheService.getInstance()
