import { create } from 'storybook/theming'

export default create({
  base: 'light',
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // TODO: Alterar as informações da marca (URL, imagem, etc.)
  brandTitle: 'DS Baixada Vacinada',
  brandUrl: 'https://example.com',
  brandImage: 'https://storybook.js.org/images/placeholders/350x150.png',
  brandTarget: '_self',

  colorPrimary: '#5518C2',
  colorSecondary: '#585C6D',

  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#585C6D',
  appBorderRadius: 4,

  textColor: '#10162F',
  textInverseColor: '#ffffff',

  barTextColor: '#585C6D',
  barSelectedColor: '#5518C2',
  barHoverColor: '#AA8BE0',
  barBg: '#ffffff',

  inputBg: '#ffffff',
  inputBorder: '#10162F',
  inputTextColor: '#10162F',
  inputBorderRadius: 2,
})
