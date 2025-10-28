import type { Meta, StoryObj } from '@storybook/nextjs'
import { BvButton } from '../components/design/BvButton'
import { Mail, Calendar } from 'lucide-react'

const meta: Meta<typeof BvButton> = {
  title: 'Components/BvButton',
  component: BvButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### Como usar o BvButton

\`\`\`tsx
import { BvButton } from '@/components/design/BvButton'
import { MapPin } from 'lucide-react'

function ExemploBuscarUBS() {
  return (
    <BvButton
      title="Encontrar UBS Próximas"
      leftIcon={<MapPin />}
      onClick={() => console.log('Buscando UBS...')}
      aria-label="Localizar unidades básicas de saúde próximas ao usuário"
    />
  )
}
\`\`\`

### Diretrizes de Design

**✅ Faça:**
- Use títulos claros e objetivos
- Prefira ações no infinitivo ("Buscar", "Enviar", "Salvar")
- Adicione ícones para clarificar a ação
- Use a variante adequada para o contexto
- Implemente estados de loading para ações assíncronas

**❌ Não faça:**
- Textos muito longos (máx. 2-3 palavras)
- Múltiplos botões primários na mesma tela
- Ações destrutivas sem confirmação
- Botões sem indicação visual de estado

### Variantes e Seus Usos

| Variante | Quando usar | Exemplo |
|----------|-------------|---------|
| **default** | Ação principal da tela | "Agendar Vacina", "Buscar UBS" |
| **secondary** | Ações complementares | "Ver Detalhes", "Filtrar" |
| **outline** | Ações neutras/alternativas | "Cancelar", "Voltar" |
| **ghost** | Ações secundárias discretas | "Mais Informações", "Ajuda" |
| **destructive** | Ações que removem/excluem | "Excluir Registro", "Limpar Filtros" |
        `,
      },
    },
  },
  argTypes: {
    title: {
      description: 'Texto exibido no botão. Deve ser claro e objetivo.',
      control: 'text',
    },
    variant: {
      description: 'Estilo visual do botão baseado na importância da ação.',
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      description: 'Tamanho do botão. Use "lg" para ações principais.',
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    leftIcon: {
      description: 'Ícone posicionado à esquerda do texto.',
    },
    rightIcon: {
      description: 'Ícone posicionado à direita do texto.',
    },
    isLoading: {
      description: 'Mostra estado de carregamento com spinner.',
      control: 'boolean',
    },
    disabled: {
      description: 'Desabilita o botão e impede interações.',
      control: 'boolean',
    },
    onClick: {
      description: 'Função executada quando o botão é clicado.',
      action: 'clicked',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ===== EXEMPLOS BÁSICOS =====

export const Default: Story = {
  args: {
    title: 'Botão Padrão',
  },
}

export const Secondary: Story = {
  args: {
    title: 'Botão Secundário',
    variant: 'secondary',
  },
}

export const Outline: Story = {
  args: {
    title: 'Botão Outline',
    variant: 'outline',
  },
}

export const Ghost: Story = {
  args: {
    title: 'Botão Ghost',
    variant: 'ghost',
  },
}

export const Destructive: Story = {
  args: {
    title: 'Excluir',
    variant: 'destructive',
  },
}

// ===== TAMANHOS =====

export const TamanhoGrande: Story = {
  name: '📏 Tamanho Grande',
  args: {
    title: 'Ação Principal',
    size: 'lg',
  },
}

export const TamanhoPequeno: Story = {
  name: '📏 Tamanho Pequeno',
  args: {
    title: 'Filtrar',
    size: 'sm',
    variant: 'outline',
  },
}

// ===== ESTADOS =====

export const Loading: Story = {
  name: '⏳ Estado de Loading',
  args: {
    title: 'Buscando UBS...',
    isLoading: true,
  },
}

export const Disabled: Story = {
  name: '🚫 Estado Desabilitado',
  args: {
    title: 'Indisponível',
    disabled: true,
  },
}

// ===== EXEMPLOS DE USO COM ICONES =====

export const AgendarVacina: Story = {
  name: '💉 Agendar Vacinação - Icone Direita',
  args: {
    title: 'Agendar Vacina',
    rightIcon: <Calendar />,
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Opção de adição do ícone à direita do texto de agendamento para indicar a ação de marcar uma vacina.',
      },
    },
  },
}

export const EnviarEmail: Story = {
  name: '✉️ Enviar Email - Icone Esquerda',
  args: {
    title: 'Enviar por Email',
    leftIcon: <Mail />,
    variant: 'outline',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Opção adição do ícone a esquerda do texto de email para indicar a ação de envio de informações por email.',
      },
    },
  },
}

// ===== EXEMPLOS ESPECÍFICOS DE ACESSIBILIDADE WCAG 2.1 AA =====

export const ComAriaLabel: Story = {
  name: '♿ Botão com Aria-Label',
  args: {
    title: 'Buscar',
    leftIcon: <Mail />,
    'aria-label': 'Buscar unidades básicas de saúde próximas à sua localização',
  },
  parameters: {
    docs: {
      description: {
        story: `**WCAG 2.1 - Critério 4.1.2 (Nome, Função, Valor)**

Botão com aria-label descritivo para usuários de leitores de tela. O aria-label deve explicar claramente a ação que será executada.

\`\`\`tsx
<BvButton
  title="Buscar"
  aria-label="Buscar unidades básicas de saúde próximas à sua localização"
/>
\`\`\`

✅ **Bom para acessibilidade**: Texto descritivo que explica a ação completa`,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'aria-label', enabled: true },
        ],
      },
    },
  },
}

export const ComAriaLive: Story = {
  name: '♿ Estados Dinâmicos - Aria-Live',
  args: {
    title: 'Enviando...',
    isLoading: true,
    'aria-live': 'polite',
    'aria-label': 'Enviando dados para o servidor, aguarde',
  },
  parameters: {
    docs: {
      description: {
        story: `**WCAG 2.1 - Critério 4.1.3 (Mensagens de Status)**

Botão com aria-live para anunciar mudanças de estado para leitores de tela.

\`\`\`tsx
<BvButton
  title="Enviando..."
  isLoading={true}
  aria-live="polite"
  aria-label="Enviando dados para o servidor, aguarde"
/>
\`\`\`

✅ **Bom para acessibilidade**: Usuários são informados sobre mudanças de estado`,
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

export const NavegacaoTeclado: Story = {
  name: '♿ Navegação por Teclado',
  args: {
    title: 'Pressione Tab → Enter/Space',
    'aria-label': 'Testar navegação por teclado - use Tab para focar e Enter ou Space para ativar',
  },
  parameters: {
    docs: {
      description: {
        story: `**WCAG 2.1 - Critério 2.1.1 (Teclado)**

Teste de navegação por teclado. Use Tab para focar no botão e Enter/Space para ativar.

\`\`\`tsx
// Funcionalidade automática - não precisa configurar
<BvButton
  title="Botão"
  aria-label="Descrição acessível"
/>
\`\`\`

✅ **Como testar**:
1. Use Tab para navegar até o botão
2. Pressione Enter ou Space para ativar
3. Verifique se o foco é visível`,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'keyboard', enabled: true },
          { id: 'focus-visible', enabled: true },
        ],
      },
    },
  },
}

export const SomenteIconeAcessivel: Story = {
  name: '♿ Botão Somente Ícone',
  args: {
    leftIcon: <Calendar />,
    'aria-label': 'Abrir calendário para seleção de data',
  },
  parameters: {
    docs: {
      description: {
        story: `**WCAG 2.1 - Critério 1.1.1 (Conteúdo Não-textual)**

Botão sem texto visual precisa de aria-label obrigatório.

\`\`\`tsx
<BvButton
  leftIcon={<Calendar />}
  aria-label="Abrir calendário para seleção de data"
/>
\`\`\`

✅ **Bom para acessibilidade**: Ícone tem descrição textual através do aria-label`,
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
