'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Facebook, Twitter, Linkedin, MessageCircle, Link as LinkIcon, Check } from 'lucide-react'

interface ShareModalProps {
  url: string
  title: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const socialLinks = [
  {
    name: 'Facebook',
    icon: Facebook,
    color: 'bg-blue-600 hover:bg-blue-700',
    shareUrl: (url: string, title: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
  },
  {
    name: 'Twitter',
    icon: Twitter,
    color: 'bg-blue-400 hover:bg-blue-500',
    shareUrl: (url: string, title: string) =>
      `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    color: 'bg-green-500 hover:bg-green-600',
    shareUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'bg-blue-700 hover:bg-blue-800',
    shareUrl: (url: string, title: string) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
]

export function ShareModal({ url, title, isOpen, onOpenChange }: ShareModalProps) {
  const [hasCopied, setHasCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    setHasCopied(true)

    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Compartilhar este conteúdo</DialogTitle>
          <DialogDescription>Escolha uma rede social ou copie o link.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap justify-center gap-4 py-4">
          {socialLinks.map((social) => (
            <Button
              key={social.name}
              asChild
              className={`h-12 w-12 rounded-full p-0 text-white transition-transform hover:scale-110 ${social.color}`}
            >
              <a
                href={social.shareUrl(url, title)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Compartilhar no ${social.name}`}
              >
                <social.icon size={24} />
              </a>
            </Button>
          ))}

          <Button
            className="h-12 w-12 rounded-full bg-gray-500 p-0 text-white transition-transform hover:scale-110 hover:bg-gray-600"
            onClick={copyToClipboard}
            aria-label="Copiar link"
          >
            {hasCopied ? <Check size={24} /> : <LinkIcon size={24} />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
