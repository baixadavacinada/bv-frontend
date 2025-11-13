'use client'

import React, { useState, useEffect } from 'react'
import { Link as LinkIcon, Check, Share2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useAccessibilityValidation } from '@/hooks/use-accessibility'

interface BvShareMenuProps {
  ubsName: string
  ubsSlug: string
  className?: string
}

// Helper para detectar se está em dispositivo mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detectar mobile no cliente
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    )
    setIsMobile(isMobileDevice)
  }, [])

  return isMobile
}

export function BvShareMenu({ ubsName, ubsSlug, className }: BvShareMenuProps) {
  useAccessibilityValidation({ enabled: true })
  const [isOpen, setIsOpen] = useState(false)
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)
  const isMobile = useIsMobile()

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://baixadavacinada.com'}/ubs/${ubsSlug}`
  const shareText = `Conheça a ${ubsName} na Baixada Vacinada`

  const shareOptions = [
    {
      id: 'link',
      label: 'Copiar link',
      icon: LinkIcon,
      iconColor: 'text-slate-600',
      action: async () => {
        try {
          await navigator.clipboard.writeText(shareUrl)
          setCopiedToClipboard(true)
          toast.success('Link copiado com sucesso!', {
            style: {
              background: '#22c55e',
              color: '#ffffff',
              border: 'none',
            },
          })
          setTimeout(() => setCopiedToClipboard(false), 2000)
          setIsOpen(false)
        } catch (err) {
          console.error('Falha ao copiar:', err)
          toast.error('Falha ao copiar o link')
        }
      },
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: () => (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.52 3.449C18.905 1.366 16.446 0 13.861 0c-4.441 0-8.067 3.592-8.067 8.015 0 1.414.346 2.786 1.007 4.04L3.86 23.687l4.332-1.355c1.2.572 2.549.938 3.97.938 4.44 0 8.064-3.592 8.064-8.015 0-2.148-.738-4.168-2.176-5.808zM13.861 15.606c-1.33 0-2.617-.648-3.434-1.74-.533-.744-.89-1.636-.89-2.606 0-2.289 1.861-4.15 4.154-4.15 1.114 0 2.158.455 2.943 1.278.784.823 1.154 1.9 1.154 3.002 0 2.289-1.860 4.15-4.154 4.15-.527 0-1.036-.1-1.514-.301zm3.77-9.52c-.788-.77-1.802-1.186-2.909-1.186-2.385 0-4.322 1.922-4.322 4.282 0 .954.329 1.844.93 2.583.601.739 1.42 1.268 2.324 1.456l.655.128.623-.2c.437-.14.851-.331 1.228-.56.377-.23.722-.5 1.028-.806.307-.307.575-.65.798-1.025.224-.376.395-.783.508-1.206.112-.424.168-.863.168-1.31 0-1.097-.432-2.127-1.219-2.896z" />
        </svg>
      ),
      iconColor: 'text-green-500',
      action: () => {
        const message = encodeURIComponent(`${shareText}\n\n${shareUrl}`)
        const whatsappUrl = isMobile
          ? `whatsapp://send?text=${message}`
          : `https://wa.me/?text=${message}`
        window.open(
          whatsappUrl,
          isMobile ? '_self' : '_blank',
          isMobile ? undefined : 'noopener,noreferrer',
        )
        setIsOpen(false)
      },
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: () => (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.88 1.44 1.44 0 010 2.88z" />
        </svg>
      ),
      iconColor: 'text-pink-500',
      action: () => {
        const instagramUrl = isMobile
          ? `instagram://share?url=${encodeURIComponent(shareUrl)}`
          : `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`
        window.open(
          instagramUrl,
          isMobile ? '_self' : '_blank',
          isMobile ? undefined : 'noopener,noreferrer',
        )
        toast.info('Cole o link no seu story ou post')
        setIsOpen(false)
      },
    },
    {
      id: 'facebook',
      label: 'Facebook',
      icon: () => (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      iconColor: 'text-blue-600',
      action: () => {
        const facebookUrl = isMobile
          ? `fb://share?quote=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
          : `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
        window.open(
          facebookUrl,
          isMobile ? '_self' : '_blank',
          isMobile ? undefined : 'noopener,noreferrer',
        )
        setIsOpen(false)
      },
    },
  ]

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={className}
          aria-label="Compartilhar"
          title="Compartilhar UBS"
        >
          <Share2 className="h-5 w-5 text-slate-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        <div className="space-y-1">
          {shareOptions.map((option) => {
            const Icon =
              typeof option.icon === 'function'
                ? null
                : (option.icon as React.ComponentType<{ className?: string }>)
            const IconComponent =
              typeof option.icon === 'function'
                ? (option.icon as React.ComponentType<Record<string, unknown>>)
                : null
            return (
              <button
                key={option.id}
                onClick={option.action}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  option.id === 'link'
                    ? 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900',
                )}
              >
                {copiedToClipboard && option.id === 'link' ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    {Icon && <Icon className={cn('h-4 w-4', option.iconColor)} />}
                    {IconComponent && (
                      <div className={option.iconColor}>
                        <IconComponent />
                      </div>
                    )}
                    <span>{option.label}</span>
                  </>
                )}
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
