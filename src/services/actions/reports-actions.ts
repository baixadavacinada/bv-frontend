'use server'

interface FeedbackReportRequest {
  ubsId?: string
  startDate?: string
  endDate?: string
}

interface UserReportRequest {
  roleFilter?: string
  statusFilter?: 'active' | 'inactive' | 'all'
}
export async function generateFeedbackReport(params: FeedbackReportRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

    if (!baseUrl) {
      throw new Error('URL da API não configurada')
    }

    const endpoint = '/api/admin/reports/feedbacks'
    const url = `${baseUrl}${endpoint}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      let errorMessage = `Erro ${response.status} ao gerar relatório`
      try {
        const error = await response.json()
        errorMessage = error.message || errorMessage
      } catch {
        const text = await response.text()
        errorMessage = text || errorMessage
      }
      throw new Error(errorMessage)
    }

    const blob = await response.blob()
    return {
      success: true,
      blob,
      filename: `relatorio-feedbacks-${new Date().toISOString().split('T')[0]}.csv`,
    }
  } catch (error) {
    console.error('Erro ao gerar relatório de feedbacks:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao gerar relatório',
    }
  }
}

export async function generateUserReport(params: UserReportRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

    if (!baseUrl) {
      throw new Error('URL da API não configurada')
    }

    const endpoint = '/api/admin/reports/users'
    const url = `${baseUrl}${endpoint}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      let errorMessage = `Erro ${response.status} ao gerar relatório`
      try {
        const error = await response.json()
        errorMessage = error.message || errorMessage
      } catch {
        const text = await response.text()
        errorMessage = text || errorMessage
      }
      throw new Error(errorMessage)
    }

    const blob = await response.blob()
    return {
      success: true,
      blob,
      filename: `relatorio-usuarios-${new Date().toISOString().split('T')[0]}.csv`,
    }
  } catch (error) {
    console.error('Erro ao gerar relatório de usuários:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao gerar relatório',
    }
  }
}
