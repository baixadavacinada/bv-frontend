export const dynamic = 'force-dynamic'

export default function AvaliarLayout({ children }: { children: React.ReactNode }) {
  // Página de avaliação é acessível a todos (public, agent, admin)
  return children
}
