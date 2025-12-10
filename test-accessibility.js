#!/usr/bin/env node

/**
 * Accessibility & Responsiveness Validation Script
 * Testa acessibilidade e responsividade das páginas
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 VALIDAÇÃO DE ACESSIBILIDADE E RESPONSIVIDADE\n')
console.log('='.repeat(60))

// Diretórios a verificar
const pagesToCheck = [
  '/Users/paulaallemand/baixada-vacinada/bv-frontend/src/app/(private)/perguntas-frequentes/page.tsx',
  '/Users/paulaallemand/baixada-vacinada/bv-frontend/src/app/(private)/docs-tutoriais/morador/criar-conta/page.tsx',
  '/Users/paulaallemand/baixada-vacinada/bv-frontend/src/app/(private)/docs-tutoriais/morador/historico-vacinas/page.tsx',
]

const checks = {
  accessibility: {
    ariaLabels: /aria-label=|aria-describedby=|aria-expanded=|role=/g,
    semanticHtml: /(<main>|<section>|<article>|<nav>|<header>|<footer>)/g,
    altText: /alt=/g,
    formLabels: /<label|htmlFor=/g,
  },
  responsiveness: {
    flexbox: /flex|flex-col|flex-row|flex-wrap/g,
    gridClasses: /grid|gap-|space-/g,
    responsiveClasses: /sm:|md:|lg:|xl:/g,
    paddingClasses: /px-|py-|p-|mx-|my-|m-/g,
  },
  styling: {
    tailwindClasses: /className="[^"]*"/g,
    bgWhite: /bg-white/g,
    scrollClasses: /overflow-x-auto|scrollbar-thin/g,
  },
  emoji: {
    emojis: /[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{2600}-\u{27BF}]/gu,
  },
}

let totalIssues = 0

pagesToCheck.forEach((pagePath) => {
  console.log(`\n📄 Analisando: ${path.basename(pagePath)}`)
  console.log('-'.repeat(60))

  if (!fs.existsSync(pagePath)) {
    console.log(`❌ Arquivo não encontrado: ${pagePath}`)
    return
  }

  const content = fs.readFileSync(pagePath, 'utf-8')
  let pageIssues = 0

  // Verificar Acessibilidade
  console.log('\n♿ ACESSIBILIDADE:')

  const ariaMatches = content.match(checks.accessibility.ariaLabels)
  const ariaCount = ariaMatches ? ariaMatches.length : 0
  console.log(`  ✓ ARIA labels/roles: ${ariaCount > 0 ? '✅' : '⚠️'} (${ariaCount} encontrados)`)
  if (ariaCount === 0) pageIssues++

  const semanticMatches = content.match(checks.accessibility.semanticHtml)
  console.log(
    `  ✓ HTML semântico: ${semanticMatches ? '✅' : '⚠️'} (${semanticMatches ? semanticMatches.length : 0} tags)`,
  )

  // Verificar Responsiveness
  console.log('\n📱 RESPONSIVIDADE:')

  const flexboxMatches = content.match(checks.responsiveness.flexbox)
  console.log(
    `  ✓ Flexbox: ${flexboxMatches ? '✅' : '⚠️'} (${flexboxMatches ? flexboxMatches.length : 0} classes)`,
  )
  if (!flexboxMatches) pageIssues++

  const responsiveMatches = content.match(checks.responsiveness.responsiveClasses)
  console.log(
    `  ✓ Breakpoints responsivos: ${responsiveMatches ? '✅' : '⚠️'} (${responsiveMatches ? responsiveMatches.length : 0} classes)`,
  )
  if (!responsiveMatches) pageIssues++

  // Verificar Styling
  console.log('\n🎨 ESTILO:')

  const bgWhiteMatches = content.match(checks.styling.bgWhite)
  console.log(
    `  ✓ Fundos brancos (bg-white): ${bgWhiteMatches ? '✅' : '⚠️'} (${bgWhiteMatches ? bgWhiteMatches.length : 0} encontrados)`,
  )

  const scrollMatches = content.match(checks.styling.scrollClasses)
  console.log(
    `  ✓ Scroll classes: ${scrollMatches ? '✅' : '⚠️'} (${scrollMatches ? scrollMatches.length : 0} encontrados)`,
  )

  // Verificar Emojis
  console.log('\n😊 EMOJIS:')

  const emojiMatches = content.match(checks.emoji.emojis)
  if (emojiMatches && emojiMatches.length > 0) {
    console.log(`  ⚠️ Emojis detectados: ${emojiMatches.length}`)
    const uniqueEmojis = [...new Set(emojiMatches)]
    console.log(`  Emojis únicos: ${uniqueEmojis.join(' ')}`)
    pageIssues++
  } else {
    console.log(`  ✅ Sem emojis desnecessários`)
  }

  console.log(
    `\n📊 Resultado: ${pageIssues === 0 ? '✅ SEM PROBLEMAS' : `⚠️ ${pageIssues} PROBLEMA(S) DETECTADO(S)`}`,
  )
  totalIssues += pageIssues
})

console.log('\n' + '='.repeat(60))
console.log(
  `\n📈 RESUMO FINAL: ${totalIssues === 0 ? '✅ TUDO OK!' : `⚠️ ${totalIssues} PROBLEMA(S) ENCONTRADO(S)`}\n`,
)

// Recomendações
console.log('💡 RECOMENDAÇÕES:')
console.log('  1. Teste em navegador com DevTools modo responsivo')
console.log('  2. Use axe DevTools ou Lighthouse para auditoria completa')
console.log('  3. Teste com screen readers (NVDA, JAWS, VoiceOver)')
console.log('  4. Verifique navegação por teclado (Tab, Enter, Arrows)')
console.log('  5. Teste em dispositivos reais quando possível\n')

process.exit(totalIssues > 0 ? 1 : 0)
