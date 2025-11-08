'use server'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const baseUrl = 'https://bv-backend-ruby.vercel.app/api'

export type SurveyData = {
  vaccineSuccess: string
  waitTime: string
  respectfulService: string
  cleanLocation: string
  recommendation: string
  rating: number
}

export async function submitSurvey(data: SurveyData) {
  await wait(1000)

  console.log('Dados recebidos no servidor:', data)

  // AQUI VOCÊ FARIA O SEU FETCH REAL:
  /*
  try {
    const response = await fetch('https://api.sua-empresa.com/survey', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Falha no envio');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro ao enviar' };
  }
  */

  return { success: true, message: 'Avaliação enviada com sucesso!' }
}

export const listHealthUnits = async () => {
  const url = `${baseUrl}/public/health-units?isActive=true`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Falha ao buscar unidades de saúde:', error)
    throw error
  }
}
