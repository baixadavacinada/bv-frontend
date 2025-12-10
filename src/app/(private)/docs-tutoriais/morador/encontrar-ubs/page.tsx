'use client'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function MoradorEncontrarUBSPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Encontrar uma UBS Próxima" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Localize unidades de saúde (UBS) perto de você usando o mapa interativo. Veja informações
          sobre horários, endereço e avaliações de outros usuários.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Sua conta criada (opcional)</li>
            <li>Localização ativada no seu dispositivo (recomendado)</li>
            <li>Conexão de internet</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Acessar Mapa de UBS */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Acessar o Mapa de UBS</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> No menu principal, clique em <strong>UBS</strong> ou{' '}
              <strong>Encontrar UBS</strong>.
            </li>
            <li>
              <strong>2.</strong> Você verá um mapa com pins indicando unidades de saúde.
            </li>
            <li>
              <strong>3.</strong> As UBS mais próximas aparecerão no topo da lista.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Dica:</strong> Se permitir acesso à localização, as UBS serão ordenadas por
              distância.
            </p>
          </div>
        </section>

        {/* Buscar UBS Específica */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Buscar uma UBS Específica</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Use a barra de busca no topo da página.
            </li>
            <li>
              <strong>2.</strong> Digite o nome da UBS, bairro ou rua.
            </li>
            <li>
              <strong>3.</strong> Os resultados aparecem em tempo real.
            </li>
            <li>
              <strong>4.</strong> Clique em uma UBS para ver detalhes completos.
            </li>
          </ol>
        </section>

        {/* Ver Detalhes */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Ver Detalhes de uma UBS</h3>
          <p className="mb-4 text-gray-700">Ao clicar em uma unidade, você verá:</p>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Nome:</strong> Nome completo da unidade
            </li>
            <li>
              <strong>Endereço:</strong> Localização exata com CEP
            </li>
            <li>
              <strong>Telefone:</strong> Número para contato
            </li>
            <li>
              <strong>Horários:</strong> Dias e horas de funcionamento
            </li>
            <li>
              <strong>Avaliação:</strong> Notas e comentários de usuários
            </li>
            <li>
              <strong>Direções:</strong> Link para abrir no Google Maps
            </li>
          </ul>
        </section>

        {/* Usar Direções */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Chegar até a UBS</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na página de detalhes da UBS, clique em{' '}
              <strong>Abrir no Google Maps</strong> ou <strong>Direções</strong>.
            </li>
            <li>
              <strong>2.</strong> O Google Maps abrirá com a localização selecionada.
            </li>
            <li>
              <strong>3.</strong> Escolha seu modo de transporte: carro, transporte público ou a pé.
            </li>
            <li>
              <strong>4.</strong> Siga as instruções de navegação.
            </li>
          </ol>
        </section>

        {/* Avaliar UBS */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Ver e Deixar Avaliações</h3>
          <p className="mb-4 text-gray-700">
            Na página de cada UBS, você encontrará avaliações de outros usuários e poderá deixar a
            sua:
          </p>
          <ol className="space-y-3 text-gray-700">
            <li>
              <strong>1.</strong> Desça até a seção <strong>Avaliações</strong>.
            </li>
            <li>
              <strong>2.</strong> Leia comentários de outros usuários.
            </li>
            <li>
              <strong>3.</strong> Clique em <strong>Deixar Avaliação</strong> se deseja compartilhar
              sua experiência.
            </li>
          </ol>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Dúvidas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Dúvidas Frequentes</h3>

          <div className="space-y-6">
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Por que o mapa não carrega?</h4>
              <p className="text-gray-700">
                Verifique sua conexão de internet. Deslize para baixo para recarregar. Se o problema
                persistir, tente novamente em alguns minutos.
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">
                Posso permitir localização depois?
              </h4>
              <p className="text-gray-700">
                Sim! Quando a plataforma pedir permissão, clique em <strong>Permitir</strong>. Se já
                recusou, vá em Configurações do seu dispositivo e ative permissão de localização.
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Uma UBS não aparece no mapa</h4>
              <p className="text-gray-700">
                Algumas UBS podem não estar cadastradas. Entre em contato com o suporte para
                registrar a unidade.
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">
                Como vejo os horários de atendimento?
              </h4>
              <p className="text-gray-700">
                Clique na UBS e desça até <strong>Horários</strong>. Você verá os dias e horas de
                funcionamento da unidade.
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
            ← Voltar para Perguntas Frequentes
          </Link>
          <Link
            href="/docs-tutoriais/morador/avaliar-ubs"
            className="bg-primary rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Próximo: Avaliar uma UBS →
          </Link>
        </div>
      </div>
    </main>
  )
}
