export interface CardData {
  id: string
  title: string
  description: string
  icon?: string
  onClick: () => void
}

export interface EducationalMaterial {
  id: string
  title: string
  description: string
  image: string
  onClick?: () => void
}

export interface EducationalMaterialData {
  id: string
  title: string
  description: string
  image: string
}
