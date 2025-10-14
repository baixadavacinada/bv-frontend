import type { Meta, StoryObj } from '@storybook/nextjs'

const ColorPalette = () => {
  const colors = [
    {
      name: 'Primary',
      hex: '#4C2E97',
      description: 'Cor principal do sistema',
    },
    {
      name: 'Primary Foreground',
      hex: '#FFFFFF',
      description: 'Texto sobre primary',
    },
    {
      name: 'Dark Primary',
      hex: '#9E90CB',
      description: 'Primary no tema escuro',
    },
    {
      name: 'Success',
      hex: '#50C36E',
      description: 'Indicadores de sucesso',
    },
    {
      name: 'Alert',
      hex: '#FC6E04',
      description: 'Alertas importantes',
    },
    {
      name: 'Warning',
      hex: '#ECAD00',
      description: 'Avisos e cuidados',
    },
    {
      name: 'Background',
      hex: '#E2E2E2',
      description: 'Fundo da aplicação',
    },
    {
      name: 'Dark Background',
      hex: '#1D1D1D',
      description: 'Fundo no tema escuro',
    },
    {
      name: 'Gray Secondary',
      hex: '#727272',
      description: 'Texto secundário',
    },
    {
      name: 'Dark Text',
      hex: '#383838',
      description: 'Texto no tema escuro',
    },
    {
      name: 'White',
      hex: '#FFFFFF',
      description: 'Branco puro',
    },
    {
      name: 'Black',
      hex: '#000000',
      description: 'Preto puro',
    },
  ]

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ color: '#1f2937', marginBottom: '1rem' }}>Paleta de Cores 🎨</h1>

      <p style={{ lineHeight: '1.6', marginBottom: '2rem' }}>
        Este é o sistema de cores do projeto Baixada Vacinada. As cores foram escolhidas para
        transmitir confiança, profissionalismo e acessibilidade.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {colors.map((color) => (
          <div key={color.name} style={{ textAlign: 'center' }}>
            <div
              style={{
                height: '80px',
                borderRadius: '8px',
                marginBottom: '0.5rem',
                backgroundColor: color.hex,
                border:
                  color.name.includes('Background') || color.name === 'White'
                    ? '2px solid #727272'
                    : 'none',
              }}
            />
            <div style={{ fontSize: '0.875rem' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{color.name}</div>
              <div style={{ color: '#727272', marginBottom: '0.25rem' }}>{color.hex}</div>
              {color.description && (
                <div style={{ color: '#727272', fontSize: '0.75rem' }}>{color.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>🎨 Utilizando as Cores</h2>

      <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>Em CSS/Tailwind</h3>
      <pre
        style={{
          backgroundColor: '#f3f4f6',
          padding: '1rem',
          borderRadius: '0.5rem',
          fontSize: '0.9rem',
          overflow: 'auto',
          marginBottom: '1rem',
        }}
      >
        {`/* Cores do Design System - Use as variáveis CSS ou cores diretas */

/* Método 1: Variáveis CSS (recomendado para componentes) */
.bg-primary { background-color: var(--primary); }           /* #4C2E97 */
.bg-success { background-color: var(--success); }           /* #50C36E */
.bg-alert { background-color: var(--alert); }               /* #FC6E04 */
.bg-warning { background-color: var(--warning); }           /* #ECAD00 */

/* Método 2: Classes Tailwind diretas (para casos específicos) */
.bg-primary-direct { @apply bg-[#4C2E97]; }
.bg-success-direct { @apply bg-[#50C36E]; }
.bg-alert-direct { @apply bg-[#FC6E04]; }
.bg-warning-direct { @apply bg-[#ECAD00]; }

/* Cores de texto */
.text-gray-secondary { @apply text-[#727272]; }

/* Cores de background */
.bg-background { @apply bg-[#E2E2E2]; }
.dark .bg-background { @apply bg-[#1D1D1D]; }`}
      </pre>

      <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>Em Components</h3>
      <pre
        style={{
          backgroundColor: '#f3f4f6',
          padding: '1rem',
          borderRadius: '0.5rem',
          fontSize: '0.9rem',
          overflow: 'auto',
        }}
      >
        {`// Usando variantes do BvButton (funciona com o sistema de cores)
<BvButton variant="default">Primary (#4C2E97)</BvButton>
<BvButton variant="success">Sucesso (#50C36E)</BvButton>
<BvButton variant="alert">Alerta (#FC6E04)</BvButton>
<BvButton variant="warning">Aviso (#ECAD00)</BvButton>

// Usando classes Tailwind diretas
<div className="bg-[#4C2E97] text-white">Primary</div>
<div className="bg-[#50C36E] text-white">Success</div>
<div className="bg-[#FC6E04] text-white">Alert</div>
<div className="bg-[#ECAD00] text-black">Warning</div>

// Navbar com cores do design system
<nav className="bg-[#4C2E97] text-white">
  // Conteúdo do navbar
</nav>`}
      </pre>

      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#fef3c7',
          borderRadius: '0.5rem',
          borderLeft: '4px solid #f59e0b',
        }}
      >
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#92400e' }}>🔍 Acessibilidade</h4>
        <p style={{ margin: 0, color: '#92400e' }}>
          Todas as combinações de cores seguem as diretrizes WCAG 2.1 para contraste mínimo de
          4.5:1.
        </p>
      </div>
    </div>
  )
}

const meta: Meta<typeof ColorPalette> = {
  title: 'Design System/Cores',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const PaletaDeCores: Story = {}
