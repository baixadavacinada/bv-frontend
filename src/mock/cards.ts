import { CardData, EducationalMaterial } from '@/types/cards'

export const cardsData: Omit<CardData, 'onClick'>[] = [
  {
    id: 'ubs',
    title: 'Unidade Básica de Saúde',
    description:
      'Encontre a UBS mais próxima e veja quais vacinas estão disponíveis em cada unidade.',
  },
  {
    id: 'vaccine-record',
    title: 'Registro de vacinação',
    description: 'Registre suas vacinas na carteira de vacinação digital.',
  },
  {
    id: 'vaccine-guide',
    title: 'Cartilha de vacinas',
    description: 'Veja aqui quais vacinas tomar em cada idade e o que fazer se perdeu alguma dose.',
  },
  {
    id: 'settings',
    title: 'Configurações',
    description:
      'Precisa ajustar algo? Aqui você pode configurar notificações, atualizar seus dados ou falar com a gente.',
  },
]

export const educationalMaterialsData: Omit<EducationalMaterial, 'onClick'>[] = [
  {
    id: '1',
    title: 'Conteúdo educativo',
    description:
      'Lorem ipsum dolor sit amet consectetur. Enim integer ipsum habitasse vulputate sed non. In eu diam morbi tellus lacus magnis.',
    image: '/placeholder-image.svg',
  },
  {
    id: '2',
    title: 'Conteúdo educativo',
    description:
      'Lorem ipsum dolor sit amet consectetur. Enim integer ipsum habitasse vulputate sed non. In eu diam morbi tellus lacus magnis.',
    image: '/placeholder-image.svg',
  },
  {
    id: '3',
    title: 'Conteúdo educativo',
    description:
      'Lorem ipsum dolor sit amet consectetur. Enim integer ipsum habitasse vulputate sed non. In eu diam morbi tellus lacus magnis.',
    image: '/placeholder-image.svg',
  },
]
