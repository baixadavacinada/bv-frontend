'use client'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function MoradorHistoricoVacinasPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Ver Meu Histórico de Vacinas" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Acesse e acompanhe todas as vacinas que você registrou na plataforma em um único lugar.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Sua conta criada e validada</li>
            <li>Acesso à plataforma</li>
            <li>Pelo menos uma vacina registrada</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Acessar seu Histórico */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Acessar seu Histórico</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Faça login na plataforma.
            </li>
            <li>
              <strong>2.</strong> Clique em <strong>Registro de Vacinação</strong> no menu lateral.
            </li>
            <li>
              <strong>3.</strong> Você verá todas as suas vacinas registradas em uma lista.
            </li>
          </ol>
        </section>

        {/* O que você verá */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">O Que Você Verá</h3>
          <p className="mb-4 text-gray-700">Cada vacina mostra:</p>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Nome da vacina:</strong> Ex: COVID-19, Influenza, Febre Amarela
            </li>
            <li>
              <strong>Tipo de dose:</strong> 1ª, 2ª, 3ª dose ou reforço
            </li>
            <li>
              <strong>Data da vacinação:</strong> Quando você recebeu a dose
            </li>
            <li>
              <strong>Local (UBS):</strong> Unidade de saúde onde foi vacinada
            </li>
            <li>
              <strong>Status:</strong> Registrada, em processamento ou aguardando confirmação
            </li>
          </ul>
        </section>

        {/* Procurar por Vacina */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Procurar por Vacina</h3>
          <p className="mb-4 text-gray-700">Para encontrar uma vacina específica:</p>
          <ol className="space-y-3 text-gray-700">
            <li>
              <strong>1.</strong> Use a barra de busca no topo da lista.
            </li>
            <li>
              <strong>2.</strong> Digite o nome da vacina ou o mês em que a recebeu.
            </li>
            <li>
              <strong>3.</strong> Os resultados aparecem automaticamente.
            </li>
          </ol>
        </section>

        {/* Filtrando Vacinas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Filtrando Vacinas</h3>
          <p className="mb-4 text-gray-700">Você pode filtrar por:</p>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Data:</strong> Mais recentes ou mais antigas
            </li>
            <li>
              <strong>Local:</strong> Apenas de uma UBS específica
            </li>
            <li>
              <strong>Tipo:</strong> Apenas um tipo de vacina
            </li>
            <li>
              <strong>Status:</strong> Somente as já confirmadas
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            Clique no ícone de filtro (funil) para acessar essas opções.
          </p>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Dúvidas Frequentes */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Dúvidas Frequentes</h3>

          <div className="space-y-6">
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">
                Minha vacina não aparece no histórico
              </h4>
              <p className="text-gray-700">
                Atualize a página (pressione F5 ou deslize para baixo em celulares). Se ainda não
                aparecer, a vacina pode estar em processamento. Tente novamente em alguns minutos.
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Posso sincronizar com o SUS?</h4>
              <p className="text-gray-700">
                Alguns estados permitem sincronização automática com o SUS. Se disponível em sua
                região, você verá o botão <strong>Sincronizar com SUS</strong> na página de
                histórico. Clique nele e siga as instruções. Você precisará autorizar o acesso.
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">
                Posso editar um registro de vacina?
              </h4>
              <p className="text-gray-700">
                Sim. Clique na vacina que deseja editar. Toque no ícone de lápis. Altere as
                informações necessárias. Clique em <strong>Salvar</strong>.
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Como removo um registro?</h4>
              <p className="text-gray-700">
                Clique na vacina que deseja remover. Toque no ícone de lixeira. Confirme a exclusão.
                O registro será removido do seu histórico. Esta ação não pode ser desfeita.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="mt-12 flex gap-4 border-t border-gray-200 pt-6">
          <Link
            href="/perguntas-frequentes"
            className="border-primary text-primary hover:bg-primary/5 rounded-lg border-2 px-6 py-3 font-medium transition-colors"
          >
            ← Voltar
          </Link>
          <Link
            href="/docs-tutoriais/morador/adicionar-vacina"
            className="bg-primary rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Próximo: Registrar Vacina →
          </Link>
        </div>
      </div>
    </main>
  )
}
