'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { BvButton, BvTitleHeader } from '@/components'
import { PlusIcon, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DeleteModal } from '@/components/common/DeleteModal'
import { toast } from 'sonner'

interface EducationalContent {
  id: string
  title: string
  description: string
  imageUrl?: string
}

const MOCK_DATA: EducationalContent[] = [
  {
    id: '1',
    title: 'Conteúdo educativo',
    description:
      'Lorem ipsum dolor sit amet consectetur. Enim integer ipsum habitasse vulputate sed non. In eu diam morbi tellus lacus magnis.',
  },
  {
    id: '2',
    title: 'Conteúdo educativo',
    description:
      'Lorem ipsum dolor sit amet consectetur. Enim integer ipsum habitasse vulputate sed non. In eu diam morbi tellus lacus magnis.',
  },
  {
    id: '3',
    title: 'Conteúdo educativo',
    description:
      'Lorem ipsum dolor sit amet consectetur. Enim integer ipsum habitasse vulputate sed non. In eu diam morbi tellus lacus magnis.',
  },
  {
    id: '4',
    title: 'Conteúdo educativo',
    description:
      'Lorem ipsum dolor sit amet consectetur. Enim integer ipsum habitasse vulputate sed non. In eu diam morbi tellus lacus magnis.',
  },
]

interface ContentCardProps {
  content: EducationalContent
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onEdit, onDelete }) => {
  return (
    <Card className="relative rounded-sm bg-white shadow-sm transition-shadow hover:shadow-md">
      <BvButton
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 h-6 w-6 rounded-full hover:bg-gray-100"
        onClick={() => onDelete(content.id)}
        aria-label="Excluir conteúdo"
        leftIcon={<X className="size-4" />}
      />

      <CardHeader className="pb-4">
        <CardTitle className="pr-8 text-xl font-bold">{content.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-base leading-relaxed">
          {content.description}
        </CardDescription>

        <div className="flex h-32 items-center justify-center rounded-sm bg-[#F7F7F7]">
          <Image src="/placeholder-image.svg" alt={content.title} width={48} height={48} priority />
        </div>

        <BvButton onClick={() => onEdit(content.id)} title="Editar" className="w-full" />
      </CardContent>
    </Card>
  )
}

export default function EducationalMaterialsPage() {
  const router = useRouter()
  const [contents, setContents] = useState<EducationalContent[]>(MOCK_DATA)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedContentId, setSelectedContentId] = useState<EducationalContent | null>(null)

  const handleAddEducationalContent = () => {
    router.push('/materiais-educativos/formulario')
  }

  const handleEdit = (id: string) => {
    router.push(`/materiais-educativos/formulario?id=${id}`)
  }

  const handleConfirmDelete = () => {
    if (selectedContentId) {
      setContents(contents.filter((content) => content.id !== selectedContentId.id))
      setSelectedContentId(null)
      setIsDeleteModalOpen(false)
      toast.success('Material educativo removido com sucesso')
    } else {
      toast.error('Erro ao remover material educativo')
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl pb-4 lg:mx-0 lg:ml-0 lg:max-w-4xl">
        <BvTitleHeader title="Materiais educativos" className="mb-8" />

        <div className="space-y-8">
          <p className="text-base font-normal">
            Aqui você pode editar o conteúdo da cartilha de vacinação. Também pode atualizar,
            inserir e remover conteúdos educativos que ficarão disponíveis para os usuários de
            perfil morador.
          </p>

          <BvButton
            title="Adicionar conteúdo"
            className="mt-8 w-full lg:w-min"
            onClick={handleAddEducationalContent}
            rightIcon={<PlusIcon />}
          />

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contents.map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                onEdit={handleEdit}
                onDelete={(id) => {
                  setSelectedContentId(contents.find((content) => content.id === id) || null)
                  setIsDeleteModalOpen(true)
                }}
              />
            ))}
          </div>

          {contents.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-500">Nenhum material educativo disponível.</p>
            </div>
          )}
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={
          selectedContentId ? `"${selectedContentId.title}"` : 'o material educativo selecionado'
        }
      />
    </div>
  )
}
