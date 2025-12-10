'use client'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function AdminRelatoriosPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Gerar e Analisar Relatórios" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Crie relatórios detalhados sobre vacinação, usuários e desempenho do sistema. Use dados
          para tomar decisões estratégicas e melhorar campanhas de saúde pública.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Conta de administrador ativa</li>
            <li>Acesso ao módulo de relatórios</li>
            <li>Dados suficientes no sistema</li>
            <li>Compreensão básica de indicadores</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Acessar Relatórios */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Acessar Módulo de Relatórios</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Clique em <strong>Painel Administrativo</strong>.
            </li>
            <li>
              <strong>2.</strong> Selecione <strong>Relatórios</strong>.
            </li>
            <li>
              <strong>3.</strong> Você verá um dashboard com dados agregados.
            </li>
          </ol>
        </section>

        {/* Relatórios Pré-configurados */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Relatórios Pré-configurados</h3>
          <p className="mb-4 text-gray-700">O sistema oferece relatórios prontos:</p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Relatório de Vacinação</strong>
              <p className="mt-1 text-sm text-gray-600">
                Cobertura vacinal por vacina, por faixa etária, por UBS.
              </p>
            </div>

            <div>
              <strong>Relatório de Usuários</strong>
              <p className="mt-1 text-sm text-gray-600">
                Total de usuários, cadastros por período, engajamento.
              </p>
            </div>

            <div>
              <strong>Relatório de Campanhas</strong>
              <p className="mt-1 text-sm text-gray-600">
                Desempenho de campanhas, taxa de participação, ROI.
              </p>
            </div>

            <div>
              <strong>Relatório de Desempenho</strong>
              <p className="mt-1 text-sm text-gray-600">
                Indicadores de saúde pública, meta vs realizado.
              </p>
            </div>

            <div>
              <strong>Relatório de Sistema</strong>
              <p className="mt-1 text-sm text-gray-600">
                Uso da plataforma, tecnologia, segurança.
              </p>
            </div>
          </div>
        </section>

        {/* Gerar Relatório */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Gerar Novo Relatório Customizado</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Clique em <strong>+ Novo Relatório</strong>.
            </li>
            <li>
              <strong>2.</strong> Escolha o tipo de relatório:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Vacinação</li>
                <li>• Usuários</li>
                <li>• Campanhas</li>
                <li>• Desempenho</li>
                <li>• Personalizado</li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> Defina o período:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Data de início</li>
                <li>• Data de fim</li>
              </ul>
            </li>
            <li>
              <strong>4.</strong> Selecione filtros (UBS, vacina, faixa etária, etc).
            </li>
            <li>
              <strong>5.</strong> Escolha os indicadores a incluir.
            </li>
            <li>
              <strong>6.</strong> Clique em <strong>Gerar Relatório</strong>.
            </li>
          </ol>
        </section>

        {/* Indicadores */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Indicadores Disponíveis</h3>
          <p className="mb-4 text-gray-700">Você pode selecionar quais indicadores incluir:</p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Cobertura Vacinal</strong>
              <p className="mt-1 text-sm text-gray-600">
                Percentual de população vacinada por vacina
              </p>
            </div>

            <div>
              <strong>Adesão</strong>
              <p className="mt-1 text-sm text-gray-600">Percentual que completou todas as doses</p>
            </div>

            <div>
              <strong>Abandono</strong>
              <p className="mt-1 text-sm text-gray-600">Percentual que iniciou mas não completou</p>
            </div>

            <div>
              <strong>Engajamento</strong>
              <p className="mt-1 text-sm text-gray-600">Acessos à plataforma, interações</p>
            </div>

            <div>
              <strong>Evolução Temporal</strong>
              <p className="mt-1 text-sm text-gray-600">Tendências ao longo do período</p>
            </div>
          </div>
        </section>

        {/* Visualizar Relatório */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Visualizar Relatório Gerado</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Após gerar, o relatório será exibido na tela.
            </li>
            <li>
              <strong>2.</strong> Você verá:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Gráficos e visualizações</li>
                <li>• Tabelas com dados detalhados</li>
                <li>• Resumo executivo</li>
                <li>• Análise comparativa (se aplicável)</li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> Clique em <strong>Filtrar</strong> para aprofundar em dados.
            </li>
            <li>
              <strong>4.</strong> Use <strong>Drill Down</strong> para ver detalhes.
            </li>
          </ol>
        </section>

        {/* Exportar */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Exportar Relatório</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Com o relatório aberto, clique em <strong>Exportar</strong>.
            </li>
            <li>
              <strong>2.</strong> Escolha o formato:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>
                  • <strong>PDF:</strong> Para visualização e impressão
                </li>
                <li>
                  • <strong>Excel:</strong> Para análise adicional
                </li>
                <li>
                  • <strong>CSV:</strong> Para importar em outro sistema
                </li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> O arquivo será gerado e baixado.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Dica:</strong> PDF é melhor para compartilhar. Excel para análises.
            </p>
          </div>
        </section>

        {/* Agendar */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Agendar Relatórios Recorrentes</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Ao criar relatório, clique em <strong>Agendar Recorrência</strong>
              .
            </li>
            <li>
              <strong>2.</strong> Escolha a frequência:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Semanal</li>
                <li>• Mensal</li>
                <li>• Trimestral</li>
                <li>• Anual</li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> Escolha quem deve receber por email.
            </li>
            <li>
              <strong>4.</strong> Clique em <strong>Ativar Agendamento</strong>.
            </li>
            <li>
              <strong>5.</strong> Relatórios serão gerados automaticamente e enviados.
            </li>
          </ol>
        </section>

        {/* Dashboard */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Personalizar Dashboard</h3>
          <p className="mb-4 text-gray-700">Customize sua página de relatórios:</p>

          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na página de Relatórios, clique em{' '}
              <strong>Personalizar Dashboard</strong>.
            </li>
            <li>
              <strong>2.</strong> Arraste widgets para reorganizar.
            </li>
            <li>
              <strong>3.</strong> Marque/desmarque indicadores para mostrar/ocultar.
            </li>
            <li>
              <strong>4.</strong> Defina período padrão (30 dias, 90 dias, etc).
            </li>
            <li>
              <strong>5.</strong> Clique em <strong>Salvar Personalização</strong>.
            </li>
          </ol>
        </section>

        {/* Comparações */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Comparar Períodos</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Ao gerar relatório, clique em <strong>Comparar Períodos</strong>.
            </li>
            <li>
              <strong>2.</strong> Selecione outro período para comparação.
            </li>
            <li>
              <strong>3.</strong> O sistema mostrará:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Dados lado a lado</li>
                <li>• Variação (%) entre períodos</li>
                <li>• Tendências</li>
                <li>• Gráficos comparativos</li>
              </ul>
            </li>
          </ol>
        </section>

        {/* Análise Geográfica */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Análise Geográfica</h3>
          <p className="mb-4 text-gray-700">Visualize dados em mapa:</p>

          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> No relatório, clique em <strong>Visualização Geográfica</strong>.
            </li>
            <li>
              <strong>2.</strong> Um mapa será exibido com cores indicando desempenho por região.
            </li>
            <li>
              <strong>3.</strong> Verde = bom desempenho, Vermelho = precisa melhorar.
            </li>
            <li>
              <strong>4.</strong> Clique em região para drill down.
            </li>
          </ol>
        </section>

        {/* Histórico */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Ver Histórico de Relatórios</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na página de Relatórios, clique em <strong>Histórico</strong>.
            </li>
            <li>
              <strong>2.</strong> Você verá lista de todos os relatórios gerados.
            </li>
            <li>
              <strong>3.</strong> Clique para reabrir qualquer relatório anterior.
            </li>
            <li>
              <strong>4.</strong> Você pode clonar ou atualizar dados.
            </li>
          </ol>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Problemas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Se Você Encontrar Problemas</h3>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Relatório vazio ou sem dados</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique se filtros estão muito restritos. Expanda período ou remova filtros.
              </p>
            </div>

            <div>
              <strong>Geração é muito lenta</strong>
              <p className="mt-1 text-sm text-gray-600">
                Reduza período, UBS ou vacinas incluídas. Tente novamente em outro horário.
              </p>
            </div>

            <div>
              <strong>Números não parecem corretos</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique filtros aplicados. Valide com dados de origem.
              </p>
            </div>

            <div>
              <strong>Email não recebeu relatório agendado</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique spam. Confirme que agendamento está ativo e email correto.
              </p>
            </div>

            <div>
              <strong>Não consigo exportar relatório</strong>
              <p className="mt-1 text-sm text-gray-600">
                Tente outro navegador ou formato. Verifique espaço em disco.
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
            href="/docs-tutoriais/admin/configuracoes-sistema"
            className="bg-primary rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Próximo: Configurações do Sistema →
          </Link>
        </div>
      </div>
    </main>
  )
}
