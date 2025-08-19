import type { Preview } from '@storybook/nextjs'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
    // Configurações de Acessibilidade WCAG 2.1 AA
    a11y: {
      // Configuração para usar as regras WCAG 2.1 AA
      config: {
        rules: [
          // Regras de contraste WCAG AA
          {
            id: 'color-contrast',
            options: { level: 'AA' },
          },
          // Verificar textos alternativos em imagens
          {
            id: 'image-alt',
            enabled: true,
          },
          // Verificar labels em formulários
          {
            id: 'label',
            enabled: true,
          },
          // Verificar navegação por teclado
          {
            id: 'keyboard',
            enabled: true,
          },
          // Verificar foco visível
          {
            id: 'focus-order-semantics',
            enabled: true,
          },
          // Verificar estrutura de headings
          {
            id: 'heading-order',
            enabled: true,
          },
          // Verificar landmarks e regiões
          {
            id: 'region',
            enabled: true,
          },
        ],
      },
      // Elementos a serem ignorados na verificação
      element: '#storybook-root',
      // Opções para executar apenas certas regras
      options: {
        checks: { 'color-contrast': { options: { level: 'AA' } } },
        restoreScroll: true,
      },
      // Desabilitar regras que podem conflitar no ambiente de desenvolvimento
      disable: ['autocomplete-valid', 'landmark-one-main'],
      // Manual para permitir verificação manual de alguns aspectos
      manual: true,
    },
  },
}

export default preview
