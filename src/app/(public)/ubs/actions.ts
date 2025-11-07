'use server'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export type SurveyData = {
  vaccineSuccess: string
  waitTime: string
  respectfulService: string
  cleanLocation: string
  recommendation: string
  rating: number
}

export async function submitSurvey(data: SurveyData) {
  // Simula processamento no servidor
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
