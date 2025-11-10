'use server'

import { FeedbackFormData } from '@/schemas'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

/**
 * Submeter feedback/avaliação de uma UBS
 * POST /api/public/feedback
 */
export async function submitFeedback(data: FeedbackFormData) {
  try {
    if (!API_BASE_URL) {
      throw new Error('API_BASE_URL não configurada')
    }

    const payload = {
      healthUnitId: data.healthUnitId,
      rating: data.rating,
      vaccineSuccess: data.vaccineSuccess,
      waitTime: data.waitTime,
      respectfulService: data.respectfulService,
      cleanLocation: data.cleanLocation,
      recommendation: data.recommendation,
    }

    const response = await fetch(`${API_BASE_URL}/api/public/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Erro ao enviar feedback')
    }

    const result = await response.json()
    return {
      success: true,
      message: 'Feedback enviado com sucesso!',
      data: result.data,
    }
  } catch (error) {
    console.error('Erro ao enviar feedback:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Erro ao enviar feedback',
      error,
    }
  }
}
