'use client'

export const dynamic = 'force-dynamic'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function MoradorLembretesPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Configurar Lembretes" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Ative lembretes para não esquecer das suas próximas doses. Você receberá notificações por
          email ou WhatsApp quando estiver na hora de se vacinar.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Sua conta criada e validada</li>
            <li>Email confirmado</li>
            <li>Número de WhatsApp confirmado (opcional)</li>
            <li>Vacinas já registradas no seu histórico</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Acessar Configurações */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Acessar Configurações de Lembretes
          </h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Clique no ícone de engrenagem (⚙️) ou acesse{' '}
              <strong>Configurações</strong>.
            </li>
            <li>
              <strong>2.</strong> Procure pela seção <strong>Notificações e Lembretes</strong>.
            </li>
            <li>
              <strong>3.</strong> Você verá as opções de lembretes disponíveis.
            </li>
          </ol>
        </section>

        {/* Ativar Lembretes */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Ativar Lembretes de Vacinas</h3>
          <p className="mb-4 text-gray-700">Dentro da seção de lembretes, você encontrará:</p>
          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>Lembrete de Segunda Dose:</strong> Ative para receber notificações sobre
              quando sua segunda dose está próxima.
            </li>
            <li>
              <strong>Lembrete de Reforço:</strong> Ative para ser notificado sobre reforços de
              vacinas.
            </li>
            <li>
              <strong>Avisos de Novas Vacinas:</strong> Fique atualizado sobre campanhas de
              vacinação em sua região.
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            Clique no botão ou checklabel para ativar/desativar cada opção.
          </p>
        </section>

        {/* Escolher Canal */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Escolher Como Receber Lembretes</h3>
          <p className="mb-4 text-gray-700">Você pode receber notificações por:</p>
          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>Email:</strong> Mensagens enviadas para seu endereço de email. Mais detalhadas
              e com links.
            </li>
            <li>
              <strong>WhatsApp:</strong> Mensagens no seu WhatsApp. Mais rápidas e instantâneas.
            </li>
            <li>
              <strong>Ambos:</strong> Receba em ambos os canais para maior segurança.
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            Marque as caixas correspondentes ao seu canal preferido.
          </p>
        </section>

        {/* Personalizar Frequência */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Personalizar Frequência de Lembretes
          </h3>
          <p className="mb-4 text-gray-700">
            Você pode definir com quanto tempo de antecedência deseja ser notificado:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>7 dias antes (uma semana de antecedência)</li>
            <li>3 dias antes (aviso mais próximo)</li>
            <li>1 dia antes (última chance)</li>
          </ul>
          <p className="mt-4 text-gray-700">
            Selecione a opção que melhor se adequa ao seu estilo de vida.
          </p>
        </section>

        {/* Salvar */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Salvar Suas Preferências</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Faça todas as suas seleções.
            </li>
            <li>
              <strong>2.</strong> Clique em <strong>Salvar Configurações</strong> ou{' '}
              <strong>Aplicar</strong>.
            </li>
            <li>
              <strong>3.</strong> Uma mensagem de confirmação aparecerá.
            </li>
            <li>
              <strong>4.</strong> Seus lembretes estão agora ativos!
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-green-400 bg-green-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Pronto!</strong> Você começará a receber lembretes de acordo com suas
              preferências.
            </p>
          </div>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Dúvidas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Dúvidas Frequentes</h3>

          <div className="space-y-6">
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Não estou recebendo lembretes</h4>
              <p className="text-gray-700">
                Verifique em Configurações se os lembretes estão ativados. Se estiverem, confirme
                seu email e WhatsApp. Verifique também sua pasta de spam.
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Estou recebendo muitos lembretes</h4>
              <p className="text-gray-700">
                Acesse Configurações e desative algumas opções ou mude o intervalo de lembretes para
                períodos mais longos.
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Posso desativar lembretes?</h4>
              <p className="text-gray-700">
                Sim! Retorne às Configurações e desmarque as opções que não deseja mais receber.
                Você pode ativar novamente a qualquer momento.
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
            href="/docs-tutoriais/morador/adicionar-vacina"
            className="bg-primary rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Registrar uma Vacina →
          </Link>
        </div>
      </div>
    </main>
  )
}
