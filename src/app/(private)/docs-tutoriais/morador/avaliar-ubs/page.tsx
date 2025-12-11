'use client'

export const dynamic = 'force-dynamic'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function MoradorAvaliarUBSPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Avaliar uma UBS" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Compartilhe sua experiência ao visitar uma unidade de saúde. Suas avaliações ajudam outros
          usuários a escolher melhor e incentivam melhorias nos serviços.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Sua conta criada e validada</li>
            <li>Ter visitado uma UBS</li>
            <li>Experiência a compartilhar</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Acessar UBS */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Encontrar a UBS para Avaliar</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> No menu, clique em <strong>UBS</strong> ou{' '}
              <strong>Encontrar UBS</strong>.
            </li>
            <li>
              <strong>2.</strong> Use a busca ou o mapa para encontrar a unidade.
            </li>
            <li>
              <strong>3.</strong> Clique na UBS para ver seus detalhes.
            </li>
          </ol>
        </section>

        {/* Iniciar Avaliação */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Iniciar Sua Avaliação</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na página da UBS, desça até a seção{' '}
              <strong>Avaliações e Comentários</strong>.
            </li>
            <li>
              <strong>2.</strong> Clique em <strong>Deixar Avaliação</strong> ou{' '}
              <strong>Avaliar Esta UBS</strong>.
            </li>
            <li>
              <strong>3.</strong> Um formulário será aberto.
            </li>
          </ol>
        </section>

        {/* Preencher Avaliação */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Preencher sua Avaliação</h3>
          <p className="mb-4 text-gray-700">O formulário terá os seguintes campos:</p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>1. Nota Geral (Estrelas)</strong>
              <p className="mt-1 text-sm text-gray-600">
                Clique nas estrelas para dar uma nota de 1 a 5. 5 estrelas significa excelente, 1
                estrela significa muito ruim.
              </p>
            </div>

            <div>
              <strong>2. Aspectos da Avaliação</strong>
              <p className="mt-1 text-sm text-gray-600">Avalie diferentes aspectos da UBS:</p>
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>
                  • <strong>Atendimento:</strong> Como foi tratado pelos funcionários
                </li>
                <li>
                  • <strong>Limpeza:</strong> Estado de higiene da unidade
                </li>
                <li>
                  • <strong>Equipamentos:</strong> Qualidade e funcionamento dos aparelhos
                </li>
                <li>
                  • <strong>Tempo de Espera:</strong> Quanto tempo ficou esperando
                </li>
                <li>
                  • <strong>Infraestrutura:</strong> Conforto e condições das instalações
                </li>
              </ul>
            </div>

            <div>
              <strong>3. Seu Comentário</strong>
              <p className="mt-1 text-sm text-gray-600">
                Escreva um comentário sobre sua experiência. Seja construtivo e específico. Exemplo:
                {`"Atendimento rápido, porém poucos médicos durante a tarde"`}
              </p>
            </div>
          </div>
        </section>

        {/* Enviar Avaliação */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Enviar sua Avaliação</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Revise todos os campos preenchidos.
            </li>
            <li>
              <strong>2.</strong> Clique em <strong>Enviar Avaliação</strong> ou{' '}
              <strong>Publicar</strong>.
            </li>
            <li>
              <strong>3.</strong> Uma confirmação aparecerá na tela.
            </li>
            <li>
              <strong>4.</strong> Sua avaliação será visível para outros usuários em breve.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-green-400 bg-green-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Sucesso!</strong> Obrigado por compartilhar sua experiência. Suas avaliações
              ajudam a melhorar os serviços de saúde.
            </p>
          </div>
        </section>

        {/* Editar Avaliação */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Editar Sua Avaliação</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Volte à página da UBS.
            </li>
            <li>
              <strong>2.</strong> Localize sua avaliação na seção <strong>Minhas Avaliações</strong>
              .
            </li>
            <li>
              <strong>3.</strong> Clique no ícone de lápis (editar).
            </li>
            <li>
              <strong>4.</strong> Modifique o que desejar.
            </li>
            <li>
              <strong>5.</strong> Clique em <strong>Salvar Alterações</strong>.
            </li>
          </ol>
        </section>

        {/* Remover Avaliação */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Remover sua Avaliação</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na página da UBS, localize sua avaliação.
            </li>
            <li>
              <strong>2.</strong> Clique no ícone de lixeira (remover).
            </li>
            <li>
              <strong>3.</strong> Confirme a remoção.
            </li>
            <li>
              <strong>4.</strong> Sua avaliação será removida permanentemente.
            </li>
          </ol>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Dicas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Dicas para Boas Avaliações</h3>
          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>Seja Honesto:</strong> Compartilhe sua verdadeira experiência, positiva ou
              negativa.
            </li>
            <li>
              <strong>Seja Específico:</strong> Não apenas {`"ruim"`}, mas {`"enfermeiras rudes"`}.
            </li>
            <li>
              <strong>Respeite Outros:</strong> Não faça comentários pessoais ou ofensivos.
            </li>
            <li>
              <strong>Seja Construtivo:</strong> Sugira melhorias em vez de apenas criticar.
            </li>
            <li>
              <strong>Uma Avaliação por Visita:</strong> Você pode avaliar a mesma UBS várias vezes
              se visitou em diferentes ocasiões.
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
