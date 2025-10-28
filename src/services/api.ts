import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { GetServerSidePropsContext, NextPageContext } from 'next'
import { parseCookies } from 'nookies'

interface ApiErrorResponse {
  success: false
  error: {
    message: string
    code?: string
  }
  statusCode: number
}

interface ApiSuccessResponse<T = unknown> {
  success: true
  data: T
}

type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response.data
}

const onResponseError = async (error: AxiosError<ApiErrorResponse>): Promise<AxiosError> => {
  if (error.response?.status === 401) {
    if (typeof window !== 'undefined') {
      document.cookie = 'firebase-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      window.location.href = '/login'
    }
  }

  return Promise.reject(error)
}

export function setupAPIClient(
  ctx: NextPageContext | GetServerSidePropsContext | undefined = undefined,
): AxiosInstance {
  const cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  api.interceptors.response.use(onResponse, onResponseError)

  const firebaseToken = cookies['firebase-token']
  if (firebaseToken) {
    api.defaults.headers.Authorization = `Bearer ${firebaseToken}`
  }

  if (typeof window !== 'undefined') {
    api.interceptors.request.use((config) => {
      if (!config.headers.Authorization) {
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`
          const parts = value.split(`; ${name}=`)
          if (parts.length === 2) return parts.pop()?.split(';').shift()
        }

        const token = getCookie('firebase-token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    })
  }

  return api
}

export const api = setupAPIClient()

// Classe para gerenciar requisições da API com tipagem
export class ApiClient {
  private baseURL: string

  constructor(baseURL?: string) {
    this.baseURL = baseURL || process.env.NEXT_PUBLIC_API_BASE_URL || ''
  }

  private async request<T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const getCookie = (name: string) => {
      if (typeof document === 'undefined') return null
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop()?.split(';').shift()
    }

    const token = getCookie('firebase-token')

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, config)

    if (response.status === 401) {
      if (typeof document !== 'undefined') {
        document.cookie = 'firebase-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        window.location.href = '/login'
      }
      throw new Error('Não autorizado')
    }

    const data: ApiResponse<T> = await response.json()

    if (!data.success) {
      throw new Error(data.error.message)
    }

    return data.data
  }

  async get<T = unknown>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint)
  }

  async post<T = unknown>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T = unknown>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T = unknown>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T = unknown>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    })
  }
}

export const apiClient = new ApiClient()
