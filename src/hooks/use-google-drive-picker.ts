import { useCallback, useEffect, useState } from 'react'

interface GoogleDrivePickerConfig {
  apiKey: string
  clientId: string
  folderId?: string
}

interface DriveFile {
  id: string
  name: string
  mimeType: string
  webViewLink: string
}

interface PickerCallbackData {
  action: string
  docs?: Array<{
    id: string
    name: string
    mimeType: string
    url: string
  }>
}

export function useGoogleDrivePicker(config: GoogleDrivePickerConfig) {
  const [pickerLoaded, setPickerLoaded] = useState(false)

  // Carregar Google Picker API
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/picker-and-drive-upload.js'
    script.async = true
    script.defer = true
    script.onload = () => {
      setPickerLoaded(true)
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Carregar Google API Client
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/api.js'
    script.async = true
    script.defer = true
    script.onload = () => {
      if (window.gapi?.load) {
        window.gapi.load('client', () => {
          window.gapi?.client?.setApiKey(config.apiKey)
        })
      }
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [config.apiKey])

  const openPicker = useCallback(
    (onFileSelected: (file: DriveFile) => void, onError?: (error: string) => void) => {
      if (!pickerLoaded || !window.google?.picker) {
        onError?.('Google Picker não foi carregado')
        return
      }

      const picker = new window.google.picker.PickerBuilder()
        .addView(new window.google.picker.DocsUploadView().setParent(config.folderId || 'root'))
        .addView(new window.google.picker.DocsView())
        .setOAuthToken(localStorage.getItem('firebase-token') || '')
        .setDeveloperKey(config.apiKey)
        .setCallback((data: Record<string, unknown>) => {
          const pickerData = data as unknown as PickerCallbackData
          if (pickerData.action === window.google?.picker?.Action?.PICKED) {
            const fileData = pickerData.docs?.[0]
            if (fileData) {
              onFileSelected({
                id: fileData.id,
                name: fileData.name,
                mimeType: fileData.mimeType,
                webViewLink: fileData.url,
              })
            }
          } else if (pickerData.action === window.google?.picker?.Action?.CANCEL) {
            onError?.('Seleção cancelada')
          }
        })
        .build()

      picker.setVisible(true)
    },
    [pickerLoaded, config.apiKey, config.folderId],
  )

  return {
    openPicker,
    pickerLoaded,
  }
}
