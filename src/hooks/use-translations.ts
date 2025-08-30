import { useTranslations } from 'next-intl'

export const useAppTranslations = () => {
  const t = useTranslations()

  return {
    common: useTranslations('common'),
    navigation: useTranslations('navigation'),
    accessibility: useTranslations('accessibility'),
    home: useTranslations('home'),
    educationalMaterials: useTranslations('educationalMaterials'),
    cards: useTranslations('cards'),

    // Helper para textos com interpolação
    format: (key: string, values?: Record<string, string | number>) => t(key, values),
  }
}
