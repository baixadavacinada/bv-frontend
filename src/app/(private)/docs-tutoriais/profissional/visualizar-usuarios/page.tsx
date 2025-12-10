'use client'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function ProfissionalVisualizarUsuariosPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Visualizar e Gerenciar Usuários" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Acesse informações sobre os usuários registrados na sua UBS. Você pode visualizar
          históricos, status vacinal e gerenciar registros de forma segura e em conformidade com as
          regulamentações.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Conta de profissional aprovada</li>
            <li>Estar conectado à plataforma</li>
            <li>Permissão para visualizar dados (concedida na aprovação)</li>
            <li>Entender confidencialidade dos dados médicos</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Acessar Usuários */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Acessar Lista de Usuários</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> No menu principal, clique em <strong>Usuários</strong> ou{' '}
              <strong>Pacientes</strong>.
            </li>
            <li>
              <strong>2.</strong> Você verá uma lista de todos os usuários registrados na sua UBS.
            </li>
            <li>
              <strong>3.</strong> Por padrão, mostra usuários ativos e ordenados alfabeticamente.
            </li>
          </ol>
        </section>

        {/* Pesquisar */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Pesquisar um Usuário Específico</h3>
          <p className="mb-4 text-gray-700">Existem várias formas de encontrar um usuário:</p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Busca por Nome</strong>
              <p className="mt-1 text-sm text-gray-600">
                Digite o nome completo ou parte dele no campo de pesquisa.
              </p>
            </div>

            <div>
              <strong>Busca por CPF</strong>
              <p className="mt-1 text-sm text-gray-600">Digite o CPF (formato: 000.000.000-00).</p>
            </div>

            <div>
              <strong>Busca por Email</strong>
              <p className="mt-1 text-sm text-gray-600">
                Digite o email do usuário para encontrá-lo.
              </p>
            </div>

            <div>
              <strong>Busca por Telefone</strong>
              <p className="mt-1 text-sm text-gray-600">
                Digite o telefone para localizar o usuário.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Dica:</strong> A busca é em tempo real. Comece a digitar e resultados
              aparecerão automaticamente.
            </p>
          </div>
        </section>

        {/* Filtros */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Usar Filtros Avançados</h3>
          <p className="mb-4 text-gray-700">
            Clique em <strong>Filtros</strong> para segmentar usuários:
          </p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Por Status Vacinal</strong>
              <p className="mt-1 text-sm text-gray-600">
                Em dia, atrasado, nunca vacinado, parcialmente vacinado.
              </p>
            </div>

            <div>
              <strong>Por Faixa Etária</strong>
              <p className="mt-1 text-sm text-gray-600">Crianças, adolescentes, adultos, idosos.</p>
            </div>

            <div>
              <strong>Por Data de Cadastro</strong>
              <p className="mt-1 text-sm text-gray-600">
                Usuários novo, últimos 30 dias, últimos 6 meses.
              </p>
            </div>

            <div>
              <strong>Por Atividade</strong>
              <p className="mt-1 text-sm text-gray-600">
                Ativos, inativos, não acessam há quanto tempo.
              </p>
            </div>

            <div>
              <strong>Combinação de Filtros</strong>
              <p className="mt-1 text-sm text-gray-600">
                Combine múltiplos filtros (ex: crianças que não vacinaram nos últimos 6 meses).
              </p>
            </div>
          </div>
        </section>

        {/* Visualizar Perfil */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Visualizar Perfil do Usuário</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na lista de usuários, clique no nome do usuário.
            </li>
            <li>
              <strong>2.</strong> Uma página com detalhes será aberta.
            </li>
            <li>
              <strong>3.</strong> Você verá informações pessoais e dados de saúde.
            </li>
          </ol>

          <p className="mt-4 text-gray-700">
            <strong>Informações Disponíveis:</strong>
          </p>
          <ul className="mt-2 space-y-2 text-sm text-gray-600">
            <li>• Nome completo, email, telefone</li>
            <li>• Data de nascimento e idade</li>
            <li>• Endereço e bairro</li>
            <li>• Data de cadastro na plataforma</li>
            <li>• Status de validação de conta</li>
            <li>• Preferências de notificação</li>
          </ul>
        </section>

        {/* Histórico Vacinal */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Consultar Histórico Vacinal</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na página do usuário, procure pela seção{' '}
              <strong>Histórico de Vacinação</strong>.
            </li>
            <li>
              <strong>2.</strong> Você verá todas as vacinas registradas:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Nome da vacina</li>
                <li>• Data de aplicação</li>
                <li>• Dose (1ª, 2ª, reforço)</li>
                <li>• Local de aplicação (UBS)</li>
                <li>• Profissional que registrou</li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> Você pode exportar este histórico em PDF se necessário.
            </li>
          </ol>
        </section>

        {/* Verificar Status */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Verificar Status Vacinal</h3>
          <p className="mb-4 text-gray-700">Na página do usuário, você verá um resumo do status:</p>

          <div className="space-y-3 text-gray-700">
            <div className="flex items-center gap-3">
              <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span>
              <span>
                <strong>Em Dia:</strong> Todas as vacinas obrigatórias conforme idade
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-block h-3 w-3 rounded-full bg-yellow-500"></span>
              <span>
                <strong>Atrasado:</strong> Faltam doses ou passou data de aplicação
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-block h-3 w-3 rounded-full bg-red-500"></span>
              <span>
                <strong>Crítico:</strong> Muito atrasado, recomenda-se contato imediato
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-block h-3 w-3 rounded-full bg-gray-400"></span>
              <span>
                <strong>Sem Dados:</strong> Nenhuma vacina registrada
              </span>
            </div>
          </div>
        </section>

        {/* Exportar Dados */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Exportar Dados do Usuário</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na página do usuário, procure o ícone de <strong>download</strong>{' '}
              ou
              <strong> exportar</strong>.
            </li>
            <li>
              <strong>2.</strong> Selecione o formato desejado:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• PDF (mais comum)</li>
                <li>• CSV (para análises)</li>
                <li>• JSON (para sistemas)</li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> O arquivo será baixado em seu computador.
            </li>
          </ol>
        </section>

        {/* Relatórios */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Gerar Relatórios</h3>
          <p className="mb-4 text-gray-700">Você pode gerar relatórios sobre grupos de usuários:</p>

          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Selecione os usuários desejados (use filtros).
            </li>
            <li>
              <strong>2.</strong> Clique em <strong>Gerar Relatório</strong> ou{' '}
              <strong>Exportar Selecionados</strong>.
            </li>
            <li>
              <strong>3.</strong> Escolha as informações a incluir:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Dados pessoais</li>
                <li>• Histórico completo</li>
                <li>• Apenas usuários atrasados</li>
                <li>• Estatísticas gerais</li>
              </ul>
            </li>
            <li>
              <strong>4.</strong> O relatório será gerado e pode ser baixado.
            </li>
          </ol>
        </section>

        {/* Confidencialidade */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Confidencialidade e Segurança</h3>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Importante:</strong> Todos os dados de usuários são sensíveis e protegidos por
              lei. Lembre-se sempre de:
            </p>

            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Acessar apenas dados que você realmente precisa para seu trabalho</li>
              <li>✓ Nunca compartilhar dados com pessoas não autorizadas</li>
              <li>✓ Não guardar cópias locais sem necessidade</li>
              <li>
                ✓ Comunicar qualquer acesso ou compartilhamento não autorizado ao administrador
              </li>
              <li>✓ Entender que todo acesso é registrado e auditado</li>
            </ul>
          </div>

          <div className="mt-4 rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Aviso Legal:</strong> O acesso não autorizado, compartilhamento indevido ou
              uso inadequado de dados de pacientes é crime e pode resultar em processo legal.
            </p>
          </div>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Dicas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Dicas Úteis</h3>

          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>Filtros Combinados:</strong> Use múltiplos filtros para identificar públicos
              específicos que precisam contato.
            </li>
            <li>
              <strong>Busca Rápida:</strong> Memorize atalhos de teclado para buscar usuários mais
              rápido.
            </li>
            <li>
              <strong>Exportações Periódicas:</strong> Exporte dados regularmente para análises
              locais.
            </li>
            <li>
              <strong>Atualizações de Dados:</strong> Notifique usuários para atualizar seus
              endereços e contatos.
            </li>
            <li>
              <strong>Rastreabilidade:</strong> Todos os acessos aos dados ficam registrados.
            </li>
          </ul>
        </section>

        {/* Problemas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Se Você Encontrar Problemas</h3>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Dados incompletos para um usuário</strong>
              <p className="mt-1 text-sm text-gray-600">
                O usuário pode não ter preenchido todos os campos. Entre em contato e solicite
                atualização.
              </p>
            </div>

            <div>
              <strong>Usuário não aparece na lista</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique os filtros aplicados. Talvez o usuário esteja desativado ou seja de outra
                UBS.
              </p>
            </div>

            <div>
              <strong>Histórico vacinal inconsistente</strong>
              <p className="mt-1 text-sm text-gray-600">
                Pode haver dados legados. Verifique com o administrador ou na base de dados
                anterior.
              </p>
            </div>

            <div>
              <strong>Não consigo exportar relatório</strong>
              <p className="mt-1 text-sm text-gray-600">
                Tente acessar com outro navegador. Verifique permissões. Contacte suporte se
                persistir.
              </p>
            </div>

            <div>
              <strong>Preciso acessar dados de outro profissional</strong>
              <p className="mt-1 text-sm text-gray-600">
                Entre em contato com o administrador para adicionar permissões.
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
            href="/docs-tutoriais/profissional/criar-conta-prof"
            className="bg-primary rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Ver Outros Tutoriais →
          </Link>
        </div>
      </div>
    </main>
  )
}
