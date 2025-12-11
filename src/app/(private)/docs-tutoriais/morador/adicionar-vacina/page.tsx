'use client'

export const dynamic = 'force-dynamic'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function MoradorAdicionarVacinaPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Registrar uma Vacina" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Adicione um novo registro de vacinação ao seu perfil na Baixada Vacinada. Você pode
          registrar vacinas que tomou antes ou depois de criar sua conta.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Sua conta criada e validada</li>
            <li>Data da vacinação</li>
            <li>Nome da vacina</li>
            <li>Tipo de dose (1ª, 2ª, reforço, etc)</li>
            <li>Local onde recebeu a vacina (UBS)</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Acessar Registro de Vacinação */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Acessar Registro de Vacinação</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Faça login na plataforma.
            </li>
            <li>
              <strong>2.</strong> No menu lateral, clique em <strong>Registro de Vacinação</strong>.
            </li>
            <li>
              <strong>3.</strong> Clique no botão <strong>Adicionar Vacina</strong> (sinal de +).
            </li>
          </ol>
        </section>

        {/* Preencher Informações */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Preencher Informações da Vacina</h3>
          <p className="mb-4 text-gray-700">
            Você será apresentado a um formulário com os seguintes campos:
          </p>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1. Nome da Vacina</strong>
              <p className="mt-1 text-sm text-gray-600">
                Selecione na lista (COVID-19, Influenza, Febre Amarela, etc) ou digite se não
                encontrar.
              </p>
            </li>
            <li>
              <strong>2. Tipo de Dose</strong>
              <p className="mt-1 text-sm text-gray-600">
                Escolha entre 1ª, 2ª, 3ª dose ou reforço.
              </p>
            </li>
            <li>
              <strong>3. Data da Vacinação</strong>
              <p className="mt-1 text-sm text-gray-600">
                Clique no campo de data e selecione o dia em que recebeu a vacina.
              </p>
            </li>
            <li>
              <strong>4. Local (UBS)</strong>
              <p className="mt-1 text-sm text-gray-600">
                Selecione a unidade de saúde onde recebeu a vacina. Você pode buscar pelo nome.
              </p>
            </li>
          </ol>
        </section>

        {/* Salvar Registro */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Salvar seu Registro</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Verifique se todos os campos estão corretos.
            </li>
            <li>
              <strong>2.</strong> Clique em <strong>Salvar</strong>.
            </li>
            <li>
              <strong>3.</strong> Você receberá uma confirmação. A vacina aparecerá no seu
              histórico.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-green-400 bg-green-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Sucesso!</strong> Seu registro foi adicionado. Pode levar alguns minutos para
              aparecer na sua lista.
            </p>
          </div>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Problemas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Se Você Encontrar Problemas</h3>

          <div className="space-y-6">
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Não encontro a vacina na lista</h4>
              <p className="text-gray-700">
                Use a barra de busca para procurar pelo nome. Se ainda não encontrar, digite o nome
                manualmente no campo ou selecione <strong>Outra</strong>.
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">A data está bloqueada</h4>
              <p className="text-gray-700">
                Você só pode registrar vacinas com datas no passado. Se precisar registrar uma dose
                futura, tente novamente após recebê-la.
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Não posso clicar em Salvar</h4>
              <p className="text-gray-700">
                Verifique se todos os campos obrigatórios foram preenchidos: Nome da Vacina, Tipo de
                Dose, Data e Local (UBS).
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">
                A vacina foi registrada mas não aparece
              </h4>
              <p className="text-gray-700">
                Atualize a página (pressione F5). Se ainda não aparecer, tente novamente em alguns
                minutos ou entre em contato com o suporte.
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
            href="/docs-tutoriais/morador/historico-vacinas"
            className="bg-primary rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Ver seu Histórico →
          </Link>
        </div>
      </div>
    </main>
  )
}
