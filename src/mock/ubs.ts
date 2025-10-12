export interface UbsData {
  id: number
  name: string
  neighborhood: string
  distanceInKm: number
  isFavorite: boolean
  address?: string
  phone?: string
  openingHours?: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  averageWaitTime?: string
  vaccines?: string[]
}

export const mockUbsData: UbsData[] = [
  {
    id: 1,
    name: 'UBS - JD. UNIVERSO',
    neighborhood: 'Jardim Universo',
    distanceInKm: 1.2,
    isFavorite: false,
    address: 'Rua das Flores, 123 - Jardim Universo',
    phone: '(11) 1234-5678',
    openingHours: {
      monday: '08:00 - 17:00',
      tuesday: '08:00 - 17:00',
      wednesday: '08:00 - 17:00',
      thursday: '08:00 - 17:00',
      friday: '08:00 - 17:00',
      saturday: '08:00 - 12:00',
      sunday: 'Fechado',
    },
    averageWaitTime: '25 minutos',
    vaccines: ['Influenza', 'Covid-19', 'Hepatite B', 'Sarampo', 'Febre Amarela', 'Tétano'],
  },
  {
    id: 2,
    name: 'UBS - VILA SUISSA',
    neighborhood: 'Vila Suissa',
    distanceInKm: 2.5,
    isFavorite: true,
    address: 'Av. Principal, 456 - Vila Suissa',
    phone: '(11) 2345-6789',
    openingHours: {
      monday: '08:00 - 17:00',
      tuesday: '08:00 - 17:00',
      wednesday: '08:00 - 17:00',
      thursday: '08:00 - 17:00',
      friday: '08:00 - 17:00',
      saturday: '08:00 - 12:00',
      sunday: 'Fechado',
    },
    averageWaitTime: '30 minutos',
    vaccines: ['Influenza', 'Covid-19', 'Hepatite B', 'Sarampo', 'Febre Amarela', 'Tétano'],
  },
  {
    id: 3,
    name: 'UBS - ALTO DO IPIRANGA',
    neighborhood: 'Alto do Ipiranga',
    distanceInKm: 3.1,
    isFavorite: false,
    address: 'Rua da Saúde, 789 - Alto do Ipiranga',
    phone: '(11) 3456-7890',
    openingHours: {
      monday: '08:00 - 17:00',
      tuesday: '08:00 - 17:00',
      wednesday: '08:00 - 17:00',
      thursday: '08:00 - 17:00',
      friday: '08:00 - 17:00',
      saturday: '08:00 - 12:00',
      sunday: 'Fechado',
    },
    averageWaitTime: '35 minutos',
    vaccines: ['Influenza', 'Covid-19', 'Hepatite B', 'Sarampo', 'Febre Amarela', 'Tétano'],
  },
  {
    id: 4,
    name: 'UBS - PONTE GRANDE',
    neighborhood: 'Ponte Grande',
    distanceInKm: 4.8,
    isFavorite: false,
    address: 'Rua da Ponte, 321 - Ponte Grande',
    phone: '(11) 4567-8901',
    openingHours: {
      monday: '08:00 - 17:00',
      tuesday: '08:00 - 17:00',
      wednesday: '08:00 - 17:00',
      thursday: '08:00 - 17:00',
      friday: '08:00 - 17:00',
      saturday: '08:00 - 12:00',
      sunday: 'Fechado',
    },
    averageWaitTime: '40 minutos',
    vaccines: ['Influenza', 'Covid-19', 'Hepatite B', 'Sarampo', 'Febre Amarela', 'Tétano'],
  },
]
