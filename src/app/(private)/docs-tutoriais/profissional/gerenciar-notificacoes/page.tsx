'use client'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function ProfissionalGerenciarNotificacoesPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Gerenciar Notificações" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Configure como você recebe notificações na plataforma. Você pode personalizar os canais,
          frequência e tipos de mensagens que deseja receber.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Sua conta de profissional criada e aprovada</li>
            <li>Estar conectado à plataforma</li>
            <li>Acesso à sua área de configurações</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Acessar Configurações */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Acessar Configurações de Notificações
          </h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Clique no ícone de perfil (sua foto ou inicial) no canto superior
              direito.
            </li>
            <li>
              <strong>2.</strong> Selecione <strong>Configurações</strong>.
            </li>
            <li>
              <strong>3.</strong> No menu lateral, clique em <strong>Notificações</strong>.
            </li>
            <li>
              <strong>4.</strong> Você verá todas as opções de configuração.
            </li>
          </ol>
        </section>

        {/* Tipos de Notificação */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Tipos de Notificação</h3>
          <p className="mb-4 text-gray-700">Você pode ativar ou desativar cada tipo:</p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Notificações de Campanhas</strong>
              <p className="mt-1 text-sm text-gray-600">
                Receba alertas sobre campanhas de vacinação ativas em sua UBS.
              </p>
            </div>

            <div>
              <strong>Notificações de Mensagens</strong>
              <p className="mt-1 text-sm text-gray-600">
                Notificações quando usuários enviam você mensagens privadas.
              </p>
            </div>

            <div>
              <strong>Notificações de Relatórios</strong>
              <p className="mt-1 text-sm text-gray-600">
                Alertas quando seus relatórios estão prontos para download.
              </p>
            </div>

            <div>
              <strong>Notificações do Sistema</strong>
              <p className="mt-1 text-sm text-gray-600">
                Atualizações importantes sobre a plataforma e manutenções.
              </p>
            </div>

            <div>
              <strong>Notificações de Eventos</strong>
              <p className="mt-1 text-sm text-gray-600">
                Lembretes de eventos de saúde na sua comunidade.
              </p>
            </div>
          </div>
        </section>

        {/* Canais de Notificação */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Escolher Canais de Notificação</h3>
          <p className="mb-4 text-gray-700">
            Selecione por quais canais deseja receber notificações:
          </p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Email</strong>
              <p className="mt-1 text-sm text-gray-600">
                Receba notificações em seu email profissional.
              </p>
              <p className="mt-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4" defaultChecked />
                  <span>Ativar notificações por email</span>
                </label>
              </p>
            </div>

            <div>
              <strong>WhatsApp</strong>
              <p className="mt-1 text-sm text-gray-600">
                Receba notificações via WhatsApp (será usado o número validado).
              </p>
              <p className="mt-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4" defaultChecked />
                  <span>Ativar notificações por WhatsApp</span>
                </label>
              </p>
            </div>

            <div>
              <strong>Notificações no Navegador</strong>
              <p className="mt-1 text-sm text-gray-600">
                Receba pop-ups enquanto usar a plataforma.
              </p>
              <p className="mt-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>Ativar notificações do navegador</span>
                </label>
              </p>
            </div>
          </div>
        </section>

        {/* Frequência */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Definir Frequência de Notificações
          </h3>
          <p className="mb-4 text-gray-700">Escolha com que frequência deseja ser notificado:</p>

          <div className="space-y-3 text-gray-700">
            <label className="flex items-center gap-3">
              <input type="radio" name="frequency" value="immediate" defaultChecked />
              <span>
                <strong>Imediato:</strong> Receba assim que algo acontecer
              </span>
            </label>

            <label className="flex items-center gap-3">
              <input type="radio" name="frequency" value="hourly" />
              <span>
                <strong>A Cada Hora:</strong> Resumo agrupado de notificações
              </span>
            </label>

            <label className="flex items-center gap-3">
              <input type="radio" name="frequency" value="daily" />
              <span>
                <strong>Diariamente:</strong> Um resumo ao final do dia
              </span>
            </label>

            <label className="flex items-center gap-3">
              <input type="radio" name="frequency" value="weekly" />
              <span>
                <strong>Semanalmente:</strong> Resumo no fim de semana
              </span>
            </label>
          </div>
        </section>

        {/* Horário Silencioso */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Configurar Horário Silencioso</h3>
          <p className="mb-4 text-gray-700">
            Defina um período do dia em que não deseja receber notificações:
          </p>

          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Marque a caixa <strong>Ativar Horário Silencioso</strong>.
            </li>
            <li>
              <strong>2.</strong> Clique no campo <strong>Horário de Início</strong> e selecione a
              hora.
            </li>
            <li>
              <strong>3.</strong> Clique no campo <strong>Horário de Término</strong> e selecione a
              hora.
            </li>
            <li>
              <strong>4.</strong> Exemplo: de 22:00 às 08:00 (noite toda).
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Dica:</strong> Configure o horário silencioso para evitar notificações durante
              o período de descanso.
            </p>
          </div>
        </section>

        {/* Notificações por Tipo */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Configurações Específicas por Tipo
          </h3>
          <p className="mb-4 text-gray-700">
            Você também pode personalizar cada tipo de notificação:
          </p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Campanhas</strong>
              <p className="mt-1 text-sm text-gray-600">
                Escolha receber apenas de campanhas específicas ou todas as ativas.
              </p>
            </div>

            <div>
              <strong>Mensagens</strong>
              <p className="mt-1 text-sm text-gray-600">
                Selecione se quer ser notificado de mensagens de usuários específicos.
              </p>
            </div>

            <div>
              <strong>Relatórios</strong>
              <p className="mt-1 text-sm text-gray-600">
                Escolha se quer ser notificado quando cada tipo de relatório estiver pronto.
              </p>
            </div>
          </div>
        </section>

        {/* Salvar Configurações */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Salvar suas Configurações</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Após fazer todas as alterações, procure pelo botão{' '}
              <strong>Salvar Configurações</strong>.
            </li>
            <li>
              <strong>2.</strong> Clique nele.
            </li>
            <li>
              <strong>3.</strong> Uma mensagem de sucesso aparecerá confirmando as alterações.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-green-400 bg-green-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Pronto!</strong> Suas preferências de notificação foram salvas.
            </p>
          </div>
        </section>

        {/* Perguntas Frequentes */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Dúvidas Frequentes</h3>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Posso receber notificações de apenas algumas UBS?</strong>
              <p className="mt-1 text-sm text-gray-600">
                Sim. Você pode configurar para receber notificações apenas da sua UBS de trabalho ou
                de todas as UBS.
              </p>
            </div>

            <div>
              <strong>Posso desativar todas as notificações?</strong>
              <p className="mt-1 text-sm text-gray-600">
                Sim, mas não é recomendado. Você pode desmarcar todos os tipos. Notificações de
                sistema sempre podem ser reativadas.
              </p>
            </div>

            <div>
              <strong>Posso mudar as configurações a qualquer hora?</strong>
              <p className="mt-1 text-sm text-gray-600">
                Sim! As mudanças entram em vigor imediatamente.
              </p>
            </div>

            <div>
              <strong>E se eu não receber uma notificação importante?</strong>
              <p className="mt-1 text-sm text-gray-600">
                Você pode verificar o histórico de notificações na página de Notificações. Clique em{' '}
                {`"Ver Histórico"`}.
              </p>
            </div>
          </div>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Problemas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Se Você Encontrar Problemas</h3>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Não recebo notificações no WhatsApp</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique se o WhatsApp está validado. Volte às configurações de perfil.
              </p>
            </div>

            <div>
              <strong>Notificações foram para spam no email</strong>
              <p className="mt-1 text-sm text-gray-600">
                Marque os emails da plataforma como não spam para mantê-los na caixa de entrada.
              </p>
            </div>

            <div>
              <strong>Muitas notificações simultâneas</strong>
              <p className="mt-1 text-sm text-gray-600">
                Aumente a frequência para {`"Diariamente"`} ou {`"Semanalmente"`}.
              </p>
            </div>

            <div>
              <strong>Alterações não foram salvas</strong>
              <p className="mt-1 text-sm text-gray-600">
                Certifique-se de clicar em {`"Salvar Configurações"`}. Recarregue a página se
                necessário.
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
            href="/docs-tutoriais/profissional/enviar-notificacao"
            className="bg-primary rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Próximo: Enviar Notificações →
          </Link>
        </div>
      </div>
    </main>
  )
}
