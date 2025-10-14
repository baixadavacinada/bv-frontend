// jest.config.js

module.exports = {
  // Esta linha é a mais importante para resolver o SyntaxError
  preset: 'ts-jest',

  // Define o ambiente de teste como um navegador (essencial para React)
  testEnvironment: 'jsdom',

  // Aponta para o seu arquivo de setup para carregar o 'jest-dom'
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Ajuda o Jest a resolver imports com alias (ex: '@/components')
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
