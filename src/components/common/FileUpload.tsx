import React, { useState, useRef, useCallback, forwardRef, useImperativeHandle } from 'react'
import { Upload, X, FileText, Image as ImageIcon, File } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'
import { useAccessibilityValidation, useLiveRegion } from '@/hooks/use-accessibility'
import { AccessibilityAnnouncement, generateCardAriaLabel } from '@/utils/accessibility'
import { BvButton } from '../design/BvButton'
import {
  FILE_TYPE_CONFIG,
  formatFileSize,
  getAcceptedTypes,
  MAX_FILE_SIZE_MB,
  validateFile,
} from '@/utils/file-upload'

interface UploadedFile {
  file: File
  preview?: string
}

interface FileUploadProps {
  onFileSelect?: (file: File | null) => void
  error?: string
}

export interface FileUploadRef {
  getFile: () => File | null
  clearFile: () => void
}

const getFileIcon = (fileType: string) => {
  const config = FILE_TYPE_CONFIG[fileType as keyof typeof FILE_TYPE_CONFIG]
  const iconProps = { className: `h-12 w-12 ${config?.color || 'text-gray-500'}` }

  switch (config?.icon) {
    case 'pdf':
      return <FileText {...iconProps} />
    case 'image':
      return <ImageIcon {...iconProps} />
    default:
      return <File {...iconProps} />
  }
}

const FileUpload = forwardRef<FileUploadRef, FileUploadProps>(({ onFileSelect, error }, ref) => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Hooks de acessibilidade
  const { isValidating } = useAccessibilityValidation({
    enabled: process.env.NODE_ENV === 'development',
    delay: 500,
    logLevel: 'info',
  })

  const { announceToScreenReader, announceError, announceSuccess } = useLiveRegion()

  // IDs únicos para acessibilidade
  const componentId = React.useId()
  const uploadAreaId = `file-upload-area-${componentId}`
  const statusId = `file-upload-status-${componentId}`
  const errorId = `file-upload-error-${componentId}`

  // Expor métodos via ref
  useImperativeHandle(ref, () => ({
    getFile: () => uploadedFile?.file || null,
    clearFile: () => removeFile(),
  }))

  const createFilePreview = useCallback((file: File): Promise<UploadedFile> => {
    return new Promise((resolve, reject) => {
      const fileData: UploadedFile = { file }

      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          fileData.preview = reader.result as string
          resolve(fileData)
        }
        reader.onerror = () => {
          reject(new Error('Erro ao ler o arquivo de imagem'))
        }
        reader.readAsDataURL(file)
      } else {
        resolve(fileData)
      }
    })
  }, [])

  const handleFile = useCallback(
    async (file: File) => {
      const validationError = validateFile(file)

      if (validationError) {
        toast.error(validationError)
        announceError(validationError)
        return
      }

      setIsProcessing(true)
      announceToScreenReader('Processando arquivo...', 'polite')

      try {
        const fileData = await createFilePreview(file)
        setUploadedFile(fileData)
        onFileSelect?.(file)

        const successMessage = `Arquivo ${file.name} selecionado com sucesso`
        announceSuccess(successMessage)

        // Anunciar detalhes do arquivo para leitores de tela
        const fileDetails = `Arquivo: ${file.name}, Tamanho: ${formatFileSize(file.size)}, Tipo: ${file.type}`
        announceToScreenReader(fileDetails, 'polite')
      } catch (error) {
        const errorMessage = 'Erro ao processar o arquivo'
        toast.error(errorMessage)
        announceError(errorMessage)
        console.error('File processing error:', error)
      } finally {
        setIsProcessing(false)
      }
    },
    [createFilePreview, onFileSelect, announceError, announceSuccess, announceToScreenReader],
  )

  const handleDragEvents = {
    onDrop: useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        const file = e.dataTransfer.files[0]
        if (file) {
          announceToScreenReader('Arquivo recebido por drag and drop', 'polite')
          handleFile(file)
        }
      },
      [handleFile, announceToScreenReader],
    ),

    onDragOver: useCallback((e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(true)
    }, []),

    onDragLeave: useCallback(() => {
      setIsDragging(false)
    }, []),

    onDragEnter: useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
        announceToScreenReader('Arquivo detectado sobre a área de upload', 'polite')
      },
      [announceToScreenReader],
    ),
  }

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        announceToScreenReader('Arquivo selecionado via navegador de arquivos', 'polite')
        handleFile(file)
      }
    },
    [handleFile, announceToScreenReader],
  )

  const removeFile = useCallback(() => {
    if (uploadedFile) {
      const fileName = uploadedFile.file.name
      setUploadedFile(null)
      onFileSelect?.(null)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      const removeMessage = `Arquivo ${fileName} removido`
      announceToScreenReader(removeMessage, 'polite')

      // Retorna foco para a área de upload
      setTimeout(() => {
        const uploadArea = document.getElementById(uploadAreaId)
        uploadArea?.focus()
      }, 100)
    }
  }, [uploadedFile, onFileSelect, announceToScreenReader, uploadAreaId])

  const openFileDialog = useCallback(() => {
    announceToScreenReader('Abrindo seletor de arquivos', 'polite')
    fileInputRef.current?.click()
  }, [announceToScreenReader])

  const uploadAreaAriaLabel = generateCardAriaLabel(
    'Área de upload de arquivo',
    `Clique para selecionar ou arraste um arquivo aqui. Tipos aceitos: PDF ou imagens. Tamanho máximo: ${MAX_FILE_SIZE_MB}MB`,
    `Área de upload de arquivo. Clique para selecionar ou arraste um arquivo aqui. Tipos aceitos: PDF ou imagens. Tamanho máximo: ${MAX_FILE_SIZE_MB}MB.`,
  )

  const renderUploadArea = () => (
    <div
      id={uploadAreaId}
      onClick={openFileDialog}
      {...handleDragEvents}
      className={`cursor-pointer rounded-md border p-8 text-center transition-all duration-200 ease-in-out ${
        isDragging ? 'border-primary bg-blue-50' : 'border-gray-300 bg-white hover:border-gray-400'
      } ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          openFileDialog()
        }
      }}
      aria-label={uploadAreaAriaLabel}
      aria-describedby={`${statusId} ${error ? errorId : ''}`}
      aria-disabled={isProcessing}
    >
      <div className="flex flex-col items-center space-y-4">
        <Upload
          className={`h-10 w-10 ${isDragging ? 'text-primary' : 'text-gray-400'}`}
          aria-hidden="true"
        />
        <div className="space-y-2">
          <p className="text-base font-medium text-gray-700">
            {isProcessing
              ? 'Processando arquivo...'
              : 'Arraste e solte o arquivo aqui ou selecione o arquivo'}
          </p>
          <p className="text-sm text-gray-500">PDF ou imagem • Máx. {MAX_FILE_SIZE_MB}MB</p>
        </div>
      </div>
    </div>
  )

  const renderFilePreview = () => {
    if (!uploadedFile) return null

    const fileAriaLabel = `Arquivo selecionado: ${uploadedFile.file.name}, ${formatFileSize(uploadedFile.file.size)}`

    return (
      <div
        className="rounded-lg border-2 border-gray-200 bg-white p-6"
        role="region"
        aria-label={fileAriaLabel}
        aria-describedby={statusId}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-start gap-4">
            {uploadedFile.preview ? (
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={uploadedFile.preview}
                  alt={`Preview do arquivo ${uploadedFile.file.name}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            ) : (
              <div className="flex-shrink-0" aria-hidden="true">
                {getFileIcon(uploadedFile.file.type)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-gray-900" id={`filename-${componentId}`}>
                {uploadedFile.file.name}
              </p>
              <p className="text-sm text-gray-500" id={`filesize-${componentId}`}>
                {formatFileSize(uploadedFile.file.size)}
              </p>
            </div>
          </div>
          <BvButton
            onClick={removeFile}
            className="rounded-full p-0 hover:bg-gray-100"
            aria-label={`Remover arquivo ${uploadedFile.file.name}`}
            aria-describedby={`filename-${componentId} filesize-${componentId}`}
            type="button"
            variant="ghost"
            size="icon"
            leftIcon={<X className="size-5" aria-hidden="true" />}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label className="block text-base font-semibold text-gray-900">Arquivo</label>

      {/* Região de status para leitores de tela */}
      <div id={statusId} className="sr-only" aria-live="polite" aria-atomic="true">
        {isProcessing && 'Processando arquivo...'}
        {uploadedFile && `Arquivo ${uploadedFile.file.name} selecionado com sucesso`}
        {isDragging && 'Arquivo sobre a área de upload'}
      </div>

      {/* Anúncios de acessibilidade */}
      {isValidating && (
        <AccessibilityAnnouncement
          message="Validando acessibilidade do componente de upload"
          priority="polite"
        />
      )}

      {!uploadedFile ? renderUploadArea() : renderFilePreview()}

      {error && (
        <div role="alert" aria-live="assertive">
          <p id={errorId} className="text-sm text-red-500">
            {error}
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleInputChange}
        accept={getAcceptedTypes()}
        className="hidden"
        aria-hidden="true"
        aria-label="Seletor de arquivo oculto"
      />

      {/* Instruções adicionais para leitores de tela */}
      <div className="sr-only">
        <p>
          Instruções para upload de arquivo: Você pode clicar na área de upload, usar a tecla Enter
          ou Espaço, ou arrastar e soltar um arquivo diretamente na área. Tipos de arquivo aceitos:{' '}
          {Object.values(FILE_TYPE_CONFIG)
            .flatMap((config) => config.extensions)
            .join(', ')}
          . Tamanho máximo: {MAX_FILE_SIZE_MB}MB.
        </p>
      </div>
    </div>
  )
})

FileUpload.displayName = 'FileUpload'

export default FileUpload
