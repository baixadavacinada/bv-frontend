import { SkeletonLoader } from '@/components/ui/skeleton-loader'

interface PageLoadingFallbackProps {
  variant?: 'list' | 'cards' | 'form' | 'detail'
  title?: boolean
}

/**
 * Componente padrão para fallback de loading em páginas
 * Mantém layout consistente enquanto o conteúdo carrega
 */
export function PageLoadingFallback({ variant = 'list', title = true }: PageLoadingFallbackProps) {
  return (
    <div className="w-full space-y-6 px-6 lg:px-8">
      {title && (
        <SkeletonLoader
          count={1}
          height="h-8"
          width="w-64"
          ariaLabel="Carregando título da página"
        />
      )}

      {variant === 'list' && (
        <div className="space-y-4">
          <SkeletonLoader count={1} height="h-12" width="w-full" ariaLabel="Carregando filtros" />
          <div className="space-y-3">
            <SkeletonLoader
              count={5}
              height="h-20"
              width="w-full"
              ariaLabel="Carregando lista de itens"
            />
          </div>
        </div>
      )}

      {variant === 'cards' && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SkeletonLoader
            count={6}
            variant="card"
            containerClassName="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            ariaLabel="Carregando cards de conteúdo"
          />
        </div>
      )}

      {variant === 'form' && (
        <div className="space-y-6">
          <SkeletonLoader
            count={1}
            height="h-10"
            width="w-full"
            ariaLabel="Carregando campo do formulário"
          />
          <SkeletonLoader
            count={1}
            height="h-10"
            width="w-full"
            ariaLabel="Carregando campo do formulário"
          />
          <SkeletonLoader count={1} height="h-10" width="w-2/3" ariaLabel="Carregando botão" />
        </div>
      )}

      {variant === 'detail' && (
        <div className="space-y-6">
          <SkeletonLoader count={1} height="h-64" width="w-full" ariaLabel="Carregando imagem" />
          <div className="space-y-3">
            <SkeletonLoader count={1} height="h-6" width="w-3/4" ariaLabel="Carregando título" />
            <SkeletonLoader
              count={3}
              height="h-4"
              width="w-full"
              ariaLabel="Carregando descrição"
            />
          </div>
        </div>
      )}
    </div>
  )
}
