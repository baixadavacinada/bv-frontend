import type { Meta, StoryObj } from '@storybook/nextjs'

const Typography = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ color: '#1f2937', marginBottom: '1rem' }}>Sistema Tipográfico 📝</h1>

      <p style={{ lineHeight: '1.6', marginBottom: '2rem' }}>
        O sistema tipográfico do Baixada Vacinada é baseado em uma hierarquia clara e legível,
        priorizando a acessibilidade e a experiência do usuário.
      </p>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>📏 Escala Tipográfica</h2>

      <h3 style={{ color: '#374151', marginBottom: '1rem' }}>Títulos (Headings)</h3>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h1
            style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '0.5rem',
            }}
          >
            Heading 1
          </h1>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            text-4xl font-bold • 36px • 40px line-height • Font-weight: 700
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2
            style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '0.5rem',
            }}
          >
            Heading 2
          </h2>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            text-3xl font-bold • 30px • 36px line-height • Font-weight: 700
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '0.5rem',
            }}
          >
            Heading 3
          </h3>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            text-2xl font-semibold • 24px • 32px line-height • Font-weight: 600
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '0.5rem',
            }}
          >
            Heading 4
          </h4>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            text-xl font-semibold • 20px • 28px line-height • Font-weight: 600
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h5
            style={{
              fontSize: '1.125rem',
              fontWeight: '500',
              color: '#111827',
              marginBottom: '0.5rem',
            }}
          >
            Heading 5
          </h5>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            text-lg font-medium • 18px • 28px line-height • Font-weight: 500
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h6
            style={{
              fontSize: '1rem',
              fontWeight: '500',
              color: '#111827',
              marginBottom: '0.5rem',
            }}
          >
            Heading 6
          </h6>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            text-base font-medium • 16px • 24px line-height • Font-weight: 500
          </div>
        </div>
      </div>

      <h3 style={{ color: '#374151', marginBottom: '1rem' }}>Corpo de Texto (Body)</h3>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <p
            style={{
              fontSize: '1.125rem',
              color: '#111827',
              marginBottom: '0.5rem',
              lineHeight: '1.75',
            }}
          >
            Large Body Text - Este é um texto maior usado para introduções e destaques importantes.
          </p>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            text-lg • 18px • 28px line-height • Font-weight: 400
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <p
            style={{
              fontSize: '1rem',
              color: '#111827',
              marginBottom: '0.5rem',
              lineHeight: '1.5',
            }}
          >
            Regular Body Text - Este é o texto padrão usado na maioria do conteúdo. Oferece boa
            legibilidade e é confortável para leitura prolongada.
          </p>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            text-base • 16px • 24px line-height • Font-weight: 400
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <p
            style={{
              fontSize: '0.875rem',
              color: '#111827',
              marginBottom: '0.5rem',
              lineHeight: '1.25',
            }}
          >
            Small Body Text - Usado para textos auxiliares, legendas e informações secundárias.
          </p>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            text-sm • 14px • 20px line-height • Font-weight: 400
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <p
            style={{
              fontSize: '0.75rem',
              color: '#111827',
              marginBottom: '0.5rem',
              lineHeight: '1',
            }}
          >
            Extra Small Text - Para informações muito específicas, como timestamps ou metadados.
          </p>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            text-xs • 12px • 16px line-height • Font-weight: 400
          </div>
        </div>
      </div>

      <h3 style={{ color: '#374151', marginBottom: '1rem' }}>⚖️ Pesos Tipográficos</h3>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '1.125rem', fontWeight: '300', color: '#111827' }}>
            Light Weight - Font-weight: 300
          </p>
          <code style={{ fontSize: '0.875rem', color: '#6b7280' }}>font-light</code>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '1.125rem', fontWeight: '400', color: '#111827' }}>
            Normal Weight - Font-weight: 400
          </p>
          <code style={{ fontSize: '0.875rem', color: '#6b7280' }}>font-normal</code>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827' }}>
            Medium Weight - Font-weight: 500
          </p>
          <code style={{ fontSize: '0.875rem', color: '#6b7280' }}>font-medium</code>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
            Semibold Weight - Font-weight: 600
          </p>
          <code style={{ fontSize: '0.875rem', color: '#6b7280' }}>font-semibold</code>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '1.125rem', fontWeight: '700', color: '#111827' }}>
            Bold Weight - Font-weight: 700
          </p>
          <code style={{ fontSize: '0.875rem', color: '#6b7280' }}>font-bold</code>
        </div>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>🎯 Casos de Uso</h2>

      <pre
        style={{
          backgroundColor: '#f3f4f6',
          padding: '1rem',
          borderRadius: '0.5rem',
          fontSize: '0.9rem',
          overflow: 'auto',
        }}
      >
        {`// Título principal da página
<h1 className="text-4xl font-bold text-gray-900">
  Baixada Vacinada
</h1>

// Seções principais
<h2 className="text-3xl font-bold text-gray-900">
  Centros de Vacinação
</h2>

// Conteúdo principal
<p className="text-base text-gray-900">
  Informações sobre os centros de vacinação...
</p>

// Informações auxiliares
<span className="text-sm text-gray-600">
  Última atualização: 17 de agosto de 2025
</span>`}
      </pre>
    </div>
  )
}

const meta: Meta<typeof Typography> = {
  title: 'Design System/Tipografia',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const SistemaTipografico: Story = {}
