'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BvButton, BvTitleHeader } from '@/components'
import { PlusIcon, X, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DeleteModal } from '@/components/common/DeleteModal'
import { toast } from 'sonner'

interface EducationalContent {
  id: string
  title: string
  description: string
  imageUrl?: string
  downloadUrl?: string
}

const MOCK_DATA: EducationalContent[] = [
  {
    id: '1',
    title: 'Unidades de Saúde de Japeri',
    description: 'Conheça as unidades de saúde disponíveis em Japeri e seus respectivos serviços.',
    downloadUrl: 'https://www.japeri.rj.gov.br/service/unidades-saude/',
  },
  {
    id: '2',
    title: 'Política Nacional de Saúde Integral da População',
    description:
      'Política que orienta as ações de saúde pública no país, assegurando acesso igualitário e integral.',
    downloadUrl:
      'https://drive.google.com/file/d/1sWYYr9MK0Ncrnb8m91c4u3Xo8XULPFhK/view?usp=sharing',
  },
  {
    id: '3',
    title: 'Justiça Reprodutiva',
    description:
      'Documento que aborda os direitos reprodutivos e a importância da autonomia na saúde reprodutiva.',
    downloadUrl:
      'https://drive.google.com/file/d/1BuyopBD93fAn41bZLGixKShiE_D0Un8_/view?usp=drive_link',
  },
  {
    id: '4',
    title: 'Carta dos Direitos dos Usuários da Saúde',
    description:
      'Carta que estabelece os direitos fundamentais de todos os usuários dos serviços de saúde.',
    downloadUrl:
      'https://drive.google.com/file/d/1-VEuodHRUpGAi_p6VxjHpv-0B6n8zWLv/view?usp=sharing',
  },
  {
    id: '5',
    title: 'Calendário Técnico de Vacinação - Idoso',
    description: 'Calendário de vacinação recomendado para a população idosa.',
    downloadUrl:
      'https://drive.google.com/file/d/1ANuXNfmuuZN-Cu6WH7_mu7RATHgo8r6H/view?usp=sharing',
  },
  {
    id: '6',
    title: 'Calendário Técnico de Vacinação - Gestante',
    description: 'Calendário de vacinação recomendado durante a gestação.',
    downloadUrl:
      'https://drive.google.com/file/d/1VHZCql1FC0b5SslNPBw8j8R_kpv0zdX7/view?usp=sharing',
  },
  {
    id: '7',
    title: 'Calendário Técnico de Vacinação - Criança',
    description: 'Calendário completo de vacinação para crianças de 0 a 12 anos.',
    downloadUrl:
      'https://drive.google.com/file/d/1yJ-fW1WV7EalG4XzPP-snHvzLmDIVHyH/view?usp=sharing',
  },
  {
    id: '8',
    title: 'Calendário Técnico de Vacinação - Adulto',
    description: 'Calendário de vacinação recomendado para adultos.',
    downloadUrl:
      'https://drive.google.com/file/d/1tgqmoRoa9Yp3EQLmU-1i-nmuwwIXe3cY/view?usp=sharing',
  },
  {
    id: '9',
    title: 'Calendário Técnico de Vacinação - Adolescentes e Jovens',
    description: 'Calendário de vacinação recomendado para adolescentes e jovens.',
    downloadUrl:
      'https://drive.google.com/file/d/1j5UuzXquXgeZEHJL6dn_ha1Ii6hSGzAA/view?usp=sharing',
  },
]

interface ContentCardProps {
  content: EducationalContent
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onEdit, onDelete }) => {
  return (
    <Card className="relative flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-sm transition-shadow hover:shadow-md">
      <BvButton
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 h-6 w-6 rounded-full hover:bg-gray-100"
        onClick={() => onDelete(content.id)}
        aria-label="Excluir conteúdo"
        leftIcon={<X className="size-4" />}
      />

      <CardHeader className="flex-shrink-0 pb-2">
        <CardTitle className="line-clamp-2 pr-8 text-lg font-bold">{content.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col space-y-3 overflow-hidden pb-4">
        <CardDescription className="line-clamp-3 flex-shrink-0 text-sm leading-relaxed">
          {content.description}
        </CardDescription>

        {/* Imagem do card comentada - mantém cards com tamanho uniforme */}
        {/* <div className="flex flex-1 items-center justify-center rounded-sm bg-[#F7F7F7] min-h-16">
          <Image src="/placeholder-image.svg" alt={content.title} width={48} height={48} priority />
        </div> */}

        <div className="mt-auto flex flex-shrink-0 flex-col gap-2">
          <BvButton onClick={() => onEdit(content.id)} title="Editar" className="w-full text-sm" />
          {content.downloadUrl && (
            <BvButton
              onClick={() => window.open(content.downloadUrl, '_blank')}
              title="Download"
              variant="outline"
              className="w-full text-sm"
              rightIcon={<Download className="size-4" />}
            />
          )}
        </div>
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
