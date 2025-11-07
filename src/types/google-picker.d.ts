declare global {
  interface Window {
    google?: {
      picker: {
        PickerBuilder: new () => PickerBuilderType
        DocsUploadView: new () => DocsUploadViewType
        DocsView: new () => DocsViewType
        Action: {
          PICKED: string
          CANCEL: string
          [key: string]: string
        }
      }
      accounts?: {
        id?: {
          initialize: (config: Record<string, unknown>) => void
          prompt: (callback: (response: unknown) => void) => void
          renderButton: (element: HTMLElement, config: Record<string, unknown>) => void
        }
      }
    }
    gapi?: {
      load: (api: string, callback: () => void) => void
      client?: {
        setApiKey: (key: string) => void
        load: (api: string, version: string) => Promise<void>
        drive?: {
          files?: {
            get: (options: Record<string, unknown>) => Promise<unknown>
            list: (options: Record<string, unknown>) => Promise<unknown>
            create: (options: Record<string, unknown>) => Promise<unknown>
          }
        }
      }
    }
  }
}

interface PickerBuilderType {
  addView: (view: DocsUploadViewType | DocsViewType) => PickerBuilderType
  setOAuthToken: (token: string) => PickerBuilderType
  setDeveloperKey: (key: string) => PickerBuilderType
  setCallback: (callback: (data: Record<string, unknown>) => void) => PickerBuilderType
  build: () => PickerType
}

interface DocsUploadViewType {
  setParent: (folderId: string) => DocsUploadViewType
}

interface DocsViewType {
  readonly _empty: never
}

interface PickerType {
  setVisible: (visible: boolean) => void
}

export {}
