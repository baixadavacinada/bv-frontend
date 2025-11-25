import crianca0_5Icon from '@/assets/icons/crianca-0-5.svg'
import crianca6_12Icon from '@/assets/icons/crianca-6-12.svg'
import crianca1_2Icon from '@/assets/icons/crianca-1-2.svg'
import crianca2_4Icon from '@/assets/icons/crianca-2-4.svg'
import crianca5_10Icon from '@/assets/icons/crianca-5-10.svg'
import adolescenteIcon from '@/assets/icons/adolescente.svg'
import adultoIcon from '@/assets/icons/adulto-20-59.svg'
import gestanteIcon from '@/assets/icons/gravida.svg'
import idosoIcon from '@/assets/icons/idoso.svg'

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
    icon: crianca0_5Icon,
    periods: [
      {
        period: 'Ao nascer',
        vaccines: [
          {
            id: 'bcg',
            name: 'BCG',
            description:
              'Doenças evitadas: formas graves e disseminadas da tuberculose e efeito protetor contra a hanseníase',
            dose: 'Dose: única',
          },
          {
            id: 'hepb-1',
            name: 'Hepatite B',
            description: 'Doenças evitadas: hepatite B e hepatite D',
            dose: 'Dose: 1ª dose',
          },
        ],
      },
      {
        period: '2 meses',
        vaccines: [
          {
            id: 'pentavalente-1',
            name: 'Vacina penta (DTP+Hib+HB)',
            description:
              'Doenças evitadas: difteria, tétano, coqueluche, infecções causadas por Haemophilus influenzae B e hepatite B',
            dose: 'Dose: 1ª dose',
          },
          {
            id: 'polio-1',
            name: 'Vacina poliomielite inativada VIP',
            description: 'Doenças evitadas: poliomielite (paralisia infantil)',
            dose: 'Dose: 1ª dose',
          },
          {
            id: 'pneumococo-1',
            name: 'Vacina pneumocócica 10-valente',
            description:
              'Doenças evitadas: doenças pneumocócicas invasivas (pelos sorogrupos contidos na vacina)',
            dose: 'Dose: 1ª dose',
          },
          {
            id: 'rotavirus-1',
            name: 'Vacina rotavírus humano',
            description:
              'Doenças evitadas: gastroenterite viral (diarreia e vômitos). Atenção aos prazos: 1ª dose entre 1 mês e 15 dias e 11 meses e 29 dias. 2ª dose entre 3 meses e 15 dias e 23 meses e 29 dias. Se a 1ª dose não for feita no período indicado, a criança perde a oportunidade da 2ª dose',
            dose: 'Dose: 1ª dose',
          },
        ],
      },
      {
        period: '3 meses',
        vaccines: [
          {
            id: 'meningococica-c-1',
            name: 'Vacina meningocócica C',
            description:
              'Doenças evitadas: doenças meningocócicas (meningite, encefalite, meningoencefalite) pelo meningococo tipo C',
            dose: 'Dose: 1ª dose',
          },
        ],
      },
      {
        period: '4 meses',
        vaccines: [
          {
            id: 'pentavalente-2',
            name: 'Vacina penta (DTP+Hib+HB)',
            description:
              'Doenças evitadas: difteria, tétano, coqueluche, infecções causadas por Haemophilus influenzae B e hepatite B',
            dose: 'Dose: 2ª dose',
          },
          {
            id: 'polio-2',
            name: 'Vacina poliomielite inativada VIP',
            description: 'Doenças evitadas: poliomielite (paralisia infantil)',
            dose: 'Dose: 2ª dose',
          },
          {
            id: 'pneumococo-2',
            name: 'Vacina pneumocócica 10-valente',
            description:
              'Doenças evitadas: doenças pneumocócicas invasivas (pelos sorogrupos contidos na vacina)',
            dose: 'Dose: 2ª dose',
          },
          {
            id: 'rotavirus-2',
            name: 'Vacina rotavírus humano',
            description:
              'Doenças evitadas: gastroenterite viral (diarreia e vômitos). Atenção aos prazos: 1ª dose entre 1 mês e 15 dias e 11 meses e 29 dias. 2ª dose entre 3 meses e 15 dias e 23 meses e 29 dias. Se a 1ª dose não for feita no período indicado, a criança perde a oportunidade da 2ª dose',
            dose: 'Dose: 2ª dose',
          },
        ],
      },
      {
        period: '5 meses',
        vaccines: [
          {
            id: 'meningococica-c-2',
            name: 'Vacina meningocócica C',
            description:
              'Doenças evitadas: doenças meningocócicas (meningite, encefalite, meningoencefalite) pelo meningococo tipo C',
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
    icon: crianca6_12Icon,
    periods: [
      {
        period: '6 meses',
        vaccines: [
          {
            id: 'pentavalente-3',
            name: 'Vacina penta (DTP+Hib+HB)',
            description:
              'Doenças evitadas: difteria, tétano, coqueluche, infecções causadas por Haemophilus influenzae B e hepatite B',
            dose: 'Dose: 3ª dose',
          },
          {
            id: 'polio-3',
            name: 'Vacina poliomielite inativada VIP',
            description: 'Doenças evitadas: poliomielite (paralisia infantil)',
            dose: 'Dose: 3ª dose',
          },
          {
            id: 'pneumococo-3',
            name: 'Vacina pneumocócica 10-valente',
            description:
              'Doenças evitadas: doenças pneumocócicas invasivas (pelos sorogrupos contidos na vacina)',
            dose: 'Dose: 3ª dose',
          },
          {
            id: 'influenza-1',
            name: 'Vacina influenza trivalente',
            description:
              'Doenças evitadas: gripe (influenza). Obs.: Crianças de 6 meses a menores de 6 anos devem ser vacinadas todo ano. Quem vai receber a vacina pela primeira vez deve tomar 2 doses com 30 dias de intervalo. As que já tomaram em anos anteriores recebem apenas 1 dose por ano.',
            dose: 'Dose: 1ª dose',
          },
          {
            id: 'covid-1',
            name: 'Vacina covid-19',
            description:
              'Doenças evitadas: formas graves e óbitos causados pelo vírus SARS-CoV-2. Obs.: O esquema pode ser de 2 doses (6 e 7 meses, vacina Spikevax) ou 3 doses (6, 7 e 9 meses, vacina Comirnaty). Para crianças imunocomprometidas, 3 doses, com reforço a cada 6 meses até os 4 anos.',
            dose: 'Dose: 1ª dose',
          },
        ],
      },
      {
        period: '6 a 8 meses',
        vaccines: [
          {
            id: 'febre-amarela-exc',
            name: 'Vacina febre amarela',
            description:
              'Doenças evitadas: formas graves e óbitos causados pelo vírus febre Amarela. Obs.: A vacina contra febre amarela pode ser recomendada para esta idade quando há alto risco de contrair a doença e não é possível adiar a vacinação. Isso vale para quem vive ou vai viajar para áreas com transmissão ativa, sempre após avaliação do serviço de saúde. Para viajantes, a vacina deve ser tomada pelo menos 10 dias antes da viagem.',
            dose: 'Dose: 1 dose (apenas em casos excepcionais)',
          },
        ],
      },
      {
        period: '7 meses',
        vaccines: [
          {
            id: 'covid-2',
            name: 'Vacina covid-19',
            description:
              'Doenças evitadas: formas graves e óbitos causados pelo vírus SARS-CoV-2. Obs.: O esquema pode ser de 2 doses (6 e 7 meses, vacina Spikevax) ou 3 doses (6, 7 e 9 meses, vacina Comirnaty). Para crianças imunocomprometidas, 3 doses, com reforço a cada 6 meses até os 4 anos.',
            dose: 'Dose: 2ª dose',
          },
        ],
      },
      {
        period: '9 meses',
        vaccines: [
          {
            id: 'covid-3',
            name: 'Vacina covid-19',
            description:
              'Doenças evitadas: formas graves e óbitos causados pelo vírus SARS-CoV-2. Obs.: O esquema pode ser de 2 doses (6 e 7 meses, vacina Spikevax) ou 3 doses (6, 7 e 9 meses, vacina Comirnaty). Para crianças imunocomprometidas, 3 doses, com reforço a cada 6 meses até os 4 anos.',
            dose: 'Dose: 3ª dose',
          },
          {
            id: 'febre-amarela-1',
            name: 'Vacina febre amarela',
            description: 'Doenças evitadas: febre amarela',
            dose: 'Dose: 1ª dose',
          },
        ],
      },
      {
        period: '12 meses (1 ano)',
        vaccines: [
          {
            id: 'pneumococo-reforco',
            name: 'Vacina pneumocócica 10-valente',
            description:
              'Doenças evitadas: doenças pneumocócicas invasivas (pelos sorogrupos contidos na vacina)',
            dose: 'Dose: reforço',
          },
          {
            id: 'meningococica-acwy',
            name: 'Vacina meningocócica ACWY',
            description:
              'Doenças evitadas: doenças meningocócicas (meningite, encefalite, meningoencefalite)',
            dose: 'Dose: 1 dose',
          },
          {
            id: 'sarampo-1',
            name: 'Vacina tríplice viral SCR',
            description: 'Doenças evitadas: sarampo, caxumba e rubéola',
            dose: 'Dose: 1ª dose',
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
    icon: crianca1_2Icon,
    periods: [
      {
        period: '15 meses',
        vaccines: [
          {
            id: 'dtp-reforco-1',
            name: 'Vacina DTP',
            description: 'Doenças evitadas: difteria, tétano e coqueluche',
            dose: 'Dose: 1º reforço',
          },
          {
            id: 'vip-reforco-1',
            name: 'Vacina VIP',
            description: 'Doenças evitadas: poliomielite (paralisia infantil)',
            dose: 'Dose: 1º reforço',
          },
          {
            id: 'tetraviral',
            name: 'Vacina tetraviral (SCRV)',
            description: 'Doenças evitadas: sarampo, caxumba, rubéola e varicela',
            dose: 'Dose: 1 dose',
          },
          {
            id: 'hepatite-a-1',
            name: 'Vacina hepatite A',
            description: 'Doenças evitadas: hepatite A',
            dose: 'Dose: 1 dose',
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
    icon: crianca2_4Icon,
    periods: [
      {
        period: '4 anos',
        vaccines: [
          {
            id: 'dtp-reforco-2',
            name: 'Vacina DTP',
            description: 'Doenças evitadas: difteria, tétano e coqueluche',
            dose: 'Dose: 2º reforço',
          },
          {
            id: 'vip-reforco-2',
            name: 'Vacina VIP',
            description: 'Doenças evitadas: poliomielite (paralisia infantil)',
            dose: 'Dose: 2º reforço',
          },
          {
            id: 'febre-amarela-reforco',
            name: 'Vacina febre amarela',
            description: 'Doenças evitadas: febre amarela',
            dose: 'Dose: reforço',
          },
          {
            id: 'varicela-1',
            name: 'Vacina varicela',
            description: 'Doenças evitadas: catapora (varicela)',
            dose: 'Dose: 1 dose',
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
    icon: crianca5_10Icon,
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
    id: '10-24a',
    title: 'Adolescente e Jovem',
    subtitle: '10 a 24 anos',
    ageRange: '10 a 24 anos',
    color: 'bg-pink-100',
    icon: adolescenteIcon,
    periods: [
      {
        period: '9 a 14 anos',
        vaccines: [
          {
            id: 'hpv4-1',
            name: 'Vacina HPV4',
            description:
              'Previne infecções pelo papilomavírus humano, associadas a câncer e verrugas genitais',
            dose: 'Dose: 1 dose',
          },
          {
            id: 'meningococica-acwy-ado',
            name: 'Vacina meningocócica ACWY',
            description:
              'Doenças evitadas: doenças meningocócicas (meningite e outras infecções graves)',
            dose: 'Dose: 1 dose',
          },
        ],
      },
      {
        period: '10 a 24 anos',
        vaccines: [
          {
            id: 'hepb-10-24',
            name: 'Vacina hepatite B',
            description: 'Completar ou iniciar esquema contra hepatite B',
            dose: 'Dose: 3 doses',
          },
          {
            id: 'dt-10-24',
            name: 'Vacina dT',
            description:
              'Doenças evitadas: difteria e tétano. Obs.: Após o esquema completo de 3 doses, é recomendado 1 dose de reforço a cada 10 anos, antecipado para 5 anos em caso de risco de difteria ou tétano. Para profissionais de saúde, parteiras tradicionais e estagiários que atuam com recém-nascidos, recomenda-se a vacina dTpa.',
            dose: 'Dose: 3 doses + reforço',
          },
          {
            id: 'triple-viral-10-24',
            name: 'Vacina tríplice viral',
            description: 'Garantir duas doses de vacina contra sarampo, caxumba e rubéola',
            dose: 'Dose: 2 doses',
          },
          {
            id: 'febre-amarela-10-24',
            name: 'Vacina febre amarela',
            description:
              'Recomendado para quem mora ou viaja para áreas com recomendação de vacina',
            dose: 'Dose: 1 dose',
          },
          {
            id: 'pneumococo-23-10-24',
            name: 'Vacina pneumocócica 23V',
            description: 'Ajuda a prevenir formas graves de pneumonia (apenas povos indígenas)',
            dose: 'Dose: 2 doses',
          },
          {
            id: 'varicela-10-24',
            name: 'Vacina varicela',
            description:
              'Protege contra catapora (varicela) (para indígenas e profissionais de saúde)',
            dose: 'Dose: 2 doses',
          },
        ],
      },
    ],
  },
  {
    id: '25-59a',
    title: 'Adulto',
    subtitle: '25 a 59 anos',
    ageRange: '25 a 59 anos',
    color: 'bg-sky-100',
    icon: adultoIcon,
    periods: [
      {
        period: 'Ao longo da vida adulta',
        vaccines: [
          {
            id: 'hepb-25-59',
            name: 'Vacina hepatite B',
            description: 'Protege contra hepatite B e hepatite D',
            dose: 'Dose: 3 doses',
          },
          {
            id: 'dt-25-59',
            name: 'Vacina dT',
            description:
              'Doenças evitadas: difteria e tétano. Obs.: Após o esquema completo de 3 doses, é recomendado 1 reforço a cada 10 anos, antecipado para 5 anos em caso de risco de difteria ou tétano. Para profissionais de saúde, parteiras tradicionais e estagiários que atuam com recém-nascidos, recomenda-se a vacina dTpa.',
            dose: 'Dose: 3 doses + reforço',
          },
          {
            id: 'febre-amarela-25-59',
            name: 'Vacina febre amarela',
            description:
              'Recomendado para quem mora ou viaja para áreas com recomendação de vacina',
            dose: 'Dose: 1 dose',
          },
          {
            id: 'triple-viral-25-59',
            name: 'Vacina tríplice viral',
            description: 'Garantir 2 doses de vacina contra sarampo, caxumba e rubéola',
            dose: 'Dose: 2 doses',
          },
          {
            id: 'pneumococo-23-25-59',
            name: 'Vacina pneumocócica 23V',
            description: 'Ajuda a prevenir formas graves de pneumonia',
            dose: 'Dose: 2 doses',
          },
          {
            id: 'varicela-25-59',
            name: 'Vacina varicela',
            description: 'Protege contra catapora (varicela)',
            dose: 'Dose: 2 doses',
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
    icon: gestanteIcon,
    periods: [
      {
        period: 'Ao saber da gravidez',
        vaccines: [
          {
            id: 'hepb-gestante',
            name: 'Vacina hepatite B',
            description: 'Completar esquema para proteger a gestante e reduzir risco para o bebê',
            dose: 'Dose: 3 doses',
          },
          {
            id: 'dt-gestante',
            name: 'Vacina dT',
            description: 'Reforço contra difteria e tétano',
            dose: 'Dose: conforme histórico',
          },
          {
            id: 'influenza-gestante',
            name: 'Vacina influenza',
            description: 'Previne gripe e complicações respiratórias na gestação',
            dose: 'Dose: 1 vez ao ano durante a campanha',
          },
          {
            id: 'covid-gestante',
            name: 'Vacina covid-19',
            description: 'Protege contra formas graves de Covid-19 na gestação',
            dose: 'Dose: conforme orientação atual de reforços',
          },
          {
            id: 'febre-amarela-gestante',
            name: 'Vacina febre amarela',
            description:
              'Indicada apenas em situações especiais de risco, com avaliação profissional',
            dose: 'Dose: única ou reforço, quando recomendada',
          },
        ],
      },
      {
        period: 'A partir da 20ª semana',
        vaccines: [
          {
            id: 'dtpa-gestante',
            name: 'Vacina dTpa',
            description: 'Previne difteria, tétano e coqueluche; protege a mãe e o recém-nascido',
            dose: 'Dose: 1 dose',
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
    icon: idosoIcon,
    periods: [
      {
        period: 'A partir dos 60 anos',
        vaccines: [
          {
            id: 'hepb-idoso',
            name: 'Vacina hepatite B',
            description: 'Protege contra hepatite B e hepatite D',
            dose: 'Dose: 3 doses',
          },
          {
            id: 'dt-idoso',
            name: 'Vacina dT',
            description: 'Reforço contra difteria e tétano',
            dose: 'Dose: reforço a cada 10 anos',
          },
          {
            id: 'febre-amarela-idoso',
            name: 'Vacina febre amarela',
            description: 'Indicada apenas em situações especiais de risco',
            dose: 'Dose: única ou reforço',
          },
          {
            id: 'triple-viral-idoso',
            name: 'Vacina tríplice viral',
            description: 'Pode ser indicada para pessoas sem comprovação vacinal prévia',
            dose: 'Dose: conforme histórico e avaliação da UBS',
          },
          {
            id: 'pneumococica-23-idoso',
            name: 'Vacina pneumocócica 23V',
            description:
              'Ajuda a prevenir formas graves de pneumonia e outras doenças pneumocócicas',
            dose: 'Dose: 2 doses',
          },
          {
            id: 'varicela-idoso',
            name: 'Vacina varicela',
            description: 'Protege contra catapora (varicela)',
            dose: 'Dose: conforme indicação',
          },
          {
            id: 'influenza-idoso',
            name: 'Vacina influenza',
            description: 'Vacina anual contra gripe, prioritária para pessoas idosas',
            dose: 'Dose: 1 vez ao ano',
          },
          {
            id: 'covid-idoso',
            name: 'Vacina covid-19',
            description: 'Doenças evitadas: formas graves e óbitos causados pelo vírus SARS-CoV-2',
            dose: 'Dose: 1 dose semestral',
          },
        ],
      },
    ],
  },
]
