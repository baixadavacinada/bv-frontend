# Skeleton Loaders & Loading States

## 📋 Implementação Completa

Este documento descreve a implementação de skeleton loaders com suporte a acessibilidade em todas as páginas da aplicação.

## 🎯 O que foi implementado

### 1. **Componente `SkeletonLoader`** 
Localização: `/src/components/ui/skeleton-loader.tsx`

Component reutilizável com suporte a múltiplas variantes:

```tsx
import { SkeletonLoader } from '@/components/ui/skeleton-loader'

// Skeleton de linhas (padrão)
<SkeletonLoader count={3} />

// Skeleton de cards
<SkeletonLoader count={4} variant="card" />

// Skeleton de avatar
<SkeletonLoader count={1} variant="avatar" />

// Customizado
<SkeletonLoader 
  count={5} 
  height="h-10" 
  width="w-full"
  variant="custom"
/>
```

**Props disponíveis:**
- `count` - Número de skeletons a renderizar (default: 3)
- `variant` - Tipo de skeleton: 'line' | 'card' | 'avatar' | 'custom'
- `height` - Altura (Tailwind) - default: 'h-20'
- `width` - Largura (Tailwind) - default: 'w-full'
- `containerClassName` - Classes customizadas para o container
- `itemClassName` - Classes customizadas para cada item
- `ariaLabel` - Rótulo para acessibilidade (default: 'Carregando conteúdo')

### 2. **Componente `PageLoadingFallback`**
Localização: `/src/components/layout/PageLoadingFallback.tsx`

Componente padrão para fallbacks de loading em páginas com diferentes variantes:

```tsx
import { PageLoadingFallback } from '@/components/layout/PageLoadingFallback'

// Para listas
<PageLoadingFallback variant="list" title={true} />

// Para cards
<PageLoadingFallback variant="cards" title={true} />

// Para formulários
<PageLoadingFallback variant="form" title={true} />

// Para páginas de detalhe
<PageLoadingFallback variant="detail" title={true} />
```

### 3. **Loading files (`loading.tsx`)**

Criados para todas as rotas públicas e privadas:

**Páginas Públicas:**
- `/ubs/loading.tsx` - Lista de UBS
- `/busca/loading.tsx` - Busca
- `/vacinacao/loading.tsx` - Detalhes de vacinação
- `/cartilha-vacinas/loading.tsx` - Cards de vacinas
- `/notificacoes/loading.tsx` - Lista de notificações
- `/registro-usuario/loading.tsx` - Formulário
- `/login/loading.tsx` - Formulário de login

**Páginas Privadas:**
- `/gestao-ubs/loading.tsx` - Lista
- `/gestao-usuarios/loading.tsx` - Lista
- `/gestao-vacinas/loading.tsx` - Lista
- `/materiais-educativos/loading.tsx` - Cards
- `/favoritos/loading.tsx` - Lista
- `/configuracoes/loading.tsx` - Formulário
- `/ajustes-alertas/loading.tsx` - Formulário
- `/avaliacao/loading.tsx` - Formulário

## ♿ Acessibilidade

Todos os skeletons incluem:
- `role="status"` - Comunica que é conteúdo dinâmico
- `aria-busy="true"` - Indica carregamento em progresso
- `aria-label` - Rótulo descritivo para leitores de tela

```tsx
<div
  role="status"
  aria-busy="true"
  aria-label="Carregando unidades básicas de saúde"
>
  {/* skeleton content */}
</div>
```

## 🚀 Performance

- ✅ **Zero impacto no bundle** - Apenas CSS animação nativa
- ✅ **Melhor CLS (Core Web Vitals)** - Evita "jumps" de layout
- ✅ **Melhor UX em redes móveis** - Feedback visual imediato
- ✅ **Dark mode support** - `dark:bg-gray-700` automático

## 📝 Como Usar

### Em uma página existente

```tsx
'use client'
import { SkeletonLoader } from '@/components/ui/skeleton-loader'

export default function Page() {
  const { data, isLoading } = useMyHook()

  if (isLoading) {
    return <SkeletonLoader count={5} variant="card" />
  }

  return <div>{/* content */}</div>
}
```

### Criar um novo loading.tsx

```tsx
import { PageLoadingFallback } from '@/components/layout/PageLoadingFallback'

export default function MyPageLoading() {
  return <PageLoadingFallback variant="list" title={true} />
}
```

## 🔧 Customização

### Cores
Modificar em `/src/components/ui/skeleton-loader.tsx`:

```tsx
const baseClasses = 'animate-pulse rounded-md bg-gray-300 dark:bg-gray-700'
```

### Animação
A animação `animate-pulse` é nativa do Tailwind. Para customizar:

```tsx
// No tailwind.config.ts
animation: {
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;'
}
```

## 📊 Páginas Atualizadas

Além dos `loading.tsx`, também foram atualizadas as páginas que retornavam `null` no estado de loading:

- ✅ `/app/(public)/ubs/page.tsx`
- ✅ `/app/(public)/ubs/[id]/page.tsx`
- ✅ `/app/(private)/gestao-ubs/form-ubs/[id]/page.tsx`
- ✅ `/app/(private)/gestao-ubs/[id]/page.tsx`

## 🎨 Exemplos Visuais

### Card Loading
```
┌─────────────────┐
│░░░░░░░░░░░░░░░░│  <- Skeleton
├─────────────────┤
│░░░░░░░░░░░░░░░░│  <- Título
│░░░░░░░░░░░░░░░░│  <- Descrição
└─────────────────┘
```

### List Loading
```
┌──────────────────────┐
│░░░░░░░░░░░░░░░░░░░░│
├──────────────────────┤
│░░░░░░░░░░░░░░░░░░░░│
├──────────────────────┤
│░░░░░░░░░░░░░░░░░░░░│
└──────────────────────┘
```

## 🧪 Testes de Acessibilidade

Para testar a acessibilidade:

1. Usar leitor de tela (NVDA, JAWS, VoiceOver)
2. Verificar que "Carregando..." é anunciado
3. Validar com axe DevTools
4. Testar em dispositivos móveis com redes lentas

## 📚 Referências

- [ARIA Live Regions](https://www.w3.org/WAI/ARIA/apg/patterns/liveregion/)
- [Loading States Best Practices](https://www.nngroup.com/articles/loading-time/)
- [Tailwind CSS Animation](https://tailwindcss.com/docs/animation)
- [Next.js Loading UI](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

## ⚡ Próximas Melhorias

- [ ] Adicionar skeleton loaders para componentes dentro de páginas
- [ ] Implementar progressive hydration
- [ ] Adicionar fallback images com skeleton
- [ ] Investigar React 19 Suspense boundaries
