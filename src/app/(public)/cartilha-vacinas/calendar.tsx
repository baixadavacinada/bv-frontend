'use client'

import React, { useState } from 'react'
import { Calendar, Baby, Heart, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VaccineCalendar {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  driveFileId: string
}

const vaccineCalendars: VaccineCalendar[] = [
  {
    id: 'crianca',
    title: 'Calendário - Criança',
    subtitle: 'De 0 a 12 anos',
    description: 'Vacinas recomendadas para crianças desde o nascimento até os 12 anos de idade.',
    icon: <Baby className="h-6 w-6" />,
    driveFileId: '1yJ-fW1WV7EalG4XzPP-snHvzLmDIVHyH',
  },
  {
    id: 'adolescente',
    title: 'Calendário - Adolescente',
    subtitle: 'De 13 a 19 anos',
    description: 'Vacinas recomendadas para adolescentes.',
    icon: <Users className="h-6 w-6" />,
    driveFileId: '1tgqmoRoa9Yp3EQLmU-1i-nmuwwIXe3cY',
  },
  {
    id: 'gestante',
    title: 'Calendário - Gestante',
    subtitle: 'Para mulheres grávidas',
    description: 'Vacinas recomendadas durante a gravidez para proteger a mãe e o bebê.',
    icon: <Heart className="h-6 w-6" />,
    driveFileId: '1VHZCql1FC0b5SslNPBw8j8R_kpv0zdX7',
  },
  {
    id: 'idoso',
    title: 'Calendário - Idoso',
    subtitle: 'Acima de 60 anos',
    description: 'Vacinas recomendadas para idosos para prevenir doenças e complicações.',
    icon: <Calendar className="h-6 w-6" />,
    driveFileId: '1ANuXNfmuuZN-Cu6WH7_mu7RATHgo8r6H',
  },
]

export default function VaccineCalendarContent() {
  const [selectedCalendar, setSelectedCalendar] = useState('crianca')

  const currentCalendar = vaccineCalendars.find((cal) => cal.id === selectedCalendar)

  return (
    <div aria-label="Página de calendário técnico de vacinação">
      <div className="mb-8">
        <p className="mb-4 text-gray-600">
          Consulte o calendário técnico de vacinação para cada faixa etária e grupo especial.
        </p>
      </div>

      {/* Abas de seleção */}
      <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {vaccineCalendars.map((calendar) => (
          <button
            key={calendar.id}
            onClick={() => setSelectedCalendar(calendar.id)}
            className={cn(
              'rounded-lg border-2 p-4 text-left transition-all',
              selectedCalendar === calendar.id
                ? 'border-green-600 bg-green-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-green-400 hover:bg-green-50',
            )}
            aria-pressed={selectedCalendar === calendar.id}
            aria-label={`Selecionar ${calendar.title}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'rounded-full p-2',
                  selectedCalendar === calendar.id
                    ? 'bg-green-200 text-green-700'
                    : 'bg-gray-100 text-gray-600',
                )}
              >
                {calendar.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{calendar.title.split(' - ')[1]}</h3>
                <p className="text-sm text-gray-600">{calendar.subtitle}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Conteúdo do calendário selecionado */}
      {currentCalendar && (
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">{currentCalendar.title}</h2>
            <p className="text-gray-600">{currentCalendar.description}</p>
          </div>

          {/* Visualizador de PDF */}
          <div className="flex flex-col gap-4">
            <div className="h-[600px] w-full rounded-lg bg-gray-100 lg:h-[800px]">
              <iframe
                src={`https://drive.google.com/file/d/${currentCalendar.driveFileId}/preview`}
                className="h-full w-full rounded-lg"
                allowFullScreen
                loading="lazy"
                title={`${currentCalendar.title} - Visualizador`}
                aria-label={`Visualizando ${currentCalendar.title}`}
              />
            </div>

            {/* Link para download */}
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-4">
              <a
                href={`https://drive.google.com/uc?export=download&id=${currentCalendar.driveFileId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                aria-label={`Baixar ${currentCalendar.title}`}
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Baixar PDF
              </a>

              <p className="flex items-center justify-center text-sm text-gray-500">
                💡 Dica: Você também pode abrir o arquivo em tela cheia
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Informações adicionais */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-6">
          <h3 className="mb-2 font-semibold text-blue-900">ℹ️ Importante</h3>
          <p className="text-sm text-blue-800">
            Este calendário segue as recomendações da Secretaria de Saúde do Estado do Rio de
            Janeiro. Consulte um profissional de saúde para orientação personalizada.
          </p>
        </div>

        <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-6">
          <h3 className="mb-2 font-semibold text-green-900">✓ Próximos Passos</h3>
          <p className="text-sm text-green-800">
            Encontre as Unidades Básicas de Saúde mais próximas onde você pode se vacinar.
          </p>
        </div>
      </div>
    </div>
  )
}
