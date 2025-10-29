export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const MAX_FILE_SIZE_MB = MAX_FILE_SIZE / (1024 * 1024)

export const FILE_TYPE_CONFIG = {
  'application/pdf': { extensions: ['.pdf'], icon: 'pdf', color: 'text-red-500' },
  'image/jpeg': { extensions: ['.jpg', '.jpeg'], icon: 'image', color: 'text-blue-500' },
  'image/png': { extensions: ['.png'], icon: 'image', color: 'text-blue-500' },
  'image/gif': { extensions: ['.gif'], icon: 'image', color: 'text-blue-500' },
  'image/webp': { extensions: ['.webp'], icon: 'image', color: 'text-blue-500' },
} as const

export const getAcceptedTypes = () =>
  Object.values(FILE_TYPE_CONFIG)
    .flatMap((config) => config.extensions)
    .join(',')

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export const validateFile = (file: File): string | null => {
  const isValidType = Object.keys(FILE_TYPE_CONFIG).includes(file.type)

  if (!isValidType) {
    return 'Tipo de arquivo não suportado. Use PDF ou imagens (JPG, PNG, GIF, WebP)'
  }

  if (file.size > MAX_FILE_SIZE) {
    return `Arquivo muito grande. Tamanho máximo: ${MAX_FILE_SIZE_MB}MB`
  }

  return null
}
