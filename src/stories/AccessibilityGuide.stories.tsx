import type { Meta, StoryObj } from '@storybook/nextjs'
import { withNextIntl } from '../../.storybook/decorators'
import { useAccessibilityValidation, useLiveRegion, useFocusTrap } from '@/hooks/use-accessibility'
import { useState, useRef, useEffect } from 'react'

// Componente principal de documentação
const AccessibilityGuideDoc = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-12 p-6">
      <header className="space-y-6 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">♿ Sistema de Acessibilidade</h1>
        <p className="mx-auto max-w-3xl text-xl text-gray-600">
          Hooks e utilitários para implementar padrões WCAG 2.1 AA de forma consistente em todos os
          componentes do projeto
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Card 1: Validação Automática */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <span className="text-lg">🔍</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">useAccessibilityValidation</h3>
              <p className="text-sm text-gray-600">Validação automática em desenvolvimento</p>
            </div>
          </div>
          <p className="mb-4 text-gray-700">
            Detecta automaticamente problemas de acessibilidade durante o desenvolvimento
          </p>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• Imagens sem alt text</li>
            <li>• Botões sem labels</li>
            <li>• Hierarquia de headings</li>
            <li>• Landmarks inadequados</li>
          </ul>
        </div>

        {/* Card 2: Live Regions */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <span className="text-lg">📢</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">useLiveRegion</h3>
              <p className="text-sm text-gray-600">Anúncios para leitores de tela</p>
            </div>
          </div>
          <p className="mb-4 text-gray-700">
            Comunica mudanças dinâmicas aos usuários de tecnologias assistivas
          </p>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• Feedback de ações</li>
            <li>• Estados de loading</li>
            <li>• Mensagens de erro/sucesso</li>
            <li>• Mudanças de conteúdo</li>
          </ul>
        </div>

        {/* Card 3: Focus Management */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <span className="text-lg">🎯</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">useFocusTrap</h3>
              <p className="text-sm text-gray-600">Gerenciamento de foco</p>
            </div>
          </div>
          <p className="mb-4 text-gray-700">
            Controla o foco em modais, menus e componentes interativos
          </p>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• Focus trap em modais</li>
            <li>• Navegação por teclado</li>
            <li>• Restauração de foco</li>
            <li>• Escape key handling</li>
          </ul>
        </div>

        {/* Card 4: Outros Hooks */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
              <span className="text-lg">🛠️</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Hooks Utilitários</h3>
              <p className="text-sm text-gray-600">Ferramentas complementares</p>
            </div>
          </div>
          <p className="mb-4 text-gray-700">Utilitários para casos específicos de acessibilidade</p>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• useSkipLink - Skip navigation</li>
            <li>• useColorContrast - Validação de cores</li>
            <li>• usePerformanceA11y - Performance</li>
          </ul>
        </div>
      </div>

      <section className="rounded-lg bg-blue-50 p-6">
        <h2 className="mb-4 text-xl font-semibold text-blue-900">
          🚀 Checklist para Novos Componentes
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="font-medium text-blue-900">Durante o Desenvolvimento:</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>□ Adicionar useAccessibilityValidation</li>
              <li>□ Implementar navegação por teclado</li>
              <li>□ Adicionar aria-labels apropriados</li>
              <li>□ Usar elementos semânticos corretos</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-blue-900">Para Interações:</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>□ Implementar useLiveRegion para feedback</li>
              <li>□ Adicionar focus management se necessário</li>
              <li>□ Testar com leitores de tela</li>
              <li>□ Validar contraste de cores</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

// Componente para demonstrar useAccessibilityValidation
const ValidationExample = () => {
  useAccessibilityValidation({
    enabled: true,
    delay: 1000,
    logLevel: 'warn',
  })

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-xl font-semibold">Exemplo com Validação</h2>
      <p>
        Este componente está executando validações de acessibilidade. Abra o console para ver os
        resultados.
      </p>

      {/* Exemplo com problemas intencionais para demonstração */}
      <img src="/placeholder.jpg" className="h-32 w-32 bg-gray-200" />
      <button className="rounded bg-blue-500 px-4 py-2 text-white">Botão sem label</button>

      <div className="mt-4 rounded bg-gray-100 p-4">
        <h4 className="mb-2 font-medium">Problemas detectados:</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• Imagem sem alt text</li>
          <li>• Botão sem aria-label ou texto descritivo</li>
          <li>• Verifique o console para mais detalhes</li>
        </ul>
      </div>
    </div>
  )
}

// Componente para demonstrar useLiveRegion
const LiveRegionExample = () => {
  const { announceSuccess, announceError, announceToScreenReader } = useLiveRegion()
  const [status, setStatus] = useState('')

  const handleSuccess = () => {
    announceSuccess('Operação realizada com sucesso!')
    setStatus('Sucesso anunciado aos leitores de tela')
  }

  const handleError = () => {
    announceError('Erro na operação')
    setStatus('Erro anunciado aos leitores de tela')
  }

  const handleCustom = () => {
    announceToScreenReader('Informação personalizada', 'polite')
    setStatus('Anúncio personalizado enviado')
  }

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-xl font-semibold">Exemplo Live Region</h2>
      <p>Use os botões para testar anúncios para leitores de tela:</p>

      <div className="flex gap-4">
        <button
          onClick={handleSuccess}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Anunciar Sucesso
        </button>
        <button
          onClick={handleError}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Anunciar Erro
        </button>
        <button
          onClick={handleCustom}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Anúncio Personalizado
        </button>
      </div>

      {status && (
        <div className="border-l-4 border-blue-400 bg-blue-50 p-3">
          <p className="text-blue-800">{status}</p>
        </div>
      )}
    </div>
  )
}

// Componente para demonstrar useFocusTrap
const FocusTrapExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const { trapFocus } = useFocusTrap()

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      const cleanup = trapFocus(modalRef.current, {
        escapeDeactivates: true,
        restoreFocus: document.activeElement as HTMLElement,
      })

      const handleEscape = () => setIsModalOpen(false)
      modalRef.current.addEventListener('focustrap:escape', handleEscape)

      return () => {
        cleanup()
        modalRef.current?.removeEventListener('focustrap:escape', handleEscape)
      }
    }
  }, [isModalOpen, trapFocus])

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Exemplo Focus Trap</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
      >
        Abrir Modal com Focus Trap
      </button>

      {isModalOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="mx-4 w-full max-w-md rounded-lg bg-white p-6"
          >
            <h3 id="modal-title" className="mb-4 text-lg font-semibold">
              Modal com Focus Trap
            </h3>
            <p className="mb-4 text-gray-600">
              Navegue com Tab. O foco ficará restrito a este modal. Use Escape para fechar.
            </p>
            <div className="flex gap-2">
              <button className="rounded bg-gray-200 px-3 py-1">Botão 1</button>
              <button className="rounded bg-gray-200 px-3 py-1">Botão 2</button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded bg-red-500 px-3 py-1 text-white"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const meta: Meta<typeof AccessibilityGuideDoc> = {
  title: 'Guias/Sistema de Acessibilidade',
  component: AccessibilityGuideDoc,
  decorators: [withNextIntl],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'aria-label', enabled: true },
          { id: 'aria-live', enabled: true },
          { id: 'focus-visible', enabled: true },
          { id: 'landmark-one-main', enabled: true },
        ],
      },
    },
    docs: {
      description: {
        component: `
### Guia de Acessibilidade

#### Este guia demonstra como usar os hooks de acessibilidade do projeto para implementar **padrões WCAG 2.1 AA** de forma consistente.

### Hooks Disponíveis

| Hook | Propósito | Quando usar |
|------|-----------|-------------|
| **useAccessibilityValidation** | Validação automática | Todos os componentes em desenvolvimento |
| **useLiveRegion** | Anúncios para leitores de tela | Feedback de ações e mudanças dinâmicas |
| **useFocusTrap** | Gerenciamento de foco | Modais, menus e overlays |

### Setup Básico Recomendado

\`\`\`tsx
import {
  useAccessibilityValidation,
  useLiveRegion
} from '@/hooks/use-accessibility'

export function MeuComponente() {
  // 1. Validação automática (só em desenvolvimento)
  useAccessibilityValidation({
    enabled: process.env.NODE_ENV === 'development',
    delay: 1000,
    logLevel: 'warn'
  })

  // 2. Feedback para usuários
  const { announceSuccess, announceError } = useLiveRegion()

  const handleAction = async () => {
    try {
      await minhaAcao()
      announceSuccess('Ação realizada com sucesso!')
    } catch (error) {
      announceError('Erro ao realizar ação')
    }
  }

  return (
    <div>
      {/* Seu componente aqui */}
    </div>
  )
}
\`\`\`

### Diretrizes de Implementação

**✅ Sempre faça:**
- Use \`useAccessibilityValidation\` em desenvolvimento
- Implemente feedback com \`useLiveRegion\`
- Adicione focus management em modais
- Teste com tecnologias assistivas

**❌ Evite:**
- Elementos interativos sem labels
- Mudanças de conteúdo sem anúncios
- Modais sem focus trap
- Contraste de cores inadequado

### Benefícios do Sistema

- **Validação automática**: Detecta problemas em tempo real
- **Feedback consistente**: Padrões uniformes de comunicação
- **Focus management**: Navegação por teclado otimizada
- **WCAG compliance**: Conformidade com padrões internacionais
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ===== HOOKS ESPECÍFICOS =====

export const ValidacaoAutomatica: Story = {
  name: '🔍 Hook: useAccessibilityValidation',
  render: () => <ValidationExample />,
  parameters: {
    docs: {
      description: {
        story: `
### useAccessibilityValidation

**Propósito:** Detecta automaticamente problemas de acessibilidade durante o desenvolvimento.

**Configuração recomendada:**
\`\`\`tsx
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

export function MeuComponente() {
  useAccessibilityValidation({
    enabled: process.env.NODE_ENV === 'development',
    delay: 1000,
    logLevel: 'warn'
  })

  return <div>{/* Seu componente */}</div>
}
\`\`\`

**O que detecta:**
- Imagens sem alt text adequado
- Botões sem labels acessíveis
- Problemas na hierarquia de headings
- Landmarks mal estruturados
- Elementos focáveis problemáticos
- Roles ARIA inadequados

**Opções de configuração:**
- \`enabled\`: Ativa/desativa a validação
- \`delay\`: Tempo de espera antes da validação (ms)
- \`logLevel\`: Nível de log ('error', 'warn', 'info')

**Quando usar:**
- Em todos os componentes durante desenvolvimento
- Para validar formulários e layouts complexos
- Antes de fazer deploy de novos recursos
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'image-alt', enabled: true },
        ],
      },
    },
  },
}

export const LiveRegions: Story = {
  name: '📢 Hook: useLiveRegion',
  render: () => <LiveRegionExample />,
  parameters: {
    docs: {
      description: {
        story: `
### useLiveRegion

**Propósito:** Comunica mudanças dinâmicas aos usuários de leitores de tela.

**Métodos disponíveis:**
\`\`\`tsx
import { useLiveRegion } from '@/hooks/use-accessibility'

export function FormularioComponente() {
  const { announceSuccess, announceError, announceToScreenReader } = useLiveRegion()

  const handleSubmit = async (dados) => {
    try {
      await enviarFormulario(dados)
      announceSuccess('Formulário enviado com sucesso!')
    } catch (error) {
      announceError('Erro ao enviar formulário. Tente novamente.')
    }
  }

  const handleCustomAnnouncement = () => {
    announceToScreenReader('Informação personalizada', 'polite')
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos do formulário */}
    </form>
  )
}
\`\`\`

**Métodos:**
- \`announceSuccess(message)\`: Feedback positivo
- \`announceError(message)\`: Notificação de erro
- \`announceToScreenReader(message, priority)\`: Anúncio personalizado

**Prioridades:**
- \`polite\`: Para informações não urgentes
- \`assertive\`: Para alertas importantes

**Quando usar:**
- Após submissão de formulários
- Durante estados de loading
- Para feedback de ações do usuário
- Quando o conteúdo muda dinamicamente
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'aria-live', enabled: true },
          { id: 'button-name', enabled: true },
        ],
      },
    },
  },
}

export const FocusManagement: Story = {
  name: '🎯 Hook: useFocusTrap',
  render: () => <FocusTrapExample />,
  parameters: {
    docs: {
      description: {
        story: `
### useFocusTrap

**Propósito:** Controla o foco em modais, menus e outros componentes interativos.

**Implementação completa:**
\`\`\`tsx
import { useFocusTrap } from '@/hooks/use-accessibility'
import { useEffect, useRef } from 'react'

export function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null)
  const { trapFocus } = useFocusTrap()

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const cleanup = trapFocus(modalRef.current, {
        escapeDeactivates: true,
        restoreFocus: document.activeElement
      })

      const handleEscape = () => onClose()
      modalRef.current.addEventListener('focustrap:escape', handleEscape)

      return () => {
        cleanup()
        modalRef.current?.removeEventListener('focustrap:escape', handleEscape)
      }
    }
  }, [isOpen, trapFocus, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className="modal-content"
      >
        {children}
      </div>
    </div>
  )
}
\`\`\`

**Recursos:**
- Focus trap automático
- Navegação circular com Tab/Shift+Tab
- Escape key handling automático
- Restauração de foco ao fechar

**Opções de configuração:**
- \`initialFocus\`: Elemento para foco inicial
- \`restoreFocus\`: Elemento para restaurar foco
- \`escapeDeactivates\`: Se Escape fecha o componente

**Quando usar:**
- Modais e dialogs
- Menus dropdown
- Popups e tooltips interativos
- Qualquer overlay que precisa confinar o foco
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'focus-visible', enabled: true },
          { id: 'keyboard', enabled: true },
          { id: 'aria-modal', enabled: true },
        ],
      },
    },
  },
}

// ===== PADRÕES E BOAS PRÁTICAS =====

export const PadroesRecomendados: Story = {
  name: '✅ Boas Práticas',
  render: () => (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="rounded border-l-4 border-green-400 bg-green-50 p-4">
          <h4 className="font-medium text-green-800">✅ Faça Sempre</h4>
          <ul className="mt-2 space-y-1 text-sm text-green-700">
            <li>Use useAccessibilityValidation em desenvolvimento</li>
            <li>Forneça feedback com useLiveRegion</li>
            <li>Implemente focus trap em modais</li>
            <li>Teste com leitores de tela reais</li>
            <li>Use aria-labels descritivos</li>
            <li>Mantenha hierarquia de headings</li>
          </ul>
        </div>

        <div className="rounded border-l-4 border-red-400 bg-red-50 p-4">
          <h4 className="font-medium text-red-800">❌ Evite</h4>
          <ul className="mt-2 space-y-1 text-sm text-red-700">
            <li>Elementos interativos sem labels</li>
            <li>Imagens decorativas com alt text</li>
            <li>Mudanças de conteúdo sem anúncios</li>
            <li>Focus trap inexistente em modais</li>
            <li>Cores como única forma de informação</li>
            <li>Textos com baixo contraste</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Padrões e Boas Práticas

**Setup padrão para novos componentes:**

\`\`\`tsx
import {
  useAccessibilityValidation,
  useLiveRegion
} from '@/hooks/use-accessibility'

export function NovoComponente() {
  // 1. Validação automática
  useAccessibilityValidation({
    enabled: process.env.NODE_ENV === 'development'
  })

  // 2. Feedback para usuários
  const { announceSuccess, announceError } = useLiveRegion()

  return (
    <div>
      {/* Componente com acessibilidade */}
    </div>
  )
}
\`\`\`

**Para modais e overlays:**

\`\`\`tsx
import { useFocusTrap } from '@/hooks/use-accessibility'

export function ModalComponente({ isOpen, onClose }) {
  const modalRef = useRef(null)
  const { trapFocus } = useFocusTrap()

  useEffect(() => {
    if (isOpen) {
      const cleanup = trapFocus(modalRef.current, {
        escapeDeactivates: true
      })
      return cleanup
    }
  }, [isOpen, trapFocus])

  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {/* Conteúdo do modal */}
    </div>
  )
}
\`\`\`

### Testando Acessibilidade

**Ferramentas recomendadas:**
- **VoiceOver** (macOS): Cmd + F5
- **NVDA** (Windows): Gratuito
- **axe DevTools**: Extensão do navegador
- **Lighthouse**: Auditoria automática
        `,
      },
    },
  },
}

export const ChecklistImplementacao: Story = {
  name: '📋 Checklist de Implementação',
  render: () => (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Checklist WCAG 2.1 AA</h3>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Durante o Desenvolvimento:</h4>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span className="text-sm">useAccessibilityValidation ativo</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span className="text-sm">Navegação por teclado implementada</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span className="text-sm">Aria-labels apropriados</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span className="text-sm">Elementos semânticos corretos</span>
            </label>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Para Interações:</h4>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span className="text-sm">useLiveRegion para feedback</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked />
              <span className="text-sm">Focus management em modais</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span className="text-sm">Testado com leitores de tela</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span className="text-sm">Contraste de cores validado</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Checklist de Implementação

Use este checklist para garantir que seus componentes atendem aos critérios de acessibilidade:

**Critérios WCAG 2.1 AA atendidos:**

- **1.3.1** - Informações e Relações: Estrutura semântica correta
- **2.1.1** - Teclado: Todos os elementos acessíveis via teclado
- **2.4.3** - Ordem do Foco: Sequência lógica de navegação
- **4.1.2** - Nome, Função, Valor: Elementos têm nomes acessíveis
- **4.1.3** - Mensagens de Status: Estados comunicados adequadamente

**Comandos úteis:**

\`\`\`bash
# Executar testes de acessibilidade
npm run check:a11y
\`\`\`

**Antes de fazer merge:**

1. ✅ Validação automática sem erros
2. ✅ Feedback implementado para ações
3. ✅ Focus management em overlays
4. ✅ Testado com tecnologias assistivas
5. ✅ Contraste de cores adequado
        `,
      },
    },
  },
}
