'use client'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function ProfissionalEnviarNotificacaoPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Enviar Notificações aos Usuários" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Comunique-se com os usuários da sua UBS através de notificações segmentadas. Você pode
          enviar alertas sobre campanhas, atualizações e informações importantes de saúde.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Conta de profissional de saúde aprovada</li>
            <li>Estar conectado à plataforma</li>
            <li>Permissão para enviar notificações (concedida na aprovação)</li>
            <li>Mensagem preparada</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Acessar Notificações */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Acessar Seção de Notificações</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> No menu principal, clique em <strong>Notificações</strong> ou
              <strong> Comunicações</strong>.
            </li>
            <li>
              <strong>2.</strong> Selecione <strong>Nova Notificação</strong> ou{' '}
              <strong>Enviar Mensagem</strong>.
            </li>
            <li>
              <strong>3.</strong> Um formulário de redação será aberto.
            </li>
          </ol>
        </section>

        {/* Escolher Tipo */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Escolher Tipo de Notificação</h3>
          <p className="mb-4 text-gray-700">Selecione qual é o tipo de mensagem:</p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Alerta de Campanha</strong>
              <p className="mt-1 text-sm text-gray-600">
                Sobre campanhas de vacinação, testes ou atividades na UBS.
              </p>
            </div>

            <div>
              <strong>Informação de Saúde</strong>
              <p className="mt-1 text-sm text-gray-600">
                Dicas de saúde, prevenção ou educação sanitária.
              </p>
            </div>

            <div>
              <strong>Aviso de Manutenção</strong>
              <p className="mt-1 text-sm text-gray-600">
                Informações sobre horários da UBS, pausas ou alterações de serviço.
              </p>
            </div>

            <div>
              <strong>Lembretes Personalizados</strong>
              <p className="mt-1 text-sm text-gray-600">
                Lembretes direcionados a públicos específicos (ex: falta da 2ª dose).
              </p>
            </div>

            <div>
              <strong>Outro</strong>
              <p className="mt-1 text-sm text-gray-600">
                Mensagens genéricas para comunicação geral.
              </p>
            </div>
          </div>
        </section>

        {/* Segmentar Público */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Escolher Público-Alvo</h3>
          <p className="mb-4 text-gray-700">
            Decida quem receberá a notificação. Você pode ser bem específico:
          </p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Todos os Usuários da UBS</strong>
              <p className="mt-1 text-sm text-gray-600">Envia para todos cadastrados</p>
            </div>

            <div>
              <strong>Por Faixa Etária</strong>
              <p className="mt-1 text-sm text-gray-600">
                Apenas maiores de 60, apenas crianças, etc.
              </p>
            </div>

            <div>
              <strong>Por Status Vacinal</strong>
              <p className="mt-1 text-sm text-gray-600">
                Apenas quem falta dose, apenas em dia, apenas nunca vacinado.
              </p>
            </div>

            <div>
              <strong>Por Vacina Específica</strong>
              <p className="mt-1 text-sm text-gray-600">
                Apenas quem recebeu ou precisa de uma vacina particular.
              </p>
            </div>

            <div>
              <strong>Por Residência</strong>
              <p className="mt-1 text-sm text-gray-600">
                Usuários de um bairro ou região específica.
              </p>
            </div>
          </div>
        </section>

        {/* Redação */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Redigir sua Mensagem</h3>
          <p className="mb-4 text-gray-700">Escreva uma mensagem clara e concisa:</p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Assunto/Título</strong>
              <p className="mt-1 text-sm text-gray-600">
                Máximo 50 caracteres. Exemplo: {`"Campanha de Vacinação Gripe - Sexta!"`}
              </p>
            </div>

            <div>
              <strong>Mensagem</strong>
              <p className="mt-1 text-sm text-gray-600">
                Máximo 300 caracteres para SMS/WhatsApp, até 1000 para email. Seja direto e claro.
              </p>
            </div>

            <div>
              <strong>Link (Opcional)</strong>
              <p className="mt-1 text-sm text-gray-600">
                Pode incluir um link para mais informações (formulário, site, etc).
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Dica:</strong> Teste sua mensagem no preview antes de enviar. Certifique-se de
              que está clara em diferentes tamanhos de tela.
            </p>
          </div>
        </section>

        {/* Agendar */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Agendar Envio</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Escolha <strong>Enviar Agora</strong> ou <strong>Agendar</strong>.
            </li>
            <li>
              <strong>2.</strong> Se agendar, selecione data e hora.
            </li>
            <li>
              <strong>3.</strong> O sistema recomenda horários de maior abertura de mensagens.
            </li>
            <li>
              <strong>4.</strong> Clique em <strong>Confirmar</strong>.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Melhor Prática:</strong> Envie em horários onde usuários estão mais ativos.
              Geralmente entre 8-12h e 18-22h.
            </p>
          </div>
        </section>

        {/* Revisar e Enviar */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Revisar e Enviar</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Revise toda a informação:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Tipo de notificação correto?</li>
                <li>• Público-alvo correto?</li>
                <li>• Mensagem clara e sem erros?</li>
                <li>• Hora e data corretas?</li>
              </ul>
            </li>
            <li>
              <strong>2.</strong> Clique em <strong>Enviar Notificação</strong>.
            </li>
            <li>
              <strong>3.</strong> Uma confirmação será exibida com o número aproximado de
              destinatários.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-green-400 bg-green-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Sucesso!</strong> Sua notificação foi enviada (ou será enviada no horário
              agendado).
            </p>
          </div>
        </section>

        {/* Monitorar */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Monitorar Notificação Enviada</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Volte à seção de <strong>Notificações</strong>.
            </li>
            <li>
              <strong>2.</strong> Clique em <strong>Histórico</strong> ou{' '}
              <strong>Notificações Enviadas</strong>.
            </li>
            <li>
              <strong>3.</strong> Você verá estatísticas da notificação:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Total de destinatários</li>
                <li>• Quantidade de aberturas</li>
                <li>• Cliques em links</li>
                <li>• Taxa de engajamento</li>
              </ul>
            </li>
          </ol>
        </section>

        {/* Editar/Cancelar */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Editar ou Cancelar Notificação</h3>
          <p className="mb-4 text-gray-700">
            Se a notificação foi agendada mas ainda não foi enviada:
          </p>

          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Vá para <strong>Histórico</strong>.
            </li>
            <li>
              <strong>2.</strong> Localize a notificação agendada.
            </li>
            <li>
              <strong>3.</strong> Clique em <strong>Editar</strong> ou <strong>Cancelar</strong>.
            </li>
            <li>
              <strong>4.</strong> Faça as alterações ou confirme o cancelamento.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Atenção:</strong> Se já foi enviada, não pode ser editada ou cancelada.
            </p>
          </div>
        </section>

        {/* Dicas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Dicas Importantes</h3>

          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>Não Envie Muitas:</strong> Limite a 2-3 notificações por semana por público.
            </li>
            <li>
              <strong>Seja Urgente:</strong> Marque como urgente apenas em emergências reais.
            </li>
            <li>
              <strong>Respeite Preferências:</strong> Usuários podem desativar notificações suas.
            </li>
            <li>
              <strong>Use Templates:</strong> Reutilize mensagens bem sucedidas anteriores.
            </li>
            <li>
              <strong>Varie Públicos:</strong> Não envie sempre para os mesmos grupos.
            </li>
            <li>
              <strong>Acompanhe Estatísticas:</strong> Aprenda qual tipo de mensagem funciona
              melhor.
            </li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Problemas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Se Você Encontrar Problemas</h3>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Botão de enviar desativado</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique se preencheu todos os campos obrigatórios (tipo, público-alvo, mensagem).
              </p>
            </div>

            <div>
              <strong>Ninguém recebeu a notificação</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique se o público-alvo foi selecionado corretamente. Verifique o histórico.
              </p>
            </div>

            <div>
              <strong>Mensagem ficou com formatação estranha</strong>
              <p className="mt-1 text-sm text-gray-600">
                Evite caracteres especiais, emojis ou quebras de linha extras.
              </p>
            </div>

            <div>
              <strong>Taxa de abertura muito baixa</strong>
              <p className="mt-1 text-sm text-gray-600">
                Tente alterar o horário de envio ou tornar a mensagem mais relevante/urgente.
              </p>
            </div>

            <div>
              <strong>Usuários reclamando de spam</strong>
              <p className="mt-1 text-sm text-gray-600">
                Reduza a frequência de notificações. Foque apenas em assuntos realmente importantes.
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
            href="/docs-tutoriais/profissional/visualizar-usuarios"
            className="bg-primary rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Próximo: Visualizar Usuários →
          </Link>
        </div>
      </div>
    </main>
  )
}
