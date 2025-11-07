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
    title: 'Unidades de Saúde de Japeri',
    description: 'Conheça as unidades de saúde disponíveis em Japeri e seus respectivos serviços.',
    image: '/placeholder-image.svg',
    downloadUrl:
      'https://docs.google.com/document/d/1GI9Djx68F2acEW9vbCfeewGJoffWYP50/edit?usp=sharing&ouid=109375697118600219724&rtpof=true&sd=true',
  },
  {
    id: '2',
    title: 'Política Nacional de Saúde Integral da População',
    description:
      'Política que orienta as ações de saúde pública no país, assegurando acesso igualitário e integral.',
    image: '/placeholder-image.svg',
    downloadUrl:
      'https://drive.google.com/file/d/1sWYYr9MK0Ncrnb8m91c4u3Xo8XULPFhK/view?usp=sharing',
  },
  {
    id: '3',
    title: 'Justiça Reprodutiva',
    description:
      'Documento que aborda os direitos reprodutivos e a importância da autonomia na saúde reprodutiva.',
    image: '/placeholder-image.svg',
    downloadUrl:
      'https://drive.google.com/file/d/1BuyopBD93fAn41bZLGixKShiE_D0Un8_/view?usp=drive_link',
  },
  {
    id: '4',
    title: 'Carta dos Direitos dos Usuários da Saúde',
    description:
      'Carta que estabelece os direitos fundamentais de todos os usuários dos serviços de saúde.',
    image: '/placeholder-image.svg',
    downloadUrl:
      'https://drive.google.com/file/d/1-VEuodHRUpGAi_p6VxjHpv-0B6n8zWLv/view?usp=sharing',
  },
  {
    id: '5',
    title: 'Calendário Técnico de Vacinação - Idoso',
    description: 'Calendário de vacinação recomendado para a população idosa.',
    image: '/placeholder-image.svg',
    downloadUrl:
      'https://drive.google.com/file/d/1ANuXNfmuuZN-Cu6WH7_mu7RATHgo8r6H/view?usp=sharing',
  },
  {
    id: '6',
    title: 'Calendário Técnico de Vacinação - Gestante',
    description: 'Calendário de vacinação recomendado durante a gestação.',
    image: '/placeholder-image.svg',
    downloadUrl:
      'https://drive.google.com/file/d/1VHZCql1FC0b5SslNPBw8j8R_kpv0zdX7/view?usp=sharing',
  },
  {
    id: '7',
    title: 'Calendário Técnico de Vacinação - Criança',
    description: 'Calendário completo de vacinação para crianças de 0 a 12 anos.',
    image: '/placeholder-image.svg',
    downloadUrl:
      'https://drive.google.com/file/d/1yJ-fW1WV7EalG4XzPP-snHvzLmDIVHyH/view?usp=sharing',
  },
  {
    id: '8',
    title: 'Calendário Técnico de Vacinação - Adulto',
    description: 'Calendário de vacinação recomendado para adultos.',
    image: '/placeholder-image.svg',
    downloadUrl:
      'https://drive.google.com/file/d/1tgqmoRoa9Yp3EQLmU-1i-nmuwwIXe3cY/view?usp=sharing',
  },
  {
    id: '9',
    title: 'Calendário Técnico de Vacinação - Adolescentes e Jovens',
    description: 'Calendário de vacinação recomendado para adolescentes e jovens.',
    image: '/placeholder-image.svg',
    downloadUrl:
      'https://drive.google.com/file/d/1j5UuzXquXgeZEHJL6dn_ha1Ii6hSGzAA/view?usp=sharing',
  },
]
