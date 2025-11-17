/**
 * Utilitário para criar stories do Instagram com informações da UBS
 */

interface StoryData {
  ubsName: string
  neighborhood: string
  shareUrl: string
  distanceInKm?: number
}

/**
 * Gera uma imagem Canvas para story do Instagram (9:16)
 */
export function generateInstagramStoryImage(data: StoryData): Promise<Blob> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    // Dimensões do Instagram Story (9:16)
    canvas.width = 1080
    canvas.height = 1920

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#483698') // Roxo principal
    gradient.addColorStop(0.6, '#6366f1') // Indigo
    gradient.addColorStop(1, '#8b5cf6') // Violeta

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Logo/Marca (simulado)
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
    ctx.textAlign = 'center'
    ctx.fillText('💉 Baixada Vacinada', canvas.width / 2, 200)

    // Título principal
    ctx.font = 'bold 64px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'

    // Quebrar o nome da UBS em múltiplas linhas se necessário
    const words = data.ubsName.split(' ')
    const maxWidth = canvas.width - 120
    let line = ''
    let y = 600

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' '
      const metrics = ctx.measureText(testLine)

      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line.trim(), canvas.width / 2, y)
        line = words[i] + ' '
        y += 80
      } else {
        line = testLine
      }
    }
    ctx.fillText(line.trim(), canvas.width / 2, y)

    // Informações adicionais
    ctx.font = '40px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
    ctx.fillStyle = '#e2e8f0'
    y += 120
    ctx.fillText(`📍 ${data.neighborhood}`, canvas.width / 2, y)

    if (data.distanceInKm !== undefined) {
      y += 60
      ctx.fillText(`📏 ${data.distanceInKm.toFixed(1)} km de distância`, canvas.width / 2, y)
    }

    // Call to action
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
    ctx.fillStyle = '#ffffff'
    y += 200
    ctx.fillText('Acesse o link na bio para', canvas.width / 2, y)
    y += 50
    ctx.fillText('mais informações! 👆', canvas.width / 2, y)

    // QR Code placeholder (círculo decorativo)
    const qrSize = 200
    const qrX = (canvas.width - qrSize) / 2
    const qrY = canvas.height - 300

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(qrX, qrY, qrSize, qrSize)

    ctx.fillStyle = '#483698'
    ctx.font = '24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
    ctx.textAlign = 'center'
    ctx.fillText('QR CODE', qrX + qrSize / 2, qrY + qrSize / 2 - 10)
    ctx.fillText('Escaneie aqui', qrX + qrSize / 2, qrY + qrSize / 2 + 20)

    // Footer
    ctx.fillStyle = '#cbd5e1'
    ctx.font = '28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
    ctx.textAlign = 'center'
    ctx.fillText('#BaixadaVacinada #Saúde #Vacinas', canvas.width / 2, canvas.height - 80)

    // Converter para blob
    canvas.toBlob(
      (blob) => {
        resolve(blob!)
      },
      'image/png',
      1.0,
    )
  })
}

/**
 * Abre o Instagram com story preparado (mobile)
 */
export async function shareToInstagramStory(data: StoryData) {
  try {
    // Gerar imagem do story
    const imageBlob = await generateInstagramStoryImage(data)

    // Criar URL temporária
    const imageUrl = URL.createObjectURL(imageBlob)

    // Detectar se está no mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )

    if (isMobile) {
      // Tentar abrir o Instagram diretamente
      try {
        // Instagram Story deeplink (funciona se o app estiver instalado)
        const instagramUrl = `instagram://camera`
        window.open(instagramUrl, '_self')

        // Fazer download da imagem para o usuário usar
        const link = document.createElement('a')
        link.href = imageUrl
        link.download = `baixada-vacinada-${data.ubsName.toLowerCase().replace(/\s+/g, '-')}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        return {
          success: true,
          message: 'Story baixado! Abra o Instagram e publique a imagem.',
          imageUrl,
        }
      } catch {
        // Fallback: fazer download da imagem
        const link = document.createElement('a')
        link.href = imageUrl
        link.download = `baixada-vacinada-${data.ubsName.toLowerCase().replace(/\s+/g, '-')}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        return {
          success: true,
          message: 'Imagem baixada! Abra o Instagram e publique nos seus stories.',
          imageUrl,
        }
      }
    } else {
      // Desktop: fazer download da imagem
      const link = document.createElement('a')
      link.href = imageUrl
      link.download = `baixada-vacinada-${data.ubsName.toLowerCase().replace(/\s+/g, '-')}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Abrir Instagram web
      window.open('https://www.instagram.com/', '_blank')

      return {
        success: true,
        message: 'Imagem baixada! Acesse o Instagram pelo navegador e publique nos seus stories.',
        imageUrl,
      }
    }
  } catch (error) {
    console.error('Erro ao criar story:', error)
    return {
      success: false,
      message: 'Erro ao criar story. Tente novamente.',
      imageUrl: null,
    }
  }
}

/**
 * Gera uma imagem simplificada para compartilhamento geral
 */
export function generateSimpleShareImage(
  data: Pick<StoryData, 'ubsName' | 'neighborhood'>,
): Promise<Blob> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    // Dimensões quadradas para posts
    canvas.width = 1080
    canvas.height = 1080

    // Background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#483698')
    gradient.addColorStop(1, '#8b5cf6')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Texto principal
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 72px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
    ctx.textAlign = 'center'

    const maxWidth = canvas.width - 120
    const words = data.ubsName.split(' ')
    let line = ''
    let y = 400

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' '
      const metrics = ctx.measureText(testLine)

      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line.trim(), canvas.width / 2, y)
        line = words[i] + ' '
        y += 90
      } else {
        line = testLine
      }
    }
    ctx.fillText(line.trim(), canvas.width / 2, y)

    // Subtitle
    ctx.font = '48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
    ctx.fillStyle = '#e2e8f0'
    y += 120
    ctx.fillText(`📍 ${data.neighborhood}`, canvas.width / 2, y)

    // Logo
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
    ctx.fillStyle = '#ffffff'
    ctx.fillText('💉 Baixada Vacinada', canvas.width / 2, y + 200)

    canvas.toBlob(
      (blob) => {
        resolve(blob!)
      },
      'image/png',
      1.0,
    )
  })
}
