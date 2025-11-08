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
  _id: string
  id?: string | number
  address: string
  component?: string
  availableVaccines: unknown[]
  city: string
  geolocation: Geolocation
  isActive: boolean
  isFavorite: boolean
  name: string
  neighborhood: string
  operatingHours: OperatingHours
  phone: string
  state: string
  zipCode: string
  averageWaitTime: string
  __v: number
}
