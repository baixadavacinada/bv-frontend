import { cn } from '@/lib/utils'
import { Hospital, Home, Compass, ArrowRight, X, Edit, Heart } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { BvShareMenu } from './BvShareMenu'
import { useAuth } from '@/hooks/use-firebase-auth'

export interface UbsCardProps {
  id?: number
  slug?: string | undefined
  name: string
  neighborhood: string
  distanceInKm: number
  isFavorite?: boolean
  component: 'private' | 'public'
  onDelete?: () => void
  onMoreInfo: () => void
  onEdit?: () => void
  onFavoriteToggle?: () => void
  onShare?: () => void
  className?: string
}

export function BvUbsCard({
  name,
  neighborhood,
  distanceInKm,
  component,
  slug,
  onMoreInfo,
  onDelete,
  onEdit,
  onFavoriteToggle,
  isFavorite,
  className,
}: UbsCardProps) {
  const { user } = useAuth()
  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>, action?: () => void) => {
    e.stopPropagation()
    action?.()
  }

  return (
    <Card
      className={cn(
        'flex flex-col justify-between rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-slate-900',
        className,
      )}
    >
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
        <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
          <Hospital className="h-6 w-6 text-slate-600 dark:text-slate-300" />
        </div>
        <CardTitle className="pr-1 text-xl font-bold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          <span>{neighborhood}</span>
        </div>
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4" />
          <span>Distância {distanceInKm.toFixed(1)} km</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4">
        <Button
          variant="ghost"
          onClick={onMoreInfo}
          className="text-primary hover:text-primary/80 h-auto p-2"
        >
          Mais informações
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          {component === 'public' && user && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => handleIconClick(e, onFavoriteToggle)}
              aria-label={isFavorite ? 'Remover de favoritos' : 'Adicionar aos favoritos'}
            >
              <Heart
                className={cn(
                  'h-6 w-6 transition-colors',
                  isFavorite ? 'fill-red-600 text-red-600' : 'text-slate-400',
                )}
              />
            </Button>
          )}
          {slug && (
            <BvShareMenu
              ubsName={name}
              ubsSlug={slug}
              neighborhood={neighborhood}
              distanceInKm={distanceInKm}
            />
          )}
          {component === 'private' ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleIconClick(e, onEdit)}
                aria-label="Editar"
              >
                <Edit />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleIconClick(e, onDelete)}
                aria-label={`Excluir ${name}`}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : null}
        </div>
      </CardFooter>
    </Card>
  )
}
