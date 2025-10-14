import { create } from 'storybook/theming'

export default create({
  base: 'light',
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  brandTitle: 'DS Baixada Vacinada',
  brandUrl: 'https://example.com',
  brandImage: 'https://storybook.js.org/images/placeholders/350x150.png',
  brandTarget: '_self',

  colorSecondary: '#7D4CDB',

  appBg: '#F8F8F8',
  appBorderColor: '#EDEDED',
  appBorderRadius: 6,

  barTextColor: '#999999',
  barSelectedColor: '#7D4CDB',
  barBg: '#F2F2F2',

  inputBg: 'white',
  inputBorder: 'rgba(0,0,0,.1)',
  inputTextColor: '#333333',
  inputBorderRadius: 4,
})
