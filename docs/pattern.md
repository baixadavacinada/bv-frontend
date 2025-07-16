## 🧩 Visão Geral

**Objetivo:** Criar uma plataforma acessível, escalável e performática para [informar a população sobre vacinas e unidades de saúde], garantindo acesso inclusivo, com painel administrativo e funcionalidades públicas otimizadas.

**Público-alvo:** População geral, agentes de saúde, Criola

## 🚀 Escolha da Stack Principal

| Tecnologia | Justificativa |
| --- | --- |
| **Next.js** | Framework React full-stack, ideal para renderização híbrida (SSR + SSG), SEO-friendly, performance otimizada e estrutura escalável |
| **TypeScript** | Tipagem segura e manutenção escalável do código |
| **TailwindCSS** | Design system rápido, responsivo e acessível |
| **MongoDB Atlas** | Banco de dados flexível, escalável, ideal para dados não estruturados como feedbacks, vacinas, coordenadas |
| **NextAuth.js / Clerk** | Autenticação plugável com suporte a roles e sessões seguras |
| **Google Maps API / Geolocation API** | Para localização de UBS |
| **Twilio / Z-API** | Integração com WhatsApp para notificações com consentimento |
| **Axe-core / Lighthouse** | Ferramentas de verificação de acessibilidade (WCAG 2.1 AA) |

## Arquitetura de Aplicação

### 🔀 Renderização Híbrida

| Página | Estratégia de Renderização | Justificativa |
| --- | --- | --- |
| Página pública de UBS e vacinas | **SSG + ISR** | Conteúdo cacheável, atualizado periodicamente sem backend complexo |
| Painel administrativo (CRUD) | **SSR ou CSR com middleware** | Autenticação protegida e dinâmica |
| Feedback de atendimento | **SSG** | Baixa frequência de alteração, fácil exportação |
| Registro de vacina (manual) | **CSR + localStorage/MongoDB** | Controle pessoal, offline-first |
| Geolocalização de UBS | **CSR com fallback textual** | Depende de geolocalização do navegador |


## ⚙️ Ferramentas Padrão do Projeto

- Jest
- cypress
- commit - https://www.conventionalcommits.org/pt-br/v1.0.0-beta.4/
- branch - ex: feat - id do card

## 🔐 Autenticação & Segurança

- Middleware de autenticação para rotas protegidas (`/admin`)
- Captura de consentimento no onboarding
- Armazenamento seguro de sessões
- Rate limit e proteção para formulários públicos


## ♿ Acessibilidade & Inclusão

- Padrão **WCAG 2.1 AA**
- Navegação por teclado
- Alto contraste (design tokens com Tailwind)
- Uso de `aria-labels`, `role`, `focus`, leitura por leitores de tela
- Testes com usuários reais + ferramentas automatizadas (Lighthouse, axe)


## 📈 Métricas de Sucesso

| Funcionalidade | Métricas principais |
| --- | --- |
| Vacinas por UBS | Tempo médio na tela, nº de acessos |
| Feedback | NPS médio, nº de feedbacks enviados |
| WhatsApp | Nº de opt-ins, taxa de entrega |
| Geolocalização | Cliques no mapa, uso do GPS |
| Registro manual | Nº de registros criados, retorno ao app |
| Acessibilidade | Nº de erros WCAG, testes com usuários reais |
- Coletar feedback e consolidar relatório com:
    1. Sugestões de melhoria
    2. Potenciais evoluções para Fase 2
    3. Métricas de impacto (uso real da plataforma)