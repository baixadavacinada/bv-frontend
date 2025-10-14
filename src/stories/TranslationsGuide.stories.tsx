import type { Meta, StoryObj } from '@storybook/nextjs'
// import { withNextIntl } from '../../.storybook/decorators'
import { useState } from 'react'
import { MapPin, Menu, X, Calendar } from 'lucide-react'

// Componente principal de documentação
const TranslationsGuideDoc = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ color: '#2563eb', marginBottom: '1rem', fontSize: '2.5rem' }}>
        🌐 Sistema de Traduções & Internacionalização
      </h1>

      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem', color: '#374151' }}>
        Sistema completo de traduções com foco em <strong>acessibilidade WCAG 2.1 AA</strong>,
        utilizando o hook useAppTranslations para textos consistentes e inclusivos.
      </p>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>🔤 Estrutura das Traduções</h2>

      <p style={{ lineHeight: '1.6', marginBottom: '2rem', color: '#4b5563' }}>
        As traduções são organizadas por <strong>responsabilidade semântica</strong>, garantindo
        consistência e facilidade de manutenção em todo o sistema.
      </p>

      <div style={{ marginBottom: '3rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#f0f9ff',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #bae6fd',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: '#2563eb',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                }}
              >
                🔤
              </div>
              <div>
                <h3 style={{ color: '#0c4a6e', margin: 0, fontSize: '1.1rem' }}>common</h3>
                <p style={{ color: '#075985', margin: 0, fontSize: '0.875rem' }}>
                  Textos reutilizáveis
                </p>
              </div>
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#0369a1', lineHeight: '1.5' }}>
              <li>save, cancel, close</li>
              <li>loading, error, success</li>
              <li>search, filter</li>
            </ul>
          </div>

          <div
            style={{
              backgroundColor: '#f0fdf4',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #bbf7d0',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: '#16a34a',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                }}
              >
                ♿
              </div>
              <div>
                <h3 style={{ color: '#14532d', margin: 0, fontSize: '1.1rem' }}>accessibility</h3>
                <p style={{ color: '#166534', margin: 0, fontSize: '0.875rem' }}>
                  Labels assistivos
                </p>
              </div>
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#15803d', lineHeight: '1.5' }}>
              <li>closeMenu, openMenu</li>
              <li>skipToContent</li>
              <li>primaryNavigation</li>
            </ul>
          </div>

          <div
            style={{
              backgroundColor: '#fdf4ff',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #e9d5ff',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: '#7c3aed',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                }}
              >
                🧭
              </div>
              <div>
                <h3 style={{ color: '#581c87', margin: 0, fontSize: '1.1rem' }}>navigation</h3>
                <p style={{ color: '#6b21a8', margin: 0, fontSize: '0.875rem' }}>
                  Textos de navegação
                </p>
              </div>
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#7c2d92', lineHeight: '1.5' }}>
              <li>home, vaccines, ubs</li>
              <li>schedule, profile</li>
              <li>dashboard</li>
            </ul>
          </div>

          <div
            style={{
              backgroundColor: '#fef3c7',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #fcd34d',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: '#d97706',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                }}
              >
                🃏
              </div>
              <div>
                <h3 style={{ color: '#92400e', margin: 0, fontSize: '1.1rem' }}>cards</h3>
                <p style={{ color: '#a16207', margin: 0, fontSize: '0.875rem' }}>
                  Componentes específicos
                </p>
              </div>
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#b45309', lineHeight: '1.5' }}>
              <li>ubs.title, ubs.description</li>
              <li>vaccines.title</li>
              <li>schedule.title</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>💻 Como Usar o Hook</h2>

      <div
        style={{
          backgroundColor: '#1e293b',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '3rem',
          color: 'white',
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, monospace',
        }}
      >
        <h3 style={{ color: '#38bdf8', marginTop: 0, marginBottom: '1.5rem' }}>
          Exemplo de Implementação
        </h3>
        <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
          <div style={{ color: '#94a3b8' }}>{'// Importação do hook'}</div>
          <div style={{ color: '#f1f5f9' }}>
            <span style={{ color: '#c084fc' }}>import</span>{' '}
            <span style={{ color: '#fbbf24' }}>{'{ useAppTranslations }'}</span>{' '}
            <span style={{ color: '#c084fc' }}>from</span>{' '}
            <span style={{ color: '#10b981' }}>&apos;@/hooks/use-translations&apos;</span>
          </div>
          <br />
          <div style={{ color: '#94a3b8' }}>{'// Uso no componente'}</div>
          <div style={{ color: '#f1f5f9' }}>
            <span style={{ color: '#c084fc' }}>function</span>{' '}
            <span style={{ color: '#fbbf24' }}>MeuComponente</span>
            <span style={{ color: '#f1f5f9' }}>() {'{'}</span>
          </div>
          <div style={{ color: '#f1f5f9', paddingLeft: '1rem' }}>
            <span style={{ color: '#c084fc' }}>const</span>{' '}
            <span style={{ color: '#fbbf24' }}>{'{ common, accessibility, navigation }'}</span>{' '}
            <span style={{ color: '#f1f5f9' }}>=</span>{' '}
            <span style={{ color: '#38bdf8' }}>useAppTranslations</span>
            <span style={{ color: '#f1f5f9' }}>()</span>
          </div>
          <br />
          <div style={{ color: '#f1f5f9', paddingLeft: '1rem' }}>
            <span style={{ color: '#c084fc' }}>return</span>{' '}
            <span style={{ color: '#f1f5f9' }}>{'('}</span>
          </div>
          <div style={{ color: '#f1f5f9', paddingLeft: '2rem' }}>
            <span style={{ color: '#f472b6' }}>&lt;button</span>{' '}
            <span style={{ color: '#fbbf24' }}>aria-label</span>
            <span style={{ color: '#f1f5f9' }}>=</span>
            <span style={{ color: '#f1f5f9' }}>{'{'}</span>
            <span style={{ color: '#38bdf8' }}>accessibility</span>
            <span style={{ color: '#f1f5f9' }}>(&apos;searchUBS&apos;)</span>
            <span style={{ color: '#f1f5f9' }}>{'}'}</span>
            <span style={{ color: '#f472b6' }}>&gt;</span>
          </div>
          <div style={{ color: '#f1f5f9', paddingLeft: '2.5rem' }}>
            <span style={{ color: '#f1f5f9' }}>{'{'}</span>
            <span style={{ color: '#38bdf8' }}>common</span>
            <span style={{ color: '#f1f5f9' }}>(&apos;search&apos;)</span>
            <span style={{ color: '#f1f5f9' }}>{'}'}</span>
          </div>
          <div style={{ color: '#f1f5f9', paddingLeft: '2rem' }}>
            <span style={{ color: '#f472b6' }}>&lt;/button&gt;</span>
          </div>
          <div style={{ color: '#f1f5f9', paddingLeft: '1rem' }}>
            <span style={{ color: '#f1f5f9' }}>)</span>
          </div>
          <div style={{ color: '#f1f5f9' }}>{'}'}</div>
        </div>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>✅ Diretrizes de Acessibilidade</h2>

      <div style={{ marginBottom: '3rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#dcfce7',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #bbf7d0',
            }}
          >
            <h3 style={{ color: '#14532d', marginTop: 0, marginBottom: '1rem' }}>✅ Faça Sempre</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#166534', lineHeight: '1.6' }}>
              <li>Use accessibility() para aria-labels</li>
              <li>Mantenha consistência nos termos</li>
              <li>Forneça contexto suficiente</li>
              <li>Teste com leitores de tela</li>
            </ul>
          </div>

          <div
            style={{
              backgroundColor: '#fef2f2',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #fecaca',
            }}
          >
            <h3 style={{ color: '#991b1b', marginTop: 0, marginBottom: '1rem' }}>❌ Evite</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#dc2626', lineHeight: '1.6' }}>
              <li>Textos hardcoded sem tradução</li>
              <li>Labels genéricos como &quot;botão&quot;</li>
              <li>Jargões técnicos desnecessários</li>
              <li>Informações em excesso</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>🎯 Critérios WCAG 2.1 AA</h2>

      <div style={{ marginBottom: '3rem' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#1e293b', color: 'white' }}>
              <th
                style={{
                  padding: '1.2rem',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}
              >
                Critério WCAG
              </th>
              <th
                style={{
                  padding: '1.2rem',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}
              >
                Implementação
              </th>
              <th
                style={{
                  padding: '1.2rem',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}
              >
                Hook Usado
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: 'white' }}>
              <td style={{ padding: '1.2rem', fontWeight: 'bold', color: '#1f2937' }}>
                1.1.1 - Conteúdo Não-textual
              </td>
              <td style={{ padding: '1.2rem', color: '#4b5563' }}>Ícones têm labels apropriados</td>
              <td style={{ padding: '1.2rem' }}>
                <span
                  style={{
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontFamily: 'ui-monospace, monospace',
                  }}
                >
                  accessibility()
                </span>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '1.2rem', fontWeight: 'bold', color: '#1f2937' }}>
                2.4.1 - Bypass Blocks
              </td>
              <td style={{ padding: '1.2rem', color: '#4b5563' }}>
                Navegação tem landmarks apropriados
              </td>
              <td style={{ padding: '1.2rem' }}>
                <span
                  style={{
                    backgroundColor: '#dbeafe',
                    color: '#1d4ed8',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontFamily: 'ui-monospace, monospace',
                  }}
                >
                  navigation()
                </span>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: 'white' }}>
              <td style={{ padding: '1.2rem', fontWeight: 'bold', color: '#1f2937' }}>
                4.1.2 - Nome, Função, Valor
              </td>
              <td style={{ padding: '1.2rem', color: '#4b5563' }}>
                Elementos têm nomes acessíveis
              </td>
              <td style={{ padding: '1.2rem' }}>
                <span
                  style={{
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontFamily: 'ui-monospace, monospace',
                  }}
                >
                  common()
                </span>
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '1.2rem', fontWeight: 'bold', color: '#1f2937' }}>
                4.1.3 - Mensagens de Status
              </td>
              <td style={{ padding: '1.2rem', color: '#4b5563' }}>
                Estados são comunicados adequadamente
              </td>
              <td style={{ padding: '1.2rem' }}>
                <span
                  style={{
                    backgroundColor: '#fdf4ff',
                    color: '#6b21a8',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontFamily: 'ui-monospace, monospace',
                  }}
                >
                  accessibility()
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        style={{
          backgroundColor: '#fef3c7',
          padding: '1.5rem',
          borderRadius: '12px',
          borderLeft: '4px solid #92400e',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ color: '#92400e', marginTop: 0 }}>
          📌 No futuro: Implementar multilinguagem com detecção automática de idioma e suporte a
          mais línguas.
        </h2>
      </div>
    </div>
  )
}

// Componente de exemplo para demonstrar uso das traduções
const TranslationExample = ({ example = 'basic' }: { example?: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Simulação do hook useAppTranslations
  const mockTranslations = {
    common: (key: string) => {
      const translations: Record<string, string> = {
        close: 'Fechar',
        save: 'Salvar',
        cancel: 'Cancelar',
        loading: 'Carregando...',
        search: 'Buscar',
      }
      return translations[key] || key
    },
    accessibility: (key: string) => {
      const translations: Record<string, string> = {
        closeMenu: 'Fechar menu de navegação',
        openMenu: 'Abrir menu de navegação',
        primaryNavigation: 'Navegação principal',
        skipToContent: 'Pular para o conteúdo principal',
        loading: 'Aguarde, carregando informações',
        searchUBS: 'Buscar unidades básicas de saúde próximas à sua localização',
      }
      return translations[key] || key
    },
    navigation: (key: string) => {
      const translations: Record<string, string> = {
        home: 'Início',
        vaccines: 'Vacinas',
        ubs: 'UBS',
        schedule: 'Agendamentos',
      }
      return translations[key] || key
    },
  }

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
  }

  const renderExample = () => {
    switch (example) {
      case 'basic':
        return (
          <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
            <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>Exemplo Básico</h3>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: '#2563eb',
                color: 'white',
              }}
              aria-label={mockTranslations.accessibility('searchUBS')}
            >
              <MapPin size={16} />
              {mockTranslations.common('search')}
            </button>
          </div>
        )

      case 'navigation':
        return (
          <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
            <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>Navegação Acessível</h3>
            <nav aria-label={mockTranslations.accessibility('primaryNavigation')}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  style={{
                    ...buttonStyle,
                    backgroundColor: '#2563eb',
                    color: 'white',
                  }}
                  aria-label={
                    isMenuOpen
                      ? mockTranslations.accessibility('closeMenu')
                      : mockTranslations.accessibility('openMenu')
                  }
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
                  {isMenuOpen ? mockTranslations.common('close') : 'Menu'}
                </button>
                {isMenuOpen && (
                  <>
                    <button
                      style={{
                        ...buttonStyle,
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                      }}
                    >
                      {mockTranslations.navigation('home')}
                    </button>
                    <button
                      style={{
                        ...buttonStyle,
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                      }}
                    >
                      {mockTranslations.navigation('vaccines')}
                    </button>
                    <button
                      style={{
                        ...buttonStyle,
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                      }}
                    >
                      {mockTranslations.navigation('ubs')}
                    </button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )

      case 'dynamic':
        return (
          <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
            <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>Estados Dinâmicos</h3>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: isLoading ? '#9ca3af' : '#16a34a',
                color: 'white',
                cursor: isLoading ? 'not-allowed' : 'pointer',
              }}
              onClick={() => {
                if (!isLoading) {
                  setIsLoading(true)
                  setTimeout(() => setIsLoading(false), 2000)
                }
              }}
              disabled={isLoading}
              aria-live="polite"
              aria-label={
                isLoading ? mockTranslations.accessibility('loading') : 'Agendar nova vacinação'
              }
            >
              {!isLoading && <Calendar size={16} />}
              {isLoading ? mockTranslations.common('loading') : 'Agendar Vacina'}
            </button>
          </div>
        )

      default:
        return null
    }
  }

  return renderExample()
}

const meta: Meta<typeof TranslationsGuideDoc> = {
  title: '📖 Documentação/Traduções & Internacionalização',
  component: TranslationsGuideDoc,
  // decorators: [withNextIntl],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ExemploBasico: Story = {
  name: '🔤 Exemplo Básico',
  render: () => <TranslationExample example="basic" />,
}

export const ExemploNavegacao: Story = {
  name: '🧭 Navegação Acessível',
  render: () => <TranslationExample example="navigation" />,
}

export const ExemploEstadosDinamicos: Story = {
  name: '⏳ Estados Dinâmicos',
  render: () => <TranslationExample example="dynamic" />,
}
