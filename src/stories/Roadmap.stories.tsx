import type { Meta, StoryObj } from '@storybook/nextjs'

const Roadmap = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ color: '#2563eb', marginBottom: '1rem', fontSize: '2.5rem' }}>
        📈 Roadmap & Métricas
      </h1>

      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem', color: '#374151' }}>
        Acompanhe a evolução do projeto Baixada Vacinada através dos nossos marcos de
        desenvolvimento e <strong>métricas de impacto social</strong>.
      </p>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>
        🎯 Estratégia MVP (Minimum Viable Product)
      </h2>

      <p style={{ lineHeight: '1.6', marginBottom: '2rem', color: '#4b5563' }}>
        Nossa abordagem é construir em <strong>fases incrementais</strong>, priorizando
        funcionalidades que geram maior impacto para a população com menor complexidade técnica.
      </p>

      <div style={{ marginBottom: '3rem' }}>
        <div
          style={{
            backgroundColor: '#dcfce7',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            border: '1px solid #bbf7d0',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              left: '2rem',
              backgroundColor: '#16a34a',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
            }}
          >
            ✅ EM DESENVOLVIMENTO
          </div>

          <h3
            style={{
              color: '#14532d',
              marginTop: '0.5rem',
              marginBottom: '1.5rem',
              fontSize: '1.6rem',
            }}
          >
            📦 MVP 1: Base Pública Funcional
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: '1.2rem',
                borderRadius: '8px',
                border: '1px solid #bbf7d0',
              }}
            >
              <h4 style={{ color: '#14532d', margin: '0 0 0.8rem 0' }}>💉 Vacinas por UBS</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#166534', lineHeight: '1.5' }}>
                <li>Listagem atualizada de vacinas</li>
                <li>Filtros por tipo e disponibilidade</li>
                <li>Informações detalhadas das UBS</li>
                <li>Horários de funcionamento</li>
              </ul>
            </div>

            <div
              style={{
                backgroundColor: 'white',
                padding: '1.2rem',
                borderRadius: '8px',
                border: '1px solid #bbf7d0',
              }}
            >
              <h4 style={{ color: '#14532d', margin: '0 0 0.8rem 0' }}>📝 Sistema de Feedback</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#166534', lineHeight: '1.5' }}>
                <li>Avaliação da qualidade do atendimento</li>
                <li>Comentários e sugestões</li>
                <li>Relatórios consolidados</li>
                <li>Dashboard administrativo básico</li>
              </ul>
            </div>

            <div
              style={{
                backgroundColor: 'white',
                padding: '1.2rem',
                borderRadius: '8px',
                border: '1px solid #bbf7d0',
              }}
            >
              <h4 style={{ color: '#14532d', margin: '0 0 0.8rem 0' }}>♿ Acessibilidade Total</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#166534', lineHeight: '1.5' }}>
                <li>Padrão WCAG 2.1 AA completo</li>
                <li>Navegação por teclado</li>
                <li>Leitores de tela</li>
                <li>Alto contraste</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#f0fdf4',
              padding: '1.2rem',
              borderRadius: '8px',
              border: '1px solid #bbf7d0',
            }}
          >
            <h4 style={{ color: '#14532d', margin: '0 0 0.8rem 0' }}>🎯 Objetivos do MVP 1</h4>
            <p style={{ margin: 0, color: '#166534', lineHeight: '1.6' }}>
              <strong>Lançar uma base sólida e auditável</strong> que permita à população acessar
              informações essenciais sobre vacinação de forma inclusiva e acessível.
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#dbeafe',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            border: '1px solid #93c5fd',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              left: '2rem',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
            }}
          >
            🔄 PRÓXIMA FASE
          </div>

          <h3
            style={{
              color: '#1e40af',
              marginTop: '0.5rem',
              marginBottom: '1.5rem',
              fontSize: '1.6rem',
            }}
          >
            🔔 MVP 2: Notificações e Registro Pessoal
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: '1.2rem',
                borderRadius: '8px',
                border: '1px solid #93c5fd',
              }}
            >
              <h4 style={{ color: '#1e40af', margin: '0 0 0.8rem 0' }}>📱 WhatsApp Integration</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#1d4ed8', lineHeight: '1.5' }}>
                <li>Lembretes de vacinação</li>
                <li>Atualizações de disponibilidade</li>
                <li>Confirmações de agendamento</li>
                <li>Consentimento LGPD completo</li>
              </ul>
            </div>

            <div
              style={{
                backgroundColor: 'white',
                padding: '1.2rem',
                borderRadius: '8px',
                border: '1px solid #93c5fd',
              }}
            >
              <h4 style={{ color: '#1e40af', margin: '0 0 0.8rem 0' }}>📋 Registro Manual</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#1d4ed8', lineHeight: '1.5' }}>
                <li>Carteira de vacinação digital</li>
                <li>Histórico pessoal</li>
                <li>Funcionalidade offline</li>
                <li>Exportação de dados</li>
              </ul>
            </div>

            <div
              style={{
                backgroundColor: 'white',
                padding: '1.2rem',
                borderRadius: '8px',
                border: '1px solid #93c5fd',
              }}
            >
              <h4 style={{ color: '#1e40af', margin: '0 0 0.8rem 0' }}>🔐 Autenticação Completa</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#1d4ed8', lineHeight: '1.5' }}>
                <li>Login social (Google, Facebook)</li>
                <li>Perfis de usuário</li>
                <li>Roles e permissões</li>
                <li>Dashboard personalizado</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#eff6ff',
              padding: '1.2rem',
              borderRadius: '8px',
              border: '1px solid #93c5fd',
            }}
          >
            <h4 style={{ color: '#1e40af', margin: '0 0 0.8rem 0' }}>🎯 Objetivos do MVP 2</h4>
            <p style={{ margin: 0, color: '#1d4ed8', lineHeight: '1.6' }}>
              <strong>Criar engajamento contínuo</strong> através de notificações inteligentes e
              ferramentas que empoderam o usuário no controle da sua saúde.
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#fdf4ff',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            border: '1px solid #e9d5ff',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-12px',
              left: '2rem',
              backgroundColor: '#7c3aed',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
            }}
          >
            🚀 FUTURO
          </div>

          <h3
            style={{
              color: '#581c87',
              marginTop: '0.5rem',
              marginBottom: '1.5rem',
              fontSize: '1.6rem',
            }}
          >
            🗺️ MVP 3: Geolocalização e Integrações Avançadas
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: '1.2rem',
                borderRadius: '8px',
                border: '1px solid #e9d5ff',
              }}
            >
              <h4 style={{ color: '#581c87', margin: '0 0 0.8rem 0' }}>🗺️ Mapa Interativo</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#6b21a8', lineHeight: '1.5' }}>
                <li>Google Maps integrado</li>
                <li>UBS mais próximas</li>
                <li>Rotas e direções</li>
                <li>Tempo de deslocamento</li>
              </ul>
            </div>

            <div
              style={{
                backgroundColor: 'white',
                padding: '1.2rem',
                borderRadius: '8px',
                border: '1px solid #e9d5ff',
              }}
            >
              <h4 style={{ color: '#581c87', margin: '0 0 0.8rem 0' }}>🔗 Integração e-SUS</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#6b21a8', lineHeight: '1.5' }}>
                <li>Dados oficiais do Ministério</li>
                <li>Sincronização automática</li>
                <li>Relatórios governamentais</li>
                <li>APIs padronizadas</li>
              </ul>
            </div>

            <div
              style={{
                backgroundColor: 'white',
                padding: '1.2rem',
                borderRadius: '8px',
                border: '1px solid #e9d5ff',
              }}
            >
              <h4 style={{ color: '#581c87', margin: '0 0 0.8rem 0' }}>📊 Analytics Avançado</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#6b21a8', lineHeight: '1.5' }}>
                <li>Dashboards inteligentes</li>
                <li>Predição de demanda</li>
                <li>Relatórios automáticos</li>
                <li>BI para gestores</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#f3e8ff',
              padding: '1.2rem',
              borderRadius: '8px',
              border: '1px solid #e9d5ff',
            }}
          >
            <h4 style={{ color: '#581c87', margin: '0 0 0.8rem 0' }}>🎯 Objetivos do MVP 3</h4>
            <p style={{ margin: 0, color: '#6b21a8', lineHeight: '1.6' }}>
              <strong>Tornar-se referência nacional</strong> em plataformas de saúde digital,
              integrando-se ao ecossistema oficial de saúde do Brasil.
            </p>
          </div>
        </div>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>📊 Métricas de Sucesso</h2>

      <p style={{ lineHeight: '1.6', marginBottom: '2rem', color: '#4b5563' }}>
        Acompanhamos o <strong>impacto real</strong> da plataforma através de métricas quantitativas
        e qualitativas que demonstram o valor para a população.
      </p>

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
                Funcionalidade
              </th>
              <th
                style={{
                  padding: '1.2rem',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}
              >
                Métricas Principais
              </th>
              <th
                style={{
                  padding: '1.2rem',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}
              >
                Meta de Sucesso
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: 'white' }}>
              <td style={{ padding: '1.2rem', fontWeight: 'bold', color: '#1f2937' }}>
                💉 Vacinas por UBS
              </td>
              <td style={{ padding: '1.2rem', color: '#4b5563' }}>
                • Tempo médio na tela
                <br />
                • Número de acessos diários
                <br />• Taxa de retorno dos usuários
              </td>
              <td style={{ padding: '1.2rem' }}>
                <span
                  style={{
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                  }}
                >
                  &gt; 1000 usuários/mês
                </span>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '1.2rem', fontWeight: 'bold', color: '#1f2937' }}>
                📝 Sistema de Feedback
              </td>
              <td style={{ padding: '1.2rem', color: '#4b5563' }}>
                • NPS médio das UBS
                <br />
                • Número de feedbacks enviados
                <br />• Taxa de resolução de problemas
              </td>
              <td style={{ padding: '1.2rem' }}>
                <span
                  style={{
                    backgroundColor: '#dbeafe',
                    color: '#1d4ed8',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                  }}
                >
                  NPS &gt; 70
                </span>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: 'white' }}>
              <td style={{ padding: '1.2rem', fontWeight: 'bold', color: '#1f2937' }}>
                📱 Notificações WhatsApp
              </td>
              <td style={{ padding: '1.2rem', color: '#4b5563' }}>
                • Número de opt-ins
                <br />
                • Taxa de entrega de mensagens
                <br />• Engajamento com notificações
              </td>
              <td style={{ padding: '1.2rem' }}>
                <span
                  style={{
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                  }}
                >
                  80% opt-in rate
                </span>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '1.2rem', fontWeight: 'bold', color: '#1f2937' }}>
                🗺️ Geolocalização
              </td>
              <td style={{ padding: '1.2rem', color: '#4b5563' }}>
                • Cliques no mapa
                <br />
                • Uso do GPS
                <br />• Tempo para encontrar UBS
              </td>
              <td style={{ padding: '1.2rem' }}>
                <span
                  style={{
                    backgroundColor: '#fdf4ff',
                    color: '#6b21a8',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                  }}
                >
                  &lt; 30s busca
                </span>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: 'white' }}>
              <td style={{ padding: '1.2rem', fontWeight: 'bold', color: '#1f2937' }}>
                📋 Registro Manual
              </td>
              <td style={{ padding: '1.2rem', color: '#4b5563' }}>
                • Número de registros criados
                <br />
                • Frequência de uso
                <br />• Taxa de retorno ao app
              </td>
              <td style={{ padding: '1.2rem' }}>
                <span
                  style={{
                    backgroundColor: '#ecfdf5',
                    color: '#059669',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                  }}
                >
                  500+ carteiras ativas
                </span>
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <td style={{ padding: '1.2rem', fontWeight: 'bold', color: '#1f2937' }}>
                ♿ Acessibilidade
              </td>
              <td style={{ padding: '1.2rem', color: '#4b5563' }}>
                • Número de erros WCAG
                <br />
                • Uso por leitores de tela
                <br />• Feedback de acessibilidade
              </td>
              <td style={{ padding: '1.2rem' }}>
                <span
                  style={{
                    backgroundColor: '#fef2f2',
                    color: '#dc2626',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                  }}
                >
                  Zero erros críticos
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>📋 Processo de Feedback Contínuo</h2>

      <div
        style={{
          backgroundColor: '#f0f9ff',
          padding: '2rem',
          borderRadius: '12px',
          marginBottom: '3rem',
          border: '1px solid #bae6fd',
        }}
      >
        <h3 style={{ color: '#0c4a6e', marginTop: 0, marginBottom: '1.5rem' }}>
          🔄 Ciclo de Melhoria Contínua
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #bae6fd',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
            <h4 style={{ color: '#0c4a6e', margin: '0 0 0.8rem 0' }}>1. Coleta de Dados</h4>
            <p style={{ margin: 0, color: '#075985', fontSize: '0.9rem' }}>
              Analytics automático, feedback dos usuários e métricas de performance
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #bae6fd',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
            <h4 style={{ color: '#0c4a6e', margin: '0 0 0.8rem 0' }}>2. Análise</h4>
            <p style={{ margin: 0, color: '#075985', fontSize: '0.9rem' }}>
              Identificação de padrões, gargalos e oportunidades de melhoria
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #bae6fd',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
            <h4 style={{ color: '#0c4a6e', margin: '0 0 0.8rem 0' }}>3. Implementação</h4>
            <p style={{ margin: 0, color: '#075985', fontSize: '0.9rem' }}>
              Desenvolvimento ágil de melhorias baseadas em dados reais
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #bae6fd',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
            <h4 style={{ color: '#0c4a6e', margin: '0 0 0.8rem 0' }}>4. Validação</h4>
            <p style={{ margin: 0, color: '#075985', fontSize: '0.9rem' }}>
              Testes A/B, medição de impacto e validação com usuários
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#0c4a6e',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h4 style={{ margin: '0 0 1rem 0' }}>📝 Relatório Consolidado</h4>
          <p style={{ margin: 0, lineHeight: '1.6' }}>
            Ao final de cada ciclo, consolidamos um relatório com:
            <br />
            <strong>
              • Sugestões de melhoria • Evoluções para próximas fases • Métricas de impacto real
            </strong>
          </p>
        </div>
      </div>

      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>🌟 Visão de Longo Prazo</h2>

      <div
        style={{
          backgroundColor: '#f8fafc',
          padding: '2rem',
          borderRadius: '12px',
          marginBottom: '3rem',
          border: '1px solid #e2e8f0',
        }}
      >
        <h3 style={{ color: '#1e293b', marginTop: 0, marginBottom: '1.5rem' }}>
          🎯 Objetivos Estratégicos
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#f0fdf4',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #bbf7d0',
            }}
          >
            <h4 style={{ color: '#14532d', margin: '0 0 1rem 0' }}>🏆 Tornar-se Referência</h4>
            <p style={{ margin: 0, color: '#166534', lineHeight: '1.6' }}>
              Ser reconhecida como a <strong>plataforma modelo</strong> para iniciativas de saúde
              digital no Brasil, replicável em outras regiões.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#eff6ff',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #bfdbfe',
            }}
          >
            <h4 style={{ color: '#1e40af', margin: '0 0 1rem 0' }}>🔗 Integração Nacional</h4>
            <p style={{ margin: 0, color: '#1d4ed8', lineHeight: '1.6' }}>
              Conectar-se ao <strong>ecossistema oficial</strong> de saúde (e-SUS, DataSUS) para
              maximizar o impacto e alcance.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#fdf4ff',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e9d5ff',
            }}
          >
            <h4 style={{ color: '#581c87', margin: '0 0 1rem 0' }}>📊 Impacto Mensurável</h4>
            <p style={{ margin: 0, color: '#6b21a8', lineHeight: '1.6' }}>
              Demonstrar <strong>impacto quantificável</strong> na melhoria dos índices de vacinação
              da Baixada Santista.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof Roadmap> = {
  title: '📖 Documentação/Roadmap & Métricas',
  component: Roadmap,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
