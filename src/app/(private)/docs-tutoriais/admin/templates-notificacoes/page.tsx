'use client'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function AdminTemplatesNotificacoesPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Gerenciar Templates de Notificações" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Crie e gerencie templates (modelos) reutilizáveis de notificações. Templates permitem
          comunicação consistente e economizam tempo ao enviar mensagens frequentes.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Conta de administrador ativa</li>
            <li>Conteúdo para os templates</li>
            <li>Compreender padrões de comunicação da instituição</li>
            <li>Acesso a gerenciamento de notificações</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Acessar Templates */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Acessar Gerenciamento de Templates
          </h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Clique em <strong>Painel Administrativo</strong>.
            </li>
            <li>
              <strong>2.</strong> Selecione <strong>Comunicação</strong> →{' '}
              <strong>Templates de Notificação</strong>.
            </li>
            <li>
              <strong>3.</strong> Você verá lista de templates existentes.
            </li>
          </ol>
        </section>

        {/* Visualizar Templates */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Visualizar Templates Existentes</h3>
          <p className="mb-4 text-gray-700">A tabela mostra informações:</p>

          <div className="space-y-3 text-gray-700">
            <div>
              <strong>Nome:</strong> Identificação do template
            </div>
            <div>
              <strong>Tipo:</strong> Campanha, Lembretes, Sistema, etc
            </div>
            <div>
              <strong>Público:</strong> Para quem é o template
            </div>
            <div>
              <strong>Ativo:</strong> Se está sendo usado
            </div>
            <div>
              <strong>Criado em:</strong> Data de criação
            </div>
            <div>
              <strong>Ações:</strong> Editar, usar, duplicar, deletar
            </div>
          </div>
        </section>

        {/* Criar Template */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Criar Novo Template</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Clique em <strong>+ Novo Template</strong>.
            </li>
            <li>
              <strong>2.</strong> Defina as informações básicas:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>
                  • <strong>Nome:</strong> Identificação clara (ex: &quot;Campanha Gripe 2024&quot;)
                </li>
                <li>
                  • <strong>Tipo:</strong> Selecione entre opções predefinidas
                </li>
                <li>
                  • <strong>Descrição:</strong> Para que serve o template
                </li>
                <li>
                  • <strong>Público-Alvo:</strong> Para qual grupo
                </li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> Redija a mensagem:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>
                  • <strong>Assunto/Título:</strong> Para emails e notificações
                </li>
                <li>
                  • <strong>Corpo da Mensagem:</strong> Conteúdo principal
                </li>
                <li>
                  • <strong>Link de Ação:</strong> URL (opcional)
                </li>
              </ul>
            </li>
            <li>
              <strong>4.</strong> Adicione variáveis dinâmicas:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>{`• {{nome_usuario}} - Nome da pessoa`}</li>
                <li>{`• {{data_vacina}} - Data da próxima dose`}</li>
                <li>{`• {{nome_ubs}} - Nome da UBS`}</li>
              </ul>
            </li>
            <li>
              <strong>5.</strong> Configure canais:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Email</li>
                <li>• WhatsApp</li>
                <li>• SMS</li>
              </ul>
            </li>
            <li>
              <strong>6.</strong> Clique em <strong>Criar Template</strong>.
            </li>
          </ol>
        </section>

        {/* Tipos de Template */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Tipos de Template Disponíveis</h3>
          <p className="mb-4 text-gray-700">Escolha o tipo que melhor se aplica:</p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Campanha de Vacinação</strong>
              <p className="mt-1 text-sm text-gray-600">
                Para informar sobre campanhas e períodos vacinais.
              </p>
            </div>

            <div>
              <strong>Lembretes de Vacinação</strong>
              <p className="mt-1 text-sm text-gray-600">
                Lembrar usuários de doses pendentes ou próximas.
              </p>
            </div>

            <div>
              <strong>Notificação de Resultado</strong>
              <p className="mt-1 text-sm text-gray-600">
                Informar resultados de testes ou verificações.
              </p>
            </div>

            <div>
              <strong>Boas-vindas</strong>
              <p className="mt-1 text-sm text-gray-600">Para novos usuários na plataforma.</p>
            </div>

            <div>
              <strong>Aviso do Sistema</strong>
              <p className="mt-1 text-sm text-gray-600">
                Manutenções, atualizações, mudanças de política.
              </p>
            </div>

            <div>
              <strong>Educação em Saúde</strong>
              <p className="mt-1 text-sm text-gray-600">Dicas, orientações e conteúdo educativo.</p>
            </div>

            <div>
              <strong>Personalizado</strong>
              <p className="mt-1 text-sm text-gray-600">
                Template customizado para necessidade específica.
              </p>
            </div>
          </div>
        </section>

        {/* Editar Template */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Editar Template Existente</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na lista, clique no template ou no ícone <strong>editar</strong>.
            </li>
            <li>
              <strong>2.</strong> A página de edição será aberta.
            </li>
            <li>
              <strong>3.</strong> Modifique o conteúdo necessário.
            </li>
            <li>
              <strong>4.</strong> Clique em <strong>Salvar Alterações</strong>.
            </li>
            <li>
              <strong>5.</strong> Mudanças aplicarão aos próximos envios.
            </li>
          </ol>
        </section>

        {/* Visualizar Prévia */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Visualizar Prévia do Template</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Ao editar um template, clique em <strong>Prévia</strong>.
            </li>
            <li>
              <strong>2.</strong> Você verá como a mensagem aparecerá:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• No email</li>
                <li>• No WhatsApp</li>
                <li>• No SMS</li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> As variáveis serão substituídas pelos dados de exemplo.
            </li>
            <li>
              <strong>4.</strong> Verifique se tudo está correto.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Dica:</strong> Sempre visualize antes de publicar um novo template.
            </p>
          </div>
        </section>

        {/* Variáveis Dinâmicas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Usar Variáveis Dinâmicas</h3>
          <p className="mb-4 text-gray-700">
            Insira variáveis que serão preenchidas automaticamente para cada usuário:
          </p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Dados Pessoais:</strong>
              <p className="mt-1 text-sm text-gray-600">
                {`{{nome_usuario}}, {{email}}, {{telefone}}, {{idade}}`}
              </p>
            </div>

            <div>
              <strong>Vacinação:</strong>
              <p className="mt-1 text-sm text-gray-600">
                {`{{proxima_vacina}}, {{data_proxima_dose}}, {{doses_faltando}}`}
              </p>
            </div>

            <div>
              <strong>UBS:</strong>
              <p className="mt-1 text-sm text-gray-600">
                {`{{nome_ubs}}, {{endereco_ubs}}, {{telefone_ubs}}`}
              </p>
            </div>

            <div>
              <strong>Sistema:</strong>
              <p className="mt-1 text-sm text-gray-600">
                {`{{data_hoje}}, {{ano_atual}}, {{horario}}`}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border-l-4 border-green-400 bg-green-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Exemplo:</strong>{' '}
              {`"Olá {{nome_usuario}}, você tem a {{proxima_vacina}} agendada para {{data_proxima_dose}} em {{nome_ubs}}"`}
            </p>
          </div>
        </section>

        {/* Duplicar Template */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Duplicar Template</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na lista de templates, clique no ícone <strong>duplicar</strong>
              (copiar).
            </li>
            <li>
              <strong>2.</strong> Uma cópia será criada com nome {`"Cópia de [nome]"`}.
            </li>
            <li>
              <strong>3.</strong> Edite o novo template conforme necessário.
            </li>
            <li>
              <strong>4.</strong> Salve as mudanças.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Dica:</strong> Duplicar é útil para criar variações de templates similares.
            </p>
          </div>
        </section>

        {/* Ativar/Desativar */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Ativar ou Desativar Template</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na lista, localize o template.
            </li>
            <li>
              <strong>2.</strong> Clique em <strong>Ativar</strong> ou <strong>Desativar</strong>.
            </li>
            <li>
              <strong>3.</strong> Templates desativados não aparecem para usuários.
            </li>
            <li>
              <strong>4.</strong> Você pode reativar depois se necessário.
            </li>
          </ol>
        </section>

        {/* Usar Template */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Usar Template para Enviar Notificação
          </h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Vá para <strong>Painel Administrativo</strong> →{' '}
              <strong>Comunicação</strong> → <strong>Enviar Notificação</strong>.
            </li>
            <li>
              <strong>2.</strong> Clique em <strong>Usar Template</strong>.
            </li>
            <li>
              <strong>3.</strong> Selecione o template desejado na lista.
            </li>
            <li>
              <strong>4.</strong> A mensagem será preenchida automaticamente.
            </li>
            <li>
              <strong>5.</strong> Configure o público-alvo e horário.
            </li>
            <li>
              <strong>6.</strong> Envie a notificação.
            </li>
          </ol>
        </section>

        {/* Histórico de Uso */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Ver Histórico de Uso do Template</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Clique no template.
            </li>
            <li>
              <strong>2.</strong> Vá para a aba <strong>Histórico de Uso</strong>.
            </li>
            <li>
              <strong>3.</strong> Você verá:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Quando foi utilizado</li>
                <li>• Quantas notificações foram enviadas</li>
                <li>• Taxa de abertura/cliques</li>
                <li>• Feedback dos usuários</li>
              </ul>
            </li>
          </ol>
        </section>

        {/* Deletar */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Deletar Template</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na lista, clique no ícone <strong>lixeira</strong>.
            </li>
            <li>
              <strong>2.</strong> Confirme a exclusão.
            </li>
            <li>
              <strong>3.</strong> O template será permanentemente removido.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Aviso:</strong> A exclusão é permanente. Não poderá ser recuperado.
            </p>
          </div>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Problemas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Se Você Encontrar Problemas</h3>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Variáveis não são substituídas</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique o formato: deve ser {`{{variavel}}`} com chaves duplas.
              </p>
            </div>

            <div>
              <strong>Template não aparece ao enviar notificação</strong>
              <p className="mt-1 text-sm text-gray-600">
                Certifique-se de que o template está <strong>Ativo</strong>.
              </p>
            </div>

            <div>
              <strong>Prévia mostra dados errados</strong>
              <p className="mt-1 text-sm text-gray-600">
                Use dados de exemplo válidos. Verifique as variáveis.
              </p>
            </div>

            <div>
              <strong>Não posso editar template em uso</strong>
              <p className="mt-1 text-sm text-gray-600">
                Duplicar o template e crie uma nova versão. Desative o antigo depois.
              </p>
            </div>

            <div>
              <strong>Mudanças no template não foram salvas</strong>
              <p className="mt-1 text-sm text-gray-600">
                Certifique-se de clicar em {`"Salvar Alterações"`}.
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
            href="/docs-tutoriais/admin/criar-conta-admin"
            className="bg-primary rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Ver Outros Tutoriais →
          </Link>
        </div>
      </div>
    </main>
  )
}
