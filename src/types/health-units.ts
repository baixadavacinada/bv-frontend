export type Geolocation = {
  lat: number
  lng: number
}

export type OperatingHours = {
  friday: string
  monday: string
  saturday: string
  sunday: string
  thursday: string
  tuesday: string
  wednesday: string
}

export type HealthUnit = {
  _id?: string
  id?: string | number
  address: string
  component?: string
  availableVaccines: string[]
  city: string
  geolocation: Geolocation
  isActive?: boolean
  isFavorite: boolean
  name: string
  neighborhood: string
  number?: string | number
  operatingHours: OperatingHours
  phone: string
  state: string
  zipCode: string
  averageWaitTime: string
  __v?: number
}

export type CreateHealthUnits = {
  name?: string
  address?: string
  neighborhood?: string
  city?: string
  state?: string
  zipCode?: string
  phone?: string
  operatingHours?: {
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
  }
  geolocation?: {
    lat: number | string
    lng: number | string
  }
  availableVaccines?: string[]
  isActive?: boolean
}
