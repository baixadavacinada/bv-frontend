'use client'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function TutorialPlaceholder() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Tutorial em Desenvolvimento" />

      <div className="mt-8 max-w-3xl">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-3 text-xl font-bold text-gray-900">Conteúdo em Desenvolvimento</h2>
          <p className="mb-4 text-gray-700">
            Este tutorial está sendo preparado com instruções passo a passo detalhadas e imagens
            ilustrativas.
          </p>
          <p className="text-gray-700">Você pode:</p>
          <ul className="mt-3 space-y-2 text-gray-700">
            <li>
              • Consultar a seção <strong>Perguntas Frequentes</strong> para respostas rápidas
            </li>
            <li>
              • Explorar outros <strong>tutoriais disponíveis</strong>
            </li>
            <li>• Voltar e tentar novamente em breve</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/perguntas-frequentes"
            className="border-primary text-primary hover:bg-primary/5 rounded-lg border-2 px-6 py-3 font-medium transition-colors"
          >
            ← Voltar para Perguntas Frequentes
          </Link>
          <Link
            href="/docs-tutoriais"
            className="bg-primary rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Ver Outros Tutoriais →
          </Link>
        </div>
      </div>
    </main>
  )
}
