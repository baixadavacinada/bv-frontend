'use client'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function AdminGerenciarUsuariosPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Gerenciar Usuários" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Gerencie todas as contas de usuários no sistema. Você pode criar, editar, desativar,
          aprovar contas e gerenciar permissões de profissionais e administradores.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Conta de administrador ativa</li>
            <li>Estar conectado ao painel administrativo</li>
            <li>Permissões de gerenciamento de usuários</li>
            <li>Compreender as políticas de acesso da instituição</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Acessar Gerenciamento */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Acessar Painel de Usuários</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Clique em <strong>Painel Administrativo</strong> no menu.
            </li>
            <li>
              <strong>2.</strong> Selecione <strong>Gerenciamento</strong> →{' '}
              <strong>Usuários</strong>.
            </li>
            <li>
              <strong>3.</strong> Você verá a lista de todos os usuários do sistema.
            </li>
          </ol>
        </section>

        {/* Visualizar Usuários */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Visualizar Lista de Usuários</h3>
          <p className="mb-4 text-gray-700">A tabela mostra as seguintes informações:</p>

          <div className="space-y-3 text-gray-700">
            <div>
              <strong>Nome:</strong> Nome completo do usuário
            </div>
            <div>
              <strong>Email:</strong> Email de cadastro
            </div>
            <div>
              <strong>Tipo:</strong> Morador, Profissional ou Administrador
            </div>
            <div>
              <strong>Status:</strong> Ativo, Inativo, Pendente, Suspenso
            </div>
            <div>
              <strong>Data de Cadastro:</strong> Quando se registrou
            </div>
            <div>
              <strong>Ações:</strong> Botões para editar, desativar, remover
            </div>
          </div>
        </section>

        {/* Filtrar e Pesquisar */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Filtrar e Pesquisar Usuários</h3>
          <p className="mb-4 text-gray-700">Use os filtros para encontrar usuários específicos:</p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Pesquisa por Nome/Email</strong>
              <p className="mt-1 text-sm text-gray-600">
                Digite no campo de busca para filtrar em tempo real.
              </p>
            </div>

            <div>
              <strong>Filtro por Tipo</strong>
              <p className="mt-1 text-sm text-gray-600">
                Morador, Profissional de Saúde ou Administrador.
              </p>
            </div>

            <div>
              <strong>Filtro por Status</strong>
              <p className="mt-1 text-sm text-gray-600">Ativo, Inativo, Pendente, Suspenso.</p>
            </div>

            <div>
              <strong>Filtro por Data de Cadastro</strong>
              <p className="mt-1 text-sm text-gray-600">
                Últimos 7 dias, últimos 30 dias, últimos 6 meses, etc.
              </p>
            </div>

            <div>
              <strong>Filtro por UBS</strong>
              <p className="mt-1 text-sm text-gray-600">
                Para profissionais, filtrar por UBS de origem.
              </p>
            </div>
          </div>
        </section>

        {/* Criar Usuário */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Criar Novo Usuário Manualmente</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Clique em <strong>+ Novo Usuário</strong>.
            </li>
            <li>
              <strong>2.</strong> Selecione o tipo: <strong>Morador</strong>,{' '}
              <strong>Profissional</strong> ou <strong>Administrador</strong>.
            </li>
            <li>
              <strong>3.</strong> Preencha os dados obrigatórios:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Nome completo</li>
                <li>• Email</li>
                <li>• Telefone</li>
                <li>• Data de nascimento</li>
              </ul>
            </li>
            <li>
              <strong>4.</strong> Para profissionais, adicione dados profissionais (CRM, etc).
            </li>
            <li>
              <strong>5.</strong> Clique em <strong>Criar Usuário</strong>.
            </li>
            <li>
              <strong>6.</strong> Um email de boas-vindas será enviado com link de ativação.
            </li>
          </ol>
        </section>

        {/* Editar Usuário */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Editar Informações de Usuário</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na lista, clique no usuário ou no ícone <strong>editar</strong>
              (lápis).
            </li>
            <li>
              <strong>2.</strong> A página de edição será aberta.
            </li>
            <li>
              <strong>3.</strong> Faça as alterações necessárias.
            </li>
            <li>
              <strong>4.</strong> Clique em <strong>Salvar Alterações</strong>.
            </li>
          </ol>

          <p className="mt-4 text-gray-700">
            <strong>Você pode editar:</strong>
          </p>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>• Nome, email, telefone</li>
            <li>• Dados profissionais (para profissionais)</li>
            <li>• UBS associada</li>
            <li>• Permissões (para profissionais/admin)</li>
            <li>• Status (Ativo/Inativo)</li>
          </ul>
        </section>

        {/* Aprovar Profissionais */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Aprovar Profissionais Pendentes</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Filtre por <strong>Tipo: Profissional</strong> e{' '}
              <strong>Status: Pendente</strong>.
            </li>
            <li>
              <strong>2.</strong> Revise os dados (CRM, UBS, etc).
            </li>
            <li>
              <strong>3.</strong> Você pode <strong>Aprovar</strong>, <strong>Rejeitar</strong> ou{' '}
              <strong>Solicitar Mais Informações</strong>.
            </li>
            <li>
              <strong>4.</strong> Se aprovado, o profissional receberá um email de confirmação.
            </li>
            <li>
              <strong>5.</strong> Se rejeitado, inclua uma razão que será comunicada.
            </li>
          </ol>
        </section>

        {/* Mudar Status */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Alterar Status de Usuário</h3>
          <p className="mb-4 text-gray-700">Os status disponíveis são:</p>

          <div className="space-y-3 text-gray-700">
            <div>
              <strong>Ativo:</strong> Usuário pode fazer login e usar a plataforma
            </div>
            <div>
              <strong>Inativo:</strong> Conta existe mas sem permissão de login
            </div>
            <div>
              <strong>Suspenso:</strong> Conta bloqueada por violação de termos
            </div>
            <div>
              <strong>Deletado:</strong> Permanentemente removido (dados podem ser preservados)
            </div>
          </div>

          <ol className="mt-4 space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Abra o usuário.
            </li>
            <li>
              <strong>2.</strong> No campo <strong>Status</strong>, selecione o novo status.
            </li>
            <li>
              <strong>3.</strong> Se suspenso, adicione motivo.
            </li>
            <li>
              <strong>4.</strong> Clique em <strong>Salvar</strong>.
            </li>
          </ol>
        </section>

        {/* Resetar Senha */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Resetar Senha de Usuário</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Abra a página do usuário.
            </li>
            <li>
              <strong>2.</strong> Clique em <strong>Resetar Senha</strong>.
            </li>
            <li>
              <strong>3.</strong> Um email será enviado ao usuário com link de reset.
            </li>
            <li>
              <strong>4.</strong> O usuário terá 24 horas para redefinir sua senha.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Nota:</strong> O usuário é notificado via email. Se não receber, verifique
              spam.
            </p>
          </div>
        </section>

        {/* Exportar */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Exportar Lista de Usuários</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Use filtros para selecionar os usuários desejados.
            </li>
            <li>
              <strong>2.</strong> Clique em <strong>Exportar</strong> no canto superior.
            </li>
            <li>
              <strong>3.</strong> Escolha formato: <strong>CSV</strong> ou <strong>Excel</strong>.
            </li>
            <li>
              <strong>4.</strong> O arquivo será baixado.
            </li>
          </ol>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Boas Práticas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Boas Práticas de Segurança</h3>

          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>Verificação Rigorosa:</strong> Sempre verifique dados de profissionais antes
              de aprovar.
            </li>
            <li>
              <strong>Motivos Documentados:</strong> Registre motivos para suspensão ou remoção.
            </li>
            <li>
              <strong>Auditoria:</strong> Monitore acessos de usuários com múltiplas contas.
            </li>
            <li>
              <strong>Confidencialidade:</strong> Nunca compartilhe dados de usuários não
              autorizadamente.
            </li>
            <li>
              <strong>Backup de Dados:</strong> Exporte dados regularmente como backup.
            </li>
          </ul>
        </section>

        {/* Problemas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Se Você Encontrar Problemas</h3>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Usuário não aparece na lista</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique se os filtros estão corretos. O usuário pode estar deletado.
              </p>
            </div>

            <div>
              <strong>Não consigo criar novo usuário</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique se todos os campos obrigatórios estão preenchidos. Confirme o email é
                válido.
              </p>
            </div>

            <div>
              <strong>Mudança de status não foi salva</strong>
              <p className="mt-1 text-sm text-gray-600">
                Certifique-se de clicar em {`"Salvar"`}. Recarregue a página se persistir.
              </p>
            </div>

            <div>
              <strong>Email de reset não chegou</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique spam. O email pode estar registrado incorretamente.
              </p>
            </div>

            <div>
              <strong>Permissão negada</strong>
              <p className="mt-1 text-sm text-gray-600">
                Você pode não ter permissão para essa ação. Contacte um admin supervisor.
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
            href="/docs-tutoriais/admin/gerenciar-ubs"
            className="bg-primary rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Próximo: Gerenciar UBS →
          </Link>
        </div>
      </div>
    </main>
  )
}
