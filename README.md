# Baixada Vacinada - Frontend

Aplicação web responsiva para gerenciamento e registro de campanhas de vacinação na região da Baixada Santista. Desenvolvida com Next.js 15, React 19 e tecnologias modernas de UI/UX.

## Visão Geral

O Baixada Vacinada Frontend é uma plataforma digital que conecta cidadãos aos programas de vacinação local, permitindo consultas de unidades de saúde, registro de vacinações, acesso a materiais educativos e comunicação bidirecional sobre campanhas públicas.

A aplicação prioriza acessibilidade (WCAG 2.1 AA), performance (Core Web Vitals) e experiência do usuário, servindo população diversa com diferentes níveis de literacia digital.

## Requisitos do Sistema

- Node.js 20.x ou superior
- npm 10.x ou yarn 9.x
- Modern browser (Chrome, Firefox, Safari, Edge - versões recentes)
- Conexão com API backend (veja configuração abaixo)

## Instalação

### Clonar Repositório

```bash
git clone https://github.com/baixadavacinada/baixada-vacinada.git
cd baixada-vacinada/bv-frontend
```

### Instalar Dependências

```bash
npm install
```

Se usar yarn:
```bash
yarn install
```

### Configuração de Ambiente

Crie arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

Um exemplo de arquivo `.env.example` está incluído no repositório. Solicite as credenciais reais ao líder do projeto.

### Desenvolvimento Local

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

O servidor recarrega automaticamente quando você modifica arquivos `.tsx` ou `.ts`.

### Build para Produção

Compile a aplicação para produção:

```bash
npm run build
npm run start
```

Ou use modo preview:

```bash
npm run build
npm run start
```

## Scripts Disponíveis

### npm run dev
Inicia servidor Next.js em modo desenvolvimento com hot reload.

**Saída esperada:** "compiled client and server successfully"

### npm run build
Compila aplicação para produção com otimizações.

**Output:** Gera pasta `.next/` com artifacts compilados.

### npm run start
Inicia servidor em modo produção (requer build prévio).

**Nota:** Use após `npm run build`.

### npm run lint
Executa ESLint para verificar qualidade de código.

```bash
npm run lint
```

Corrige automaticamente:
```bash
npm run lint -- --fix
```

### npm run typecheck
Verifica tipos TypeScript sem emitir código.

```bash
npm run typecheck
```

### npm run test
Executa testes unitários com Jest.

```bash
npm run test
npm run test:watch
npm run test:coverage
```

### npm run storybook
Inicia Storybook para desenvolvimento de componentes isoladamente.

```bash
npm run storybook
# Abre em http://localhost:6006
```

Gera build estático:
```bash
npm run build-storybook
```

### npm run check:a11y
Valida acessibilidade (WCAG 2.1) em componentes e rotas cliente.

Executado automaticamente em pre-commit via Husky.

### npm run lint:a11y
Executa Axe Core contra aplicação rodando localmente.

```bash
npm run build && npm run lint:a11y
```

## Estrutura de Diretórios

```
src/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Rotas públicas
│   │   ├── ubs/[slug]/page.tsx   # Detalhe de unidade de saúde
│   │   ├── vacinacao/page.tsx    # Registro de vacinação
│   │   └── materiais-educativos/ # Conteúdo educativo
│   ├── (private)/                # Rotas autenticadas
│   │   ├── dashboard/page.tsx    # Painel pessoal
│   │   ├── gestao-usuarios/      # Admin: gerenciar usuários
│   │   └── notificacoes/page.tsx # Histórico de notificações
│   ├── layout.tsx                # Root layout
│   ├── error.tsx                 # Error boundary
│   ├── not-found.tsx             # 404 page
│   └── globals.css               # Estilos globais
├── components/
│   ├── auth/                     # Componentes de autenticação
│   ├── common/                   # Componentes reutilizáveis
│   ├── design/                   # Componentes UI customizados
│   ├── layout/                   # Componentes de layout
│   ├── admin/                    # Componentes admin
│   └── ui/                       # Componentes shadcn/ui (base)
├── hooks/                        # Hooks customizados
│   ├── use-accessibility.ts      # Validação de acessibilidade
│   ├── use-auth.ts               # Autenticação
│   ├── use-translations.ts       # Internacionalização
│   └── use-permissions.ts        # Controle de permissões
├── services/                     # Serviços de negócio
│   ├── api/                      # Requisições HTTP
│   ├── cache-service.ts          # Cache com TTL
│   └── vaccination-service.ts    # Lógica de vacinação
├── utils/                        # Utilidades gerais
│   ├── accessibility.tsx         # Utilitários de a11y
│   ├── errorLogger.ts            # Logging de erros
│   └── validators.ts             # Validação de dados
├── types/                        # Definições TypeScript
├── schemas/                      # Validação com Zod
├── contexts/                     # React Contexts
├── lib/                          # Configurações e helpers
├── i18n/                         # Mensagens traduzidas
├── messages/                     # Textos em português/inglês
└── middleware.ts                 # Middleware Next.js
```

## Tecnologias e Dependências Principais

### Framework
- **Next.js 15.5**: App Router, SSR, otimizações automáticas
- **React 19**: Hooks, Suspense, Server Components

### State Management & Forms
- **React Hook Form 7**: Gerenciamento eficiente de formulários
- **Zod 4**: Validação de schemas TypeScript-first

### Autenticação
- **Firebase 12**: Autenticação, Realtime Database
- **JWT**: Tokens seguros para API

### UI & Styling
- **Tailwind CSS 4**: Utility-first CSS
- **Shadcn/UI**: Componentes acessíveis e customizáveis
- **Lucide React**: Ícones modernos e acessíveis
- **Sonner**: Notificações toast (replacer de toastr)

### Acessibilidade
- **Axe-Core 4**: Detecção automática de problemas
- **ARIA**: Atributos semânticos
- **Next-intl**: Suporte a múltiplos idiomas

### Testes e QA
- **Jest 30**: Testes unitários
- **Vitest 3**: Testes alternativos (compatible com Vite)
- **React Testing Library 16**: Testes de componentes
- **Storybook 9**: Documentação visual

### Desenvolvimento
- **TypeScript 5**: Type safety
- **ESLint 9**: Linting
- **Prettier 3**: Formatação automática
- **Husky 9**: Git hooks
- **Lint-staged 16**: Validação em pre-commit

## Autenticação e Permissões

### Fluxo de Autenticação

1. Usuário insere email/senha na página de login
2. Firebase valida credenciais
3. Backend gera JWT token com custom claims
4. Cliente armazena token em cookie seguro (HTTPOnly)
5. Requisições subsequentes incluem token
6. Middleware Next.js valida token em cada request

### Roles e Permissões

```typescript
type UserRole = 'public' | 'agent' | 'admin'

public   // Cidadão comum, acesso limitado
agent    // Funcionário da saúde, acesso expandido
admin    // Administrador do sistema
```

### Proteção de Rotas

Rotas privadas (em `app/(private)/`) requerem autenticação. Componentes usam `useAuth()` para verificar permissões:

```typescript
const { user, role, isLoading } = useAuth()

if (role !== 'admin') {
  return <AccessDenied />
}
```

Veja `docs/AUTHENTICATION_INTEGRATION.md` para detalhes.

## Componentes Principais

### Layout (src/components/layout/)

**Sidebar.tsx**: Navegação lateral responsiva com menu adaptativo por role.

**Header.tsx**: Barra superior com busca e ações do usuário.

**Footer.tsx**: Rodapé com informações e links úteis.

### Autenticação (src/components/auth/)

**LoginForm.tsx**: Formulário de login com validação.

**RegisterForm.tsx**: Registro de novo usuário com termos LGPD.

**AccessDenied.tsx**: Página exibida quando usuário não tem permissão.

### Comum (src/components/common/)

**DeleteModal.tsx**: Modal de confirmação para ações destrutivas.

**BvSelect.tsx**: Select customizado com busca e multi-select.

**BvButton.tsx**: Botão com suporte a variantes e estados.

### Design (src/components/design/)

**BvCard.tsx**: Card base com suporte a ações.

**BvCardSecondary.tsx**: Card para materiais educativos com like/share.

**BvTitleHeader.tsx**: Header customizado para páginas.

**LazyUbsMap.tsx**: Mapa de unidades de saúde (lazy loaded).

## Hooks Customizados

### useAuth()
Acesso ao contexto de autenticação.

```typescript
const { user, role, isLoading, logout } = useAuth()
```

Retorna: `{ uid, email, role, customClaims, isLoading }`

### useAccessibilityValidation()
Valida acessibilidade de componentes em desenvolvimento.

```typescript
useAccessibilityValidation({
  enabled: process.env.NODE_ENV === 'development',
  logLevel: 'warn'
})
```

### useLiveRegion()
Anuncia mudanças para leitores de tela.

```typescript
const { announceToScreenReader, announceSuccess, announceError } = useLiveRegion()
announceSuccess('Operação concluída')
```

### useFocusTrap()
Gerencia foco em modais e overlays.

```typescript
const { trapFocus } = useFocusTrap()
useEffect(() => {
  if (isOpen) trapFocus(modalRef.current)
}, [isOpen])
```

### usePermissions()
Verifica se usuário tem ação permitida.

```typescript
const { hasPermission } = usePermissions()
if (hasPermission('criar-material')) {
  return <BotaoAdicionar />
}
```

### useHealthUnits()
Busca unidades de saúde com cache.

```typescript
const { units, isLoading, error } = useHealthUnits()
```

Veja `src/hooks/` para lista completa.

## Serviços (Services)

### vaccination-service.ts
Gerencia dados de vacinação e carregamento com cache de 7 dias.

```typescript
const vaccines = await getAvailableVaccines()
const units = await getAvailableHealthUnits()
```

### cache-service.ts
Implementa cache em localStorage com TTL automático.

```typescript
cacheService.setCache('chave', dados, 7 * 24 * 60 * 60 * 1000) // 7 dias
const dados = cacheService.getCache('chave')
```

### api/
Requisições HTTP para backend com tratamento de erros.

```typescript
import { apiClient } from '@/services/api/client'
const response = await apiClient.get('/vaccines')
```

## Formulários e Validação

Todos os formulários usam React Hook Form + Zod para validação:

```typescript
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { vaccinationSchema } from '@/schemas/vaccination-schema'

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(vaccinationSchema)
})
```

Schemas centralizados em `src/schemas/` garantem validação consistente frontend/backend.

## Acessibilidade (WCAG 2.1 AA)

Toda a aplicação segue padrões WCAG 2.1 AA:

- Navegação por teclado completa (Tab, Enter, Escape)
- ARIA labels e aria-describedby em elementos interativos
- Contraste mínimo 4.5:1 em todo o texto
- Imagens com alt text descritivo
- Hierarquia de headings correta (H1 → H2 → H3)
- Focus traps em modais
- Anúncios para leitores de tela via aria-live
- Suporte a zoom até 200% sem quebra de layout

Rotas validadas automaticamente em pre-commit. Veja `ACCESSIBILITY_REPORT.md` para detalhes técnicos.

## Internacionalização (i18n)

Aplicação suporta português (pt-BR) com infraestrutura para adicionar outros idiomas.

Mensagens organizadas em `src/i18n/` e carregadas via `useAppTranslations()`.

```typescript
const { common, navigation } = useAppTranslations()
<span>{common('welcome')}</span>
```

## Performance

### Otimizações Implementadas

- Next.js Image Component com lazy loading automático
- Code splitting por rota
- CSS-in-JS com Tailwind (zero runtime)
- Font optimization com next/font
- Dynamic imports para componentes pesados
- Caching estratégico (7 dias para UBS/vacinas)

### Core Web Vitals

```
LCP (Largest Contentful Paint): < 2.5s ✓
FID (First Input Delay): < 100ms ✓
CLS (Cumulative Layout Shift): < 0.1 ✓
```

Monitorado em produção via vercel-analytics.

## Testes

### Executar Testes

```bash
npm run test              # Executa uma vez
npm run test:watch       # Modo watch
npm run test:coverage    # Gera relatório
```

### Estrutura de Testes

Testes unitários em `tests/unit/`, testes de integração em `tests/integration/`.

Convenção: `ComponenteName.test.tsx` no mesmo diretório do componente.

### Exemplo de Teste

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })
})
```

## Implantação

### Vercel (Recomendado)

1. Conecte repositório GitHub a Vercel
2. Configure variáveis de ambiente
3. Cada push para main dispara build automático

```bash
npm run build  # Verificar localmente antes de push
```

### Docker

Dockerfile incluído para deployments em container:

```bash
docker build -t bv-frontend .
docker run -p 3000:3000 bv-frontend
```

### Variáveis de Produção

Certifique-se de configurar em Vercel Environment Variables:
- `NEXT_PUBLIC_API_URL`: URL da API backend
- Credenciais Firebase (públicas, seguras)
- JWT_SECRET: Secret compartilhado com backend

## Solução de Problemas

### "Build fails with TypeScript error"

```bash
npm run typecheck  # Verificar tipos
npm run build      # Build completo
```

Se erro persistir:
```bash
rm -rf .next node_modules
npm install
npm run build
```

### "Componentes não carregam em SSR"

Verifique se componentes usam `use client` quando necessário (efeitos, browser APIs).

### "Acessibilidade: erro de validação no commit"

```bash
npm run check:a11y  # Vê detalhes do erro
# Adicione useAccessibilityValidation() ao componente
```

### "Cache não expira"

`cache-service.ts` expira automaticamente. Se não funcionar:
```typescript
cacheService.clearAllCache()  // Limpa manual
```

## Contribuindo

1. Crie branch: `git checkout -b feature/sua-feature`
2. Commit com mensagem clara: `git commit -m "Add nova funcionalidade"`
3. Pre-commit hooks (Husky) validam automaticamente
4. Push e abra Pull Request

Validações automáticas executadas:
- ESLint: Qualidade de código
- Prettier: Formatação
- TypeScript: Type checking
- A11y: Acessibilidade (componentes cliente)

## Documentação Adicional

- `docs/AUTHENTICATION_INTEGRATION.md`: Fluxo de autenticação detalhado
- `docs/AUTHENTICATION_FLOW.md`: Diagramas de fluxo
- `ACCESSIBILITY_REPORT.md`: Relatório completo de acessibilidade
- `IMPLEMENTATION_STATUS.md`: Status de features
- Storybook: `npm run storybook` para documentação visual

## Suporte

Para problemas, dúvidas ou sugestões:
1. Abra issue no repositório GitHub
2. Descreva o problema com passos para reproduzir
3. Inclua versão do Node, browser, e OS

## Licença

Projeto licenciado sob MIT. Veja LICENSE para detalhes.

## Versão

- **Frontend**: 0.1.0
- **Node**: 20.x
- **Next.js**: 15.5.2
- **React**: 19.1.0
- **TypeScript**: 5.x
