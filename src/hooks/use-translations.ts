import { useTranslations } from 'next-intl'

export const useAppTranslations = () => {
  const t = useTranslations()

  return {
    common: useTranslations('common'),
    navigation: useTranslations('navigation'),
    components: useTranslations('components'),
    accessibility: useTranslations('accessibility'),
    // Helper para textos com interpolação
    format: (key: string, values?: Record<string, string | number>) => t(key, values),
  }
}
