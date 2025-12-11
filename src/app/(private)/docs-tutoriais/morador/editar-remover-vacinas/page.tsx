'use client'

export const dynamic = 'force-dynamic'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function MoradorEditarVacinaPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Editar e Remover Vacinas" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Corrija dados de vacinação ou remova registros incorretos a qualquer momento. Você tem
          total controle sobre seu histórico vacinal.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Sua conta criada e validada</li>
            <li>Pelo menos uma vacina registrada</li>
            <li>Os dados corretos para atualizar</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Editar Vacina */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Editar um Registro de Vacina</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Acesse <strong>Registro de Vacinação</strong> no menu.
            </li>
            <li>
              <strong>2.</strong> Localize a vacina que deseja editar na lista.
            </li>
            <li>
              <strong>3.</strong> Clique no ícone de lápis (editar) ao lado do registro.
            </li>
            <li>
              <strong>4.</strong> Modifique os campos que precisam ser corrigidos.
            </li>
            <li>
              <strong>5.</strong> Clique em <strong>Salvar Alterações</strong>.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Dica:</strong> Você pode editar qualquer campo: nome, dose, data ou local.
            </p>
          </div>
        </section>

        {/* Remover Vacina */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Remover um Registro de Vacina</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Acesse <strong>Registro de Vacinação</strong> no menu.
            </li>
            <li>
              <strong>2.</strong> Localize a vacina que deseja remover.
            </li>
            <li>
              <strong>3.</strong> Clique no ícone de lixeira (remover) ao lado do registro.
            </li>
            <li>
              <strong>4.</strong> Confirme a exclusão clicando em <strong>Remover</strong>.
            </li>
            <li>
              <strong>5.</strong> O registro será removido permanentemente.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Atenção:</strong> Esta ação não pode ser desfeita. O registro será removido
              permanentemente do seu histórico.
            </p>
          </div>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Dicas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Dicas Úteis</h3>
          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>Registros em Processo:</strong> Se um registro estiver em processamento, você
              pode editá-lo até que seja confirmado.
            </li>
            <li>
              <strong>Sincronizados com SUS:</strong> Registros sincronizados com o SUS podem ter
              restrições de edição. Entre em contato com o suporte se precisar alterá-los.
            </li>
            <li>
              <strong>Histórico:</strong> Removidas de seu perfil, mas podem ser rastreadas pelos
              registros do sistema para segurança e auditoria.
            </li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="mt-12 flex gap-4 border-t border-gray-200 pt-6">
          <Link
            href="/perguntas-frequentes"
            className="border-primary text-primary hover:bg-primary/5 rounded-lg border-2 px-6 py-3 font-medium transition-colors"
          >
            ← Voltar para Perguntas Frequentes
          </Link>
          <Link
            href="/docs-tutoriais/morador/criar-conta"
            className="bg-primary rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Ver Outros Tutoriais →
          </Link>
        </div>
      </div>
    </main>
  )
}
