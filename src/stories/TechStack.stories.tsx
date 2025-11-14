import type { Meta, StoryObj } from '@storybook/nextjs'

const TechStack = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ color: '#2563eb', marginBottom: '1rem', fontSize: '2.5rem' }}>
        🚀 Stack Tecnológica
      </h1>

      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem', color: '#374151' }}>
        Conheça as tecnologias cuidadosamente selecionadas para construir uma plataforma
        <strong> robusta, performática e inclusiva</strong> para a Japeri Vacinada.
      </p>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>⚛️ Frontend & Interface</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        <div
          style={{
            backgroundColor: '#0f172a',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #334155',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '0.5rem',
                marginRight: '1rem',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#000000',
                  borderRadius: '4px',
                }}
              ></div>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.4rem' }}>Next.js 15.4.1</h3>
          </div>
          <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6', color: '#cbd5e1' }}>
            Framework React full-stack com App Router
          </p>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            <strong>Por que escolhemos:</strong>
            <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
              <li>Renderização híbrida (SSR + SSG + ISR)</li>
              <li>SEO otimizado out-of-the-box</li>
              <li>Performance excepcional</li>
              <li>API Routes integradas</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#3178c6',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '0.5rem',
                marginRight: '1rem',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#3178c6',
                  borderRadius: '4px',
                }}
              ></div>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.4rem' }}>TypeScript</h3>
          </div>
          <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6', color: '#e1e7ef' }}>
            Superset do JavaScript com tipagem estática
          </p>
          <div style={{ fontSize: '0.9rem', color: '#a8b9d1' }}>
            <strong>Benefícios:</strong>
            <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
              <li>Detecção de erros em tempo de desenvolvimento</li>
              <li>IntelliSense e autocompletar</li>
              <li>Código mais mantível e documentado</li>
              <li>Refatoração segura</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#0f766e',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '0.5rem',
                marginRight: '1rem',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#0f766e',
                  borderRadius: '4px',
                }}
              ></div>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.4rem' }}>Tailwind CSS</h3>
          </div>
          <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6', color: '#ccfbf1' }}>
            Framework CSS utility-first para design responsivo
          </p>
          <div style={{ fontSize: '0.9rem', color: '#99f6e4' }}>
            <strong>Vantagens:</strong>
            <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
              <li>Design system consistente</li>
              <li>Desenvolvimento ágil</li>
              <li>Acessibilidade nativa</li>
              <li>Bundle otimizado (PurgeCSS)</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#ff6154',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '0.5rem',
                marginRight: '1rem',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#ff6154',
                  borderRadius: '4px',
                }}
              ></div>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.4rem' }}>Storybook 9.1.2</h3>
          </div>
          <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6', color: '#ffe8e6' }}>
            Ferramenta para desenvolvimento e documentação de componentes
          </p>
          <div style={{ fontSize: '0.9rem', color: '#ffc6c0' }}>
            <strong>Funcionalidades:</strong>
            <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
              <li>Desenvolvimento isolado de componentes</li>
              <li>Documentação visual interativa</li>
              <li>Testes de acessibilidade integrados</li>
              <li>Design system centralizado</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>🗄️ Backend & Banco de Dados</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        <div
          style={{
            backgroundColor: '#001e2b',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div
              style={{
                backgroundColor: '#00ed64',
                borderRadius: '8px',
                padding: '0.5rem',
                marginRight: '1rem',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#001e2b',
                  borderRadius: '4px',
                }}
              ></div>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.4rem' }}>MongoDB Atlas</h3>
          </div>
          <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6', color: '#b3f5d1' }}>
            Banco de dados NoSQL em nuvem, escalável e flexível
          </p>
          <div style={{ fontSize: '0.9rem', color: '#7dd3a8' }}>
            <strong>Características:</strong>
            <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
              <li>Esquema flexível para dados variados</li>
              <li>Geolocalização nativa (GeoJSON)</li>
              <li>Escala automática</li>
              <li>Backup e recovery automático</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '0.5rem',
                marginRight: '1rem',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#7c3aed',
                  borderRadius: '4px',
                }}
              ></div>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.4rem' }}>NextAuth.js</h3>
          </div>
          <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6', color: '#ede9fe' }}>
            Biblioteca de autenticação completa para Next.js
          </p>
          <div style={{ fontSize: '0.9rem', color: '#c4b5fd' }}>
            <strong>Recursos:</strong>
            <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
              <li>Múltiplos providers (Google, GitHub, Email)</li>
              <li>JWT e session tokens</li>
              <li>Middleware de proteção</li>
              <li>Integração com banco de dados</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>🔗 Integrações & APIs Externas</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        <div
          style={{
            backgroundColor: '#1a73e8',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
          }}
        >
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>🗺️ Google Maps API</h3>
          <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6', color: '#e3f2fd' }}>
            Geolocalização e mapas interativos para encontrar UBS próximas
          </p>
          <div style={{ fontSize: '0.9rem', color: '#bbdefb' }}>
            <strong>Funcionalidades:</strong>
            <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
              <li>Mapa interativo responsivo</li>
              <li>Cálculo de distâncias</li>
              <li>Rotas e direções</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#25d366',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
          }}
        >
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>💬 WhatsApp API</h3>
          <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6', color: '#e8f5e8' }}>
            Notificações via WhatsApp com consentimento LGPD
          </p>
          <div style={{ fontSize: '0.9rem', color: '#c8e6c9' }}>
            <strong>Casos de uso:</strong>
            <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
              <li>Lembretes de vacinação</li>
              <li>Atualizações de disponibilidade</li>
              <li>Confirmações de agendamento</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#f59e0b',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
          }}
        >
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>📍 Geolocation API</h3>
          <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6', color: '#fef3c7' }}>
            API nativa do navegador para localização do usuário
          </p>
          <div style={{ fontSize: '0.9rem', color: '#fde68a' }}>
            <strong>Implementação:</strong>
            <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
              <li>Permissão explícita do usuário</li>
              <li>Fallback para busca textual</li>
              <li>Cache de localização</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>♿ Acessibilidade & Qualidade</h2>

      <div
        style={{
          backgroundColor: '#f0f9ff',
          padding: '2rem',
          borderRadius: '12px',
          marginBottom: '3rem',
          border: '1px solid #bae6fd',
        }}
      >
        <h3 style={{ color: '#0c4a6e', marginTop: 0, marginBottom: '1.5rem', fontSize: '1.4rem' }}>
          🎯 Ferramentas de Acessibilidade
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e0f2fe',
            }}
          >
            <h4 style={{ color: '#0f172a', margin: '0 0 1rem 0' }}>🔍 Axe-core</h4>
            <p style={{ margin: 0, color: '#374151', lineHeight: '1.6' }}>
              Ferramenta automatizada para detectar problemas de acessibilidade em tempo real
              durante o desenvolvimento.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e0f2fe',
            }}
          >
            <h4 style={{ color: '#0f172a', margin: '0 0 1rem 0' }}>🚨 Lighthouse</h4>
            <p style={{ margin: 0, color: '#374151', lineHeight: '1.6' }}>
              Auditoria automatizada de performance, acessibilidade, SEO e melhores práticas.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e0f2fe',
            }}
          >
            <h4 style={{ color: '#0f172a', margin: '0 0 1rem 0' }}>⌨️ Testes Manuais</h4>
            <p style={{ margin: 0, color: '#374151', lineHeight: '1.6' }}>
              Navegação por teclado, leitores de tela e testes com usuários reais.
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            backgroundColor: '#0c4a6e',
            borderRadius: '8px',
            color: 'white',
          }}
        >
          <h4 style={{ margin: '0 0 1rem 0' }}>✅ Padrão WCAG 2.1 AA Implementado</h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            <div>
              <strong>📱 Perceptível</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
                <li>Alto contraste</li>
                <li>Texto alternativo</li>
                <li>Legendas e transcrições</li>
              </ul>
            </div>
            <div>
              <strong>⌨️ Operável</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
                <li>Navegação por teclado</li>
                <li>Foco visível</li>
                <li>Tempo suficiente</li>
              </ul>
            </div>
            <div>
              <strong>🧠 Compreensível</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
                <li>Linguagem clara</li>
                <li>Navegação consistente</li>
                <li>Identificação de erros</li>
              </ul>
            </div>
            <div>
              <strong>🛠️ Robusto</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
                <li>HTML semântico</li>
                <li>ARIA labels</li>
                <li>Compatibilidade assistiva</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>🚀 Deploy & DevOps</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        <div
          style={{
            backgroundColor: '#000000',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
          }}
        >
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>▲ Vercel (Recomendado)</h3>
          <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6', color: '#a3a3a3' }}>
            Plataforma otimizada para Next.js com deploy automático
          </p>
          <div style={{ fontSize: '0.9rem', color: '#737373' }}>
            <strong>Vantagens:</strong>
            <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
              <li>Edge Functions globais</li>
              <li>CDN automático</li>
              <li>Preview deployments</li>
              <li>Analytics integrado</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
          }}
        >
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>🐳 Docker + Cloud</h3>
          <p style={{ margin: '0 0 1rem 0', lineHeight: '1.6', color: '#dbeafe' }}>
            Containerização para deploy em Render, Fly.io ou AWS
          </p>
          <div style={{ fontSize: '0.9rem', color: '#bfdbfe' }}>
            <strong>Benefícios:</strong>
            <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem' }}>
              <li>Ambiente consistente</li>
              <li>Escalabilidade manual</li>
              <li>Maior controle</li>
              <li>Multi-região</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>📊 Monitoramento & Analytics</h2>

      <div
        style={{
          backgroundColor: '#f8fafc',
          padding: '2rem',
          borderRadius: '12px',
          marginBottom: '3rem',
          border: '1px solid #e2e8f0',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff7ed',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #fed7aa',
            }}
          >
            <h4 style={{ color: '#9a3412', margin: '0 0 1rem 0' }}>📈 Métricas de Uso</h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#9a3412', lineHeight: '1.6' }}>
              <li>Tempo médio nas páginas</li>
              <li>Número de acessos por funcionalidade</li>
              <li>Taxa de conversão de feedback</li>
              <li>Uso de funcionalidades de acessibilidade</li>
            </ul>
          </div>

          <div
            style={{
              backgroundColor: '#f0fdf4',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #bbf7d0',
            }}
          >
            <h4 style={{ color: '#14532d', margin: '0 0 1rem 0' }}>⚡ Performance</h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#14532d', lineHeight: '1.6' }}>
              <li>Core Web Vitals</li>
              <li>First Contentful Paint</li>
              <li>Largest Contentful Paint</li>
              <li>Cumulative Layout Shift</li>
            </ul>
          </div>

          <div
            style={{
              backgroundColor: '#fdf4ff',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e9d5ff',
            }}
          >
            <h4 style={{ color: '#581c87', margin: '0 0 1rem 0' }}>🛡️ Segurança</h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#581c87', lineHeight: '1.6' }}>
              <li>Logs de autenticação</li>
              <li>Rate limiting</li>
              <li>Detecção de anomalias</li>
              <li>Auditoria de acessos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof TechStack> = {
  title: '📖 Documentação/Stack Tecnológica',
  component: TechStack,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
