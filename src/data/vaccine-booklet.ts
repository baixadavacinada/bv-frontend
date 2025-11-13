export interface VaccinePeriod {
  period: string
  vaccines: Vaccine[]
}

export interface Vaccine {
  id: string
  name: string
  description: string
  dose: string
}

export interface AgeGroup {
  id: string
  title: string
  subtitle: string
  ageRange: string
  color: string
  icon: string
  periods: VaccinePeriod[]
}

export const ageGroups: AgeGroup[] = [
  {
    id: 'newborn-5m',
    title: 'Criança',
    subtitle: '0 a 5 meses',
    ageRange: '0 a 5 meses',
    color: 'bg-amber-100',
    icon: '/assets/icons/crianca-0-5.svg',
    periods: [
      {
        period: 'Ao nascer',
        vaccines: [
          {
            id: 'bcg',
            name: 'BCG',
            description: 'Previne tuberculose',
            dose: 'Dose: única',
          },
          {
            id: 'hepb-1',
            name: 'Hepatite B',
            description: 'Previne hepatite B',
            dose: 'Dose: 1ª dose',
          },
        ],
      },
      {
        period: '2 meses',
        vaccines: [
          {
            id: 'rotavirus-1',
            name: 'Rotavírus',
            description: 'Previne diarréia por rotavírus',
            dose: 'Dose: 1ª dose',
          },
          {
            id: 'polio-1',
            name: 'Poliomielite',
            description: 'Previne poliomielite',
            dose: 'Dose: 1ª dose',
          },
          {
            id: 'pentavalente-1',
            name: 'Pentavalente',
            description:
              'Previne difteria, tétano, coqueluche, hepatite B e Haemophilus influenzae',
            dose: 'Dose: 1ª dose',
          },
          {
            id: 'pneumococo-1',
            name: 'Pneumocócica',
            description: 'Previne pneumonia e meningite pneumocócica',
            dose: 'Dose: 1ª dose',
          },
        ],
      },
      {
        period: '4 meses',
        vaccines: [
          {
            id: 'rotavirus-2',
            name: 'Rotavírus',
            description: 'Previne diarréia por rotavírus',
            dose: 'Dose: 2ª dose',
          },
          {
            id: 'polio-2',
            name: 'Poliomielite',
            description: 'Previne poliomielite',
            dose: 'Dose: 2ª dose',
          },
          {
            id: 'pentavalente-2',
            name: 'Pentavalente',
            description:
              'Previne difteria, tétano, coqueluche, hepatite B e Haemophilus influenzae',
            dose: 'Dose: 2ª dose',
          },
          {
            id: 'pneumococo-2',
            name: 'Pneumocócica',
            description: 'Previne pneumonia e meningite pneumocócica',
            dose: 'Dose: 2ª dose',
          },
        ],
      },
    ],
  },
  {
    id: '6-12m',
    title: 'Criança',
    subtitle: '6 a 12 meses',
    ageRange: '6 a 12 meses',
    color: 'bg-purple-100',
    icon: '/assets/icons/crianca-5-10.svg',
    periods: [
      {
        period: '6 meses',
        vaccines: [
          {
            id: 'polio-3',
            name: 'Poliomielite',
            description: 'Previne poliomielite',
            dose: 'Dose: 3ª dose',
          },
          {
            id: 'pentavalente-3',
            name: 'Pentavalente',
            description:
              'Previne difteria, tétano, coqueluche, hepatite B e Haemophilus influenzae',
            dose: 'Dose: 3ª dose',
          },
          {
            id: 'pneumococo-3',
            name: 'Pneumocócica',
            description: 'Previne pneumonia e meningite pneumocócica',
            dose: 'Dose: 3ª dose',
          },
          {
            id: 'hepb-2',
            name: 'Hepatite B',
            description: 'Previne hepatite B',
            dose: 'Dose: 2ª dose',
          },
        ],
      },
      {
        period: '9 meses',
        vaccines: [
          {
            id: 'febre-amarela',
            name: 'Febre Amarela',
            description: 'Previne febre amarela',
            dose: 'Dose: 1ª dose',
          },
        ],
      },
      {
        period: '12 meses (1 ano)',
        vaccines: [
          {
            id: 'sarampo-1',
            name: 'Tríplice Viral',
            description: 'Previne sarampo, caxumba e rubéola',
            dose: 'Dose: 1ª dose',
          },
          {
            id: 'pneumococo-reforco',
            name: 'Pneumocócica',
            description: 'Previne pneumonia e meningite pneumocócica',
            dose: 'Dose: reforço',
          },
          {
            id: 'hepb-3',
            name: 'Hepatite B',
            description: 'Previne hepatite B',
            dose: 'Dose: 3ª dose',
          },
        ],
      },
    ],
  },
  {
    id: '1-2a',
    title: 'Criança',
    subtitle: '1 a 2 anos',
    ageRange: '1 a 2 anos',
    color: 'bg-blue-100',
    icon: '/assets/icons/crianca-5-10.svg',
    periods: [
      {
        period: '15 meses',
        vaccines: [
          {
            id: 'pentavalente-reforco',
            name: 'Pentavalente',
            description:
              'Previne difteria, tétano, coqueluche, hepatite B e Haemophilus influenzae',
            dose: 'Dose: reforço',
          },
          {
            id: 'polio-reforco',
            name: 'Poliomielite',
            description: 'Previne poliomielite',
            dose: 'Dose: reforço',
          },
        ],
      },
      {
        period: '18 meses',
        vaccines: [
          {
            id: 'sarampo-2',
            name: 'Tríplice Viral',
            description: 'Previne sarampo, caxumba e rubéola',
            dose: 'Dose: 2ª dose',
          },
        ],
      },
    ],
  },
  {
    id: '3-4a',
    title: 'Criança',
    subtitle: '3 a 4 anos',
    ageRange: '3 a 4 anos',
    color: 'bg-emerald-100',
    icon: '/assets/icons/crianca-5-10.svg',
    periods: [
      {
        period: '4 anos',
        vaccines: [
          {
            id: 'difteria-tetano-coqueluche-reforco',
            name: 'DTP (reforço)',
            description: 'Reforço contra difteria, tétano e coqueluche conforme esquema vacinal',
            dose: 'Dose: reforço',
          },
          {
            id: 'polio-2-reforco',
            name: 'Poliomielite',
            description: 'Reforço contra poliomielite',
            dose: 'Dose: 2º reforço',
          },
          {
            id: 'sarampo-reforco',
            name: 'Tríplice ou Tetra Viral',
            description: 'Reforço contra sarampo, caxumba, rubéola (e varicela)',
            dose: 'Dose: reforço',
          },
        ],
      },
    ],
  },
  {
    id: '5-10a',
    title: 'Criança',
    subtitle: '5 a 10 anos',
    ageRange: '5 a 10 anos',
    color: 'bg-teal-100',
    icon: '/assets/icons/crianca-5-10.svg',
    periods: [
      {
        period: '5 a 10 anos',
        vaccines: [
          {
            id: 'checar-caderneta',
            name: 'Revisão da caderneta',
            description:
              'Verificar se todos os reforços de infância (pólio, DTP, tríplice viral etc.) foram feitos',
            dose: 'Conforme histórico vacinal',
          },
          {
            id: 'influenza-crianca',
            name: 'Influenza',
            description: 'Protege contra gripe; recomendada anualmente para grupos prioritários',
            dose: 'Dose: 1 vez ao ano (quando indicado)',
          },
        ],
      },
    ],
  },
  {
    id: '11-19a',
    title: 'Adolescente',
    subtitle: '11 a 19 anos',
    ageRange: '11 a 19 anos',
    color: 'bg-pink-100',
    icon: '/assets/icons/adolescente-11-19.svg',
    periods: [
      {
        period: '9 a 14 anos',
        vaccines: [
          {
            id: 'hpv',
            name: 'HPV',
            description:
              'Previne infecções pelo papilomavírus humano, associadas a câncer e verrugas genitais',
            dose: 'Dose: esquema conforme idade',
          },
          {
            id: 'meningococica-acwy',
            name: 'Meningocócica ACWY',
            description: 'Previne doenças meningocócicas (meningite e outras infecções graves)',
            dose: 'Dose: 1ª dose ou reforço',
          },
        ],
      },
      {
        period: '11 a 19 anos',
        vaccines: [
          {
            id: 'hepb-adolescente',
            name: 'Hepatite B',
            description: 'Completar ou iniciar esquema contra hepatite B',
            dose: 'Dose: até 3 doses, conforme histórico',
          },
          {
            id: 'dt-adolescente',
            name: 'dT (Dupla adulto)',
            description: 'Reforço contra difteria e tétano',
            dose: 'Dose: completar 3 doses e reforçar a cada 10 anos',
          },
          {
            id: 'triple-viral-adolescente',
            name: 'Tríplice Viral',
            description: 'Garantir duas doses de vacina contra sarampo, caxumba e rubéola',
            dose: 'Dose: 1 ou 2 doses, conforme histórico',
          },
        ],
      },
    ],
  },
  {
    id: '20-59a',
    title: 'Adulto',
    subtitle: '20 a 59 anos',
    ageRange: '20 a 59 anos',
    color: 'bg-sky-100',
    icon: '/assets/icons/adulto-20-59.svg',
    periods: [
      {
        period: 'Ao longo da vida adulta',
        vaccines: [
          {
            id: 'hepb-adulto',
            name: 'Hepatite B',
            description: 'Protege contra hepatite B (e D)',
            dose: 'Dose: completar 3 doses, se necessário',
          },
          {
            id: 'dt-adulto',
            name: 'dT (Dupla adulto)',
            description: 'Reforço contra difteria e tétano',
            dose: 'Dose: reforço a cada 10 anos',
          },
          {
            id: 'febre-amarela-adulto',
            name: 'Febre Amarela',
            description:
              'Recomendado para quem mora ou viaja para áreas com recomendação de vacina',
            dose: 'Dose: conforme histórico vacinal e orientação da UBS',
          },
          {
            id: 'triple-viral-adulto',
            name: 'Tríplice Viral',
            description: 'Garantir 2 doses de vacina contra sarampo, caxumba e rubéola',
            dose: 'Dose: 1 ou 2 doses, conforme histórico',
          },
          {
            id: 'influenza-adulto',
            name: 'Influenza',
            description: 'Protege contra gripe; ofertada anualmente para grupos prioritários',
            dose: 'Dose: 1 vez ao ano (quando indicado)',
          },
          {
            id: 'covid-adulto',
            name: 'Covid-19',
            description:
              'Protege contra formas graves e óbitos pela Covid-19 conforme campanhas anuais',
            dose: 'Dose: conforme orientação do Ministério da Saúde',
          },
        ],
      },
    ],
  },
  {
    id: 'gestante',
    title: 'Gestante',
    subtitle: 'Durante a gestação',
    ageRange: 'Gestação',
    color: 'bg-rose-100',
    icon: '/assets/icons/gestante.svg',
    periods: [
      {
        period: 'Ao saber da gravidez',
        vaccines: [
          {
            id: 'hepb-gestante',
            name: 'Hepatite B',
            description: 'Completar esquema para proteger a gestante e reduzir risco para o bebê',
            dose: 'Dose: completar 3 doses, se necessário',
          },
          {
            id: 'dtpa-gestante',
            name: 'dTpa (tipo adulto)',
            description: 'Previne difteria, tétano e coqueluche; protege a mãe e o recém-nascido',
            dose: 'Dose: 1 dose em cada gestação, a partir do 2º trimestre',
          },
          {
            id: 'influenza-gestante',
            name: 'Influenza',
            description: 'Previne gripe e complicações respiratórias na gestação',
            dose: 'Dose: 1 vez ao ano durante a campanha',
          },
          {
            id: 'covid-gestante',
            name: 'Covid-19',
            description: 'Protege contra formas graves de Covid-19 na gestação',
            dose: 'Dose: conforme orientação atual de reforços',
          },
          {
            id: 'febre-amarela-gestante',
            name: 'Febre Amarela',
            description:
              'Indicada apenas em situações especiais de risco, com avaliação profissional',
            dose: 'Dose: única ou reforço, quando recomendada',
          },
        ],
      },
    ],
  },
  {
    id: '60plus',
    title: 'Idoso',
    subtitle: '60 anos ou mais',
    ageRange: 'A partir de 60 anos',
    color: 'bg-lime-100',
    icon: '/assets/icons/idoso.svg',
    periods: [
      {
        period: 'A partir dos 60 anos',
        vaccines: [
          {
            id: 'hepb-idoso',
            name: 'Hepatite B',
            description: 'Protege contra hepatite B (e D)',
            dose: 'Dose: completar 3 doses, se necessário',
          },
          {
            id: 'dt-idoso',
            name: 'dT (Dupla adulto)',
            description: 'Reforço contra difteria e tétano',
            dose: 'Dose: reforço a cada 10 anos',
          },
          {
            id: 'influenza-idoso',
            name: 'Influenza',
            description: 'Vacina anual contra gripe, prioritária para pessoas idosas',
            dose: 'Dose: 1 vez ao ano',
          },
          {
            id: 'pneumococica-idoso',
            name: 'Pneumocócica 23-valente',
            description:
              'Ajuda a prevenir formas graves de pneumonia e outras doenças pneumocócicas',
            dose: 'Dose: 1 ou 2 doses, conforme indicação',
          },
          {
            id: 'covid-idoso',
            name: 'Covid-19',
            description: 'Reforços regulares para proteção contra formas graves de Covid-19',
            dose: 'Dose: reforços semestrais ou anuais, conforme calendário',
          },
          {
            id: 'triple-viral-idoso',
            name: 'Tríplice Viral',
            description: 'Pode ser indicada para pessoas sem comprovação vacinal prévia',
            dose: 'Dose: conforme histórico e avaliação da UBS',
          },
        ],
      },
    ],
  },
]
