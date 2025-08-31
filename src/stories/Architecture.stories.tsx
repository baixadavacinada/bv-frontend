import type { Meta, StoryObj } from '@storybook/nextjs'

const Architecture = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ color: '#2563eb', marginBottom: '1rem', fontSize: '2.5rem' }}>
        🏗️ Arquitetura do Sistema
      </h1>

      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem', color: '#374151' }}>
        Conheça a arquitetura técnica da plataforma Baixada Vacinada, projetada para ser
        <strong> escalável, performática e acessível</strong>.
      </p>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>
        🔀 Estratégia de Renderização Híbrida
      </h2>

      <div style={{ marginBottom: '2rem' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#e2e8f0' }}>
              <th
                style={{
                  padding: '1rem',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  color: '#1e293b',
                }}
              >
                Página
              </th>
              <th
                style={{
                  padding: '1rem',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  color: '#1e293b',
                }}
              >
                Estratégia
              </th>
              <th
                style={{
                  padding: '1rem',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  color: '#1e293b',
                }}
              >
                Justificativa
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '1rem', color: '#374151' }}>
                <strong>Página pública de UBS e vacinas</strong>
              </td>
              <td style={{ padding: '1rem' }}>
                <span
                  style={{
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                  }}
                >
                  SSG + ISR
                </span>
              </td>
              <td style={{ padding: '1rem', color: '#6b7280' }}>
                Conteúdo cacheável, atualizado periodicamente sem backend complexo
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '1rem', color: '#374151' }}>
                <strong>Painel administrativo (CRUD)</strong>
              </td>
              <td style={{ padding: '1rem' }}>
                <span
                  style={{
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                  }}
                >
                  SSR + Middleware
                </span>
              </td>
              <td style={{ padding: '1rem', color: '#6b7280' }}>
                Autenticação protegida e conteúdo dinâmico
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '1rem', color: '#374151' }}>
                <strong>Feedback de atendimento</strong>
              </td>
              <td style={{ padding: '1rem' }}>
                <span
                  style={{
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                  }}
                >
                  SSG
                </span>
              </td>
              <td style={{ padding: '1rem', color: '#6b7280' }}>
                Baixa frequência de alteração, fácil exportação
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '1rem', color: '#374151' }}>
                <strong>Registro de vacina (manual)</strong>
              </td>
              <td style={{ padding: '1rem' }}>
                <span
                  style={{
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                  }}
                >
                  CSR + localStorage
                </span>
              </td>
              <td style={{ padding: '1rem', color: '#6b7280' }}>
                Controle pessoal, funcionalidade offline-first
              </td>
            </tr>
            <tr>
              <td style={{ padding: '1rem', color: '#374151' }}>
                <strong>Geolocalização de UBS</strong>
              </td>
              <td style={{ padding: '1rem' }}>
                <span
                  style={{
                    backgroundColor: '#fce7f3',
                    color: '#be185d',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                  }}
                >
                  CSR + fallback
                </span>
              </td>
              <td style={{ padding: '1rem', color: '#6b7280' }}>
                Depende de geolocalização do navegador
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>📁 Estrutura Feature-First</h2>

      <div
        style={{
          backgroundColor: '#f0f9ff',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #bae6fd',
        }}
      >
        <h3 style={{ color: '#0c4a6e', marginTop: 0, marginBottom: '1rem' }}>
          💡 Por que Feature-First?
        </h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#0c4a6e', lineHeight: '1.6' }}>
          <li>
            <strong>Organização por contexto de negócio:</strong> Cada funcionalidade fica agrupada
          </li>
          <li>
            <strong>Facilidade de manutenção:</strong> Mudanças ficam localizadas
          </li>
          <li>
            <strong>Escalabilidade:</strong> Novas features não impactam as existentes
          </li>
          <li>
            <strong>Colaboração em equipe:</strong> Desenvolvedores podem focar em domínios
            específicos
          </li>
        </ul>
      </div>

      <pre
        style={{
          backgroundColor: '#f1f5f9',
          padding: '1.5rem',
          borderRadius: '8px',
          fontSize: '0.85rem',
          overflow: 'auto',
          marginBottom: '2rem',
          lineHeight: '1.4',
        }}
      >
        {`src/
├── app/                          # App Router (Next.js 13+)
│   ├── (public)/                 # Rotas públicas
│   │   ├── vacinas/              # Listagem de vacinas por UBS
│   │   │   └── [ubs]/            # Detalhes específicos da UBS
│   │   ├── feedback/             # Sistema de avaliação
│   │   └── mapa/                 # Localização de UBS
│   ├── (dashboard)/              # Rotas protegidas
│   │   ├── admin/                # Painel administrativo
│   │   │   ├── usuarios/         # Gestão de usuários
│   │   │   ├── ubs/              # CRUD de UBS
│   │   │   └── relatorios/       # Métricas e relatórios
│   │   └── inicio/               # Área do início
│   ├── api/                      # API Routes (Backend)
│   │   ├── auth/                 # Autenticação
│   │   ├── vacinas/              # CRUD vacinas
│   │   ├── ubs/                  # CRUD unidades
│   │   ├── feedback/             # Sistema de avaliação
│   │   └── notifications/        # WhatsApp e notificações
│   ├── layout.tsx                # Layout raiz
│   ├── page.tsx                  # Página inicial
│   └── globals.css               # Estilos globais
│
├── components/                   # Componentes reutilizáveis
│   ├── design/                   # Design System
│   │   ├── BvButton.tsx          # Botão customizado
│   │   ├── BvCard.tsx            # Card do projeto
│   │   ├── BvInput.tsx           # Input personalizado
│   │   └── index.ts              # Barrel exports
│   ├── layout/                   # Estrutura das páginas
│   │   ├── AppLayout.tsx         # Layout principal
│   │   ├── Navbar.tsx            # Navegação superior
│   │   ├── Sidebar.tsx           # Menu lateral
│   │   └── FooterBar.tsx         # Rodapé
│   └── ui/                       # Componentes base (shadcn/ui)
│       ├── button.tsx            # Botão base
│       ├── card.tsx              # Card base
│       └── ...                   # Outros componentes UI
│
├── features/                     # Módulos de negócio
│   ├── vaccination/              # Domínio de vacinação
│   │   ├── components/           # Componentes específicos
│   │   ├── hooks/                # Hooks customizados
│   │   ├── services/             # Lógica de negócio
│   │   ├── types/                # Tipos TypeScript
│   │   └── utils/                # Utilitários específicos
│   ├── feedback/                 # Sistema de avaliação
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   ├── location/                 # Geolocalização
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── notifications/            # WhatsApp e alertas
│       ├── components/
│       ├── hooks/
│       └── services/
│
├── lib/                          # Configurações e utilitários
│   ├── auth.ts                   # Configuração NextAuth
│   ├── database.ts               # Conexão MongoDB
│   ├── utils.ts                  # Utilitários gerais
│   ├── validations.ts            # Schemas de validação
│   └── constants.ts              # Constantes da aplicação
│
├── services/                     # Serviços externos
│   ├── maps.ts                   # Google Maps API
│   ├── whatsapp.ts               # WhatsApp API
│   ├── geolocation.ts            # Geolocation API
│   └── analytics.ts              # Métricas e tracking
│
├── types/                        # Definições TypeScript globais
│   ├── auth.ts                   # Tipos de autenticação
│   ├── api.ts                    # Tipos das APIs
│   └── global.ts                 # Tipos globais
│
├── middleware.ts                 # Middleware de autenticação
└── styles/                       # Estilos adicionais
    └── components.css            # Estilos específicos`}
      </pre>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>🔐 Segurança e Autenticação</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            backgroundColor: '#fef2f2',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #fecaca',
          }}
        >
          <h3 style={{ color: '#991b1b', marginTop: 0, marginBottom: '1rem' }}>
            🛡️ Middleware de Proteção
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#991b1b', lineHeight: '1.5' }}>
            <li>Rotas administrativas protegidas</li>
            <li>Verificação de roles e permissões</li>
            <li>Redirecionamento automático</li>
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
          <h3 style={{ color: '#14532d', marginTop: 0, marginBottom: '1rem' }}>🔒 NextAuth.js</h3>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#14532d', lineHeight: '1.5' }}>
            <li>Sessões seguras e persistentes</li>
            <li>Múltiplos providers de login</li>
            <li>JWT tokens criptografados</li>
          </ul>
        </div>

        <div
          style={{
            backgroundColor: '#fefbef',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #fde68a',
          }}
        >
          <h3 style={{ color: '#92400e', marginTop: 0, marginBottom: '1rem' }}>
            ✅ Consentimento LGPD
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#92400e', lineHeight: '1.5' }}>
            <li>Captura explícita de consentimento</li>
            <li>Gestão de preferências</li>
            <li>Opt-out a qualquer momento</li>
          </ul>
        </div>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>
        🚀 Estratégia de Deploy e Escalabilidade
      </h2>

      <div
        style={{
          backgroundColor: '#f8fafc',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #e2e8f0',
        }}
      >
        <h3 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1rem' }}>
          ☁️ Opções de Deploy
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#0f172a',
              color: 'white',
              padding: '1rem',
              borderRadius: '6px',
            }}
          >
            <h4 style={{ margin: '0 0 0.5rem 0' }}>🔺 Vercel (Recomendado)</h4>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              Deploy automático, edge functions, otimização para Next.js
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#1e40af',
              color: 'white',
              padding: '1rem',
              borderRadius: '6px',
            }}
          >
            <h4 style={{ margin: '0 0 0.5rem 0' }}>🐳 Docker + Render/Fly.io</h4>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              Maior controle, containers escaláveis, múltiplas regiões
            </p>
          </div>
        </div>

        <h4 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>📈 Preparação para Escala</h4>
        <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: '1.6' }}>
          <li>
            <strong>APIs desacopláveis:</strong> Prontas para migração para microserviços
          </li>
          <li>
            <strong>MongoDB Atlas:</strong> Sharding automático e réplicas
          </li>
          <li>
            <strong>CDN:</strong> Cache de assets estáticos e imagens
          </li>
          <li>
            <strong>Monitoramento:</strong> Métricas de performance e uso
          </li>
        </ul>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>📊 Roadmap de Desenvolvimento</h2>

      <div style={{ marginBottom: '2rem' }}>
        <div
          style={{
            backgroundColor: '#dcfce7',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid #bbf7d0',
          }}
        >
          <h3 style={{ color: '#14532d', marginTop: 0, marginBottom: '1rem' }}>
            📦 MVP 1: Base Pública (Em Desenvolvimento)
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#14532d', lineHeight: '1.6' }}>
            <li>✅ Listagem de vacinas por UBS</li>
            <li>✅ Sistema de feedback de atendimento</li>
            <li>✅ Acessibilidade WCAG 2.1 AA</li>
            <li>🔄 Design system completo</li>
          </ul>
        </div>

        <div
          style={{
            backgroundColor: '#dbeafe',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid #93c5fd',
          }}
        >
          <h3 style={{ color: '#1e40af', marginTop: 0, marginBottom: '1rem' }}>
            🔔 MVP 2: Notificações e Registro
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#1e40af', lineHeight: '1.6' }}>
            <li>📱 Integração WhatsApp com consentimento</li>
            <li>📋 Registro manual de vacinação</li>
            <li>🔐 Sistema de autenticação completo</li>
            <li>📊 Dashboard administrativo básico</li>
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
          <h3 style={{ color: '#581c87', marginTop: 0, marginBottom: '1rem' }}>
            🗺️ MVP 3: Geolocalização e Integrações
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#581c87', lineHeight: '1.6' }}>
            <li>🗺️ Mapa interativo com Google Maps</li>
            <li>📍 Geolocalização de UBS próximas</li>
            <li>🔗 Integração com sistemas externos (e-SUS)</li>
            <li>📈 Analytics avançado e relatórios</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof Architecture> = {
  title: '📖 Documentação/Arquitetura Técnica',
  component: Architecture,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
