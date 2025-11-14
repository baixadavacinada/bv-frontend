import type { Meta, StoryObj } from '@storybook/nextjs'

const Welcome = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ color: '#2563eb', marginBottom: '1rem', fontSize: '2.5rem' }}>
        Design System da Baixada Vacinada!
      </h1>

      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem', color: '#374151' }}>
        Bem-vindos à documentação do sistema de design da <strong>Baixada Vacinada</strong>! Este é
        o seu guia central para todos os componentes, padrões de design e diretrizes de
        desenvolvimento do nosso projeto.
      </p>

      <div
        style={{
          backgroundColor: '#eff6ff',
          padding: '1.5rem',
          borderRadius: '12px',
          borderLeft: '4px solid #2563eb',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ color: '#1e40af', marginBottom: '1rem', marginTop: 0 }}>
          🎯 Objetivo do Projeto
        </h2>
        <p style={{ lineHeight: '1.6', margin: 0, color: '#1e40af' }}>
          Criar uma plataforma <strong>acessível, escalável e performática</strong> para informar a
          população sobre vacinas e unidades de saúde, garantindo acesso inclusivo, com painel
          administrativo e funcionalidades públicas otimizadas.
        </p>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>👥 Público-alvo</h2>
      <ul style={{ lineHeight: '1.8', marginBottom: '2rem', fontSize: '1.1rem' }}>
        <li>
          <strong>População geral</strong> - Acesso às informações sobre vacinas e UBS
        </li>
        <li>
          <strong>Profissionais de saúde</strong> - Ferramentas para gestão e atendimento
        </li>
        <li>
          <strong>Administradores</strong> - Painel de controle e métricas
        </li>
      </ul>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>🚀 Stack Tecnológica Principal</h2>

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
            backgroundColor: '#f8fafc',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
          }}
        >
          <h3 style={{ color: '#0f172a', marginTop: 0, marginBottom: '0.5rem' }}>⚛️ Frontend</h3>
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <strong>Next.js</strong> - Framework React full-stack
            </li>
            <li>
              <strong>TypeScript</strong> - Tipagem segura
            </li>
            <li>
              <strong>TailwindCSS</strong> - Design system responsivo
            </li>
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
          <h3 style={{ color: '#14532d', marginTop: 0, marginBottom: '0.5rem' }}>
            🛠️ Backend & Auth
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <strong>MongoDB Atlas</strong> - Banco NoSQL escalável
            </li>
            <li>
              <strong>NextAuth.js</strong> - Autenticação segura
            </li>
            <li>
              <strong>API Routes</strong> - Backend integrado
            </li>
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
          <h3 style={{ color: '#92400e', marginTop: 0, marginBottom: '0.5rem' }}>🔗 Integrações</h3>
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            <li>
              <strong>Google Maps API</strong> - Localização de UBS
            </li>
            <li>
              <strong>WhatsApp API</strong> - Notificações
            </li>
            <li>
              <strong>Geolocation API</strong> - GPS do usuário
            </li>
          </ul>
        </div>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>🏗️ Arquitetura Feature-First</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
        Utilizamos uma arquitetura baseada em domínio/funcionalidade que oferece:
      </p>
      <ul style={{ lineHeight: '1.6', marginBottom: '2rem', paddingLeft: '1.5rem' }}>
        <li>
          🔍 <strong>Facilidade de encontrar componentes</strong> por contexto
        </li>
        <li>
          📦 <strong>Componentes agrupados</strong> por funcionalidade
        </li>
        <li>
          ♻️ <strong>Componentes reutilizáveis</strong> usando o design system
        </li>
        <li>
          📈 <strong>Facilidade de escalabilidade</strong> do sistema
        </li>
      </ul>

      <pre
        style={{
          backgroundColor: '#f1f5f9',
          padding: '1.5rem',
          borderRadius: '8px',
          fontSize: '0.9rem',
          overflow: 'auto',
          marginBottom: '2rem',
        }}
      >
        {`src/
├── app/              # Rotas e páginas (App Router)
│   ├── vacinas/      # Listagem e detalhes de vacinas
│   ├── feedback/     # Sistema de avaliação
│   └── admin/        # Painel administrativo
├── components/       # Componentes reutilizáveis
│   ├── design/       # Componentes do design system
│   ├── layout/       # Estrutura das páginas
│   └── ui/           # Componentes base (shadcn/ui)
├── features/         # Módulos de negócio
│   ├── vaccination/  # Lógica de vacinas
│   ├── feedback/     # Sistema de feedback
│   └── location/     # Geolocalização
├── services/         # Utilitários e APIs
├── lib/              # Configurações e helpers
└── types/            # Definições TypeScript
`}
      </pre>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>♿ Compromisso com Acessibilidade</h2>
      <div
        style={{
          backgroundColor: '#f0f9ff',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #bae6fd',
        }}
      >
        <p style={{ lineHeight: '1.6', margin: '0 0 1rem 0', color: '#0c4a6e' }}>
          <strong>Padrão WCAG 2.1 AA</strong> implementado desde o início:
        </p>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#0c4a6e' }}>
          <li>✅ Navegação completa por teclado</li>
          <li>✅ Alto contraste e design tokens</li>
          <li>✅ Labels semânticos e aria-labels</li>
          <li>✅ Compatibilidade com leitores de tela</li>
          <li>✅ Testes automatizados (Lighthouse, axe-core)</li>
        </ul>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>📱 Funcionalidades Principais</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff7ed',
            padding: '1.2rem',
            borderRadius: '8px',
            border: '1px solid #fed7aa',
          }}
        >
          <h3 style={{ color: '#9a3412', marginTop: 0, marginBottom: '0.8rem' }}>
            💉 Vacinas por UBS
          </h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#9a3412' }}>
            Listagem atualizada de vacinas disponíveis em cada unidade de saúde
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#f0f9ff',
            padding: '1.2rem',
            borderRadius: '8px',
            border: '1px solid #bae6fd',
          }}
        >
          <h3 style={{ color: '#0c4a6e', marginTop: 0, marginBottom: '0.8rem' }}>
            📝 Sistema de Feedback
          </h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#0c4a6e' }}>
            Avaliação da qualidade do atendimento nas unidades
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#f0fdf4',
            padding: '1.2rem',
            borderRadius: '8px',
            border: '1px solid #bbf7d0',
          }}
        >
          <h3 style={{ color: '#14532d', marginTop: 0, marginBottom: '0.8rem' }}>
            📱 Notificações WhatsApp
          </h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#14532d' }}>
            Lembretes e atualizações via WhatsApp com consentimento
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#fdf4ff',
            padding: '1.2rem',
            borderRadius: '8px',
            border: '1px solid #e9d5ff',
          }}
        >
          <h3 style={{ color: '#581c87', marginTop: 0, marginBottom: '0.8rem' }}>
            🗺️ Geolocalização
          </h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#581c87' }}>
            Localização das UBS mais próximas do usuário
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#fefce8',
            padding: '1.2rem',
            borderRadius: '8px',
            border: '1px solid #fde047',
          }}
        >
          <h3 style={{ color: '#713f12', marginTop: 0, marginBottom: '0.8rem' }}>
            📋 Registro Manual
          </h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#713f12' }}>
            Controle pessoal do histórico de vacinação
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#fdf2f8',
            padding: '1.2rem',
            borderRadius: '8px',
            border: '1px solid #fbcfe8',
          }}
        >
          <h3 style={{ color: '#831843', marginTop: 0, marginBottom: '0.8rem' }}>
            👨‍💼 Painel Admin
          </h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#831843' }}>
            Gestão de conteúdo e métricas para administradores
          </p>
        </div>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>💡 Como usar esta documentação</h2>

      <div
        style={{
          backgroundColor: '#f8fafc',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #e2e8f0',
        }}
      >
        <ol style={{ lineHeight: '1.8', margin: 0, paddingLeft: '1.5rem' }}>
          <li>
            <strong>Navegue pelos componentes</strong> usando o menu lateral
          </li>
          <li>
            <strong>Visualize as variações</strong> em diferentes estados
          </li>
          <li>
            <strong>Teste a interatividade</strong> com os controles disponíveis
          </li>
          <li>
            <strong>Copie os exemplos</strong> de código para uso no projeto
          </li>
          <li>
            <strong>Verifique a acessibilidade</strong> com as ferramentas integradas
          </li>
          <li>
            <strong>Explore o design system</strong> nas seções dedicadas
          </li>
        </ol>
      </div>
    </div>
  )
}

const meta: Meta<typeof Welcome> = {
  title: '📖 Introdução',
  component: Welcome,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const BemVindos: Story = {}
