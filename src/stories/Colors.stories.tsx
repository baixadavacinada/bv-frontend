import type { Meta, StoryObj } from '@storybook/nextjs'

const ColorPalette = () => {
  const colors = [
    { name: 'Primary', class: 'bg-blue-600', hex: '#2563eb' },
    { name: 'Primary Foreground', class: 'bg-blue-50', hex: '#eff6ff' },
    { name: 'Destructive', class: 'bg-red-600', hex: '#dc2626' },
    { name: 'Background', class: 'bg-white border-2 border-gray-200', hex: '#ffffff' },
    { name: 'Muted', class: 'bg-gray-50', hex: '#f9fafb' },
    { name: 'Accent', class: 'bg-gray-100', hex: '#f3f4f6' },
    { name: 'Border', class: 'bg-gray-200', hex: '#e5e7eb' },
    { name: 'Foreground', class: 'bg-gray-900', hex: '#111827' },
    { name: 'Muted Foreground', class: 'bg-gray-600', hex: '#4b5563' },
    { name: 'Success', class: 'bg-green-600', hex: '#16a34a' },
    { name: 'Warning', class: 'bg-yellow-500', hex: '#eab308' },
    { name: 'Error', class: 'bg-red-600', hex: '#dc2626' },
    { name: 'Info', class: 'bg-blue-500', hex: '#3b82f6' },
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
              className={color.class}
              style={{
                height: '80px',
                borderRadius: '8px',
                marginBottom: '0.5rem',
                border: color.name === 'Background' ? '2px solid #e5e7eb' : 'none',
              }}
            />
            <div style={{ fontSize: '0.875rem' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{color.name}</div>
              <div style={{ color: '#6b7280' }}>{color.hex}</div>
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
        {`/* Cores principais */
.bg-primary { @apply bg-blue-600; }
.text-primary { @apply text-blue-600; }

/* Cores de background */
.bg-background { @apply bg-white; }
.bg-muted { @apply bg-gray-50; }

/* Cores de texto */
.text-foreground { @apply text-gray-900; }
.text-muted-foreground { @apply text-gray-600; }`}
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
        {`// Usando com className
<div className="bg-primary text-primary-foreground">
  Conteúdo com cor primária
</div>

// Usando com CSS Variables (quando configurado)
<div style={{ backgroundColor: 'var(--primary)' }}>
  Conteúdo dinâmico
</div>`}
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
