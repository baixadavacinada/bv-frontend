import type { Preview } from '@storybook/nextjs'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
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
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      element: '#storybook-root',
      config: {
        rules: {
          'color-contrast': { enabled: true },
          'image-alt': { enabled: true },
          label: { enabled: true },
          'heading-order': { enabled: true },
        },
      },
      disable: false,
    },
    nextjs: {
      appDirectory: true,
    },
  },
}

export default preview
