'use client'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default function DocsPage() {
  return (
    <div className="w-full">
      <BvTitleHeader title="Tutoriais e Documentação" />

      <div className="bg-primary/5 border-primary/20 mt-8 rounded-xl border p-6">
        <p className="mb-6 text-base leading-relaxed text-gray-700">
          Aqui você encontra tutoriais completos em formato de texto para aprender a usar todas as
          funcionalidades da plataforma Baixada Vacinada.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Moradores */}
          <Link
            href="/perguntas-frequentes"
            className="border-primary hover:bg-primary/5 rounded-xl border-2 p-6 transition-all"
          >
            <div className="mb-3 flex items-center gap-3">
              <BookOpen className="text-primary" size={24} />
              <h3 className="text-lg font-bold text-gray-900">Tutoriais para Moradores</h3>
            </div>
            <p className="text-sm text-gray-600">
              Aprenda como criar conta, registrar vacinas, encontrar UBS e muito mais.
            </p>
          </Link>

          {/* Profissionais */}
          <Link
            href="/perguntas-frequentes"
            className="border-alert hover:bg-alert/5 rounded-xl border-2 p-6 transition-all"
          >
            <div className="mb-3 flex items-center gap-3">
              <BookOpen className="text-alert" size={24} />
              <h3 className="text-lg font-bold text-gray-900">Tutoriais para Profissionais</h3>
            </div>
            <p className="text-sm text-gray-600">
              Configure notificações, gerencie pacientes e acompanhe dados de vacinação.
            </p>
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/perguntas-frequentes"
          className="bg-primary inline-block rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
        >
          ← Voltar para Perguntas Frequentes
        </Link>
      </div>
    </div>
  )
}
