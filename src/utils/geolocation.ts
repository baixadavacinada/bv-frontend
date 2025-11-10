/**
 * Utilitários para cálculos de geolocalização
 */

export interface Coordinates {
  latitude: number
  longitude: number
}

/**
 * Calcula a distância entre duas coordenadas em quilômetros
 * Usa a fórmula de Haversine
 * @param coord1 - Primeira coordenada
 * @param coord2 - Segunda coordenada
 * @returns Distância em quilômetros
 */
export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371 // Raio da Terra em km

  const dLat = toRad(coord2.latitude - coord1.latitude)
  const dLon = toRad(coord2.longitude - coord1.longitude)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.latitude)) *
      Math.cos(toRad(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return Math.round(distance * 100) / 100 // Arredondar para 2 casas decimais
}

/**
 * Converte graus para radianos
 */
function toRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Ordena um array de objetos com coordenadas pela distância de um ponto
 * @param items - Array de itens com propriedades latitude e longitude
 * @param userCoords - Coordenadas do usuário
 * @param coordKeys - Chaves dos objetos que contêm latitude e longitude
 * @returns Array ordenado pela distância
 */
export function sortByDistance<T extends object>(
  items: T[],
  userCoords: Coordinates,
  coordKeys: { lat: string; lng: string } = {
    lat: 'latitude',
    lng: 'longitude',
  },
): Array<T & { distance: number }> {
  return items
    .map((item) => {
      const itemCoords: Coordinates = {
        latitude: (item[coordKeys.lat as keyof T] as unknown as number) || 0,
        longitude: (item[coordKeys.lng as keyof T] as unknown as number) || 0,
      }

      return {
        ...item,
        distance: calculateDistance(userCoords, itemCoords),
      }
    })
    .sort((a, b) => a.distance - b.distance)
}

/**
 * Filtra itens que estão dentro de um raio especificado
 * @param items - Array de itens com coordenadas
 * @param userCoords - Coordenadas do usuário
 * @param radiusKm - Raio em quilômetros
 * @returns Array filtrado
 */
export function filterByRadius<T extends object>(
  items: T[],
  userCoords: Coordinates,
  radiusKm: number,
  coordKeys: { lat: string; lng: string } = {
    lat: 'latitude',
    lng: 'longitude',
  },
): T[] {
  return items.filter((item) => {
    const itemCoords: Coordinates = {
      latitude: (item[coordKeys.lat as keyof T] as unknown as number) || 0,
      longitude: (item[coordKeys.lng as keyof T] as unknown as number) || 0,
    }

    return calculateDistance(userCoords, itemCoords) <= radiusKm
  })
}
