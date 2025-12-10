'use client'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function AdminConfiguracoesSistemaPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Configurações do Sistema" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Administre configurações globais do sistema. Você pode definir políticas, personalizar
          aparência, configurar integrações e gerenciar segurança.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Conta de administrador ativa</li>
            <li>Acesso ao painel de configurações</li>
            <li>Conhecimento de políticas institucionais</li>
            <li>Permissão para mudanças de sistema</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Acessar Configurações */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Acessar Configurações Globais</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Clique em <strong>Painel Administrativo</strong>.
            </li>
            <li>
              <strong>2.</strong> Selecione <strong>Configurações</strong> →{' '}
              <strong>Sistema</strong>.
            </li>
            <li>
              <strong>3.</strong> Você verá menu com várias categorias de configuração.
            </li>
          </ol>
        </section>

        {/* Configurações Gerais */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Configurações Gerais</h3>
          <p className="mb-4 text-gray-700">Defina parâmetros básicos do sistema:</p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Nome da Plataforma</strong>
              <p className="mt-1 text-sm text-gray-600">
                Como a plataforma é chamada (ex: Baixada Vacinada)
              </p>
            </div>

            <div>
              <strong>Logo e Marca</strong>
              <p className="mt-1 text-sm text-gray-600">Faça upload do logo de sua instituição</p>
            </div>

            <div>
              <strong>Descrição da Plataforma</strong>
              <p className="mt-1 text-sm text-gray-600">
                Descrição em uma linha que aparece em várias páginas
              </p>
            </div>

            <div>
              <strong>URL de Suporte</strong>
              <p className="mt-1 text-sm text-gray-600">
                Link para página de ajuda ou formulário de contato
              </p>
            </div>

            <div>
              <strong>Email de Contato</strong>
              <p className="mt-1 text-sm text-gray-600">Email para suporte técnico</p>
            </div>

            <div>
              <strong>Telefone de Contato</strong>
              <p className="mt-1 text-sm text-gray-600">Telefone para central de atendimento</p>
            </div>
          </div>
        </section>

        {/* Aparência */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Personalizar Aparência</h3>
          <p className="mb-4 text-gray-700">Customize cores e temas da interface:</p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Cor Primária</strong>
              <p className="mt-1 text-sm text-gray-600">Cor dos botões e elementos principais</p>
            </div>

            <div>
              <strong>Cor Secundária</strong>
              <p className="mt-1 text-sm text-gray-600">Cor de destaque e acentos</p>
            </div>

            <div>
              <strong>Cor de Sucesso</strong>
              <p className="mt-1 text-sm text-gray-600">
                Cor para mensagens positivas (padrão: verde)
              </p>
            </div>

            <div>
              <strong>Cor de Aviso</strong>
              <p className="mt-1 text-sm text-gray-600">Cor para alertas (padrão: amarelo)</p>
            </div>

            <div>
              <strong>Cor de Erro</strong>
              <p className="mt-1 text-sm text-gray-600">Cor para erros (padrão: vermelho)</p>
            </div>

            <div>
              <strong>Tema</strong>
              <p className="mt-1 text-sm text-gray-600">
                Claro, Escuro ou Automático (segue SO do usuário)
              </p>
            </div>

            <div>
              <strong>Fonte Padrão</strong>
              <p className="mt-1 text-sm text-gray-600">Tipografia utilizada na interface</p>
            </div>
          </div>
        </section>

        {/* Política */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Definir Políticas de Uso</h3>
          <p className="mb-4 text-gray-700">Configure políticas que os usuários devem aceitar:</p>

          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Clique em <strong>Configurações</strong> →{' '}
              <strong>Políticas</strong>.
            </li>
            <li>
              <strong>2.</strong> Edite cada política (podem ser em Markdown):
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Termos de Serviço</li>
                <li>• Política de Privacidade</li>
                <li>• Código de Conduta</li>
                <li>• Aviso de Segurança</li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> Clique em <strong>Salvar Política</strong>.
            </li>
            <li>
              <strong>4.</strong> Escolha se é obrigatório aceitar ou apenas ler.
            </li>
            <li>
              <strong>5.</strong> Usuários novos verão ao se registrar.
            </li>
          </ol>
        </section>

        {/* Email */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Configurar Email</h3>
          <p className="mb-4 text-gray-700">Configure sistema de envio de email:</p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>1. Provedor de Email</strong>
              <p className="mt-1 text-sm text-gray-600">
                Selecione: SMTP, SendGrid, Mailgun, AWS SES, etc
              </p>
            </div>

            <div>
              <strong>2. Credenciais</strong>
              <p className="mt-1 text-sm text-gray-600">
                Insira API key ou credenciais SMTP de seu provedor
              </p>
            </div>

            <div>
              <strong>3. Email de Origem</strong>
              <p className="mt-1 text-sm text-gray-600">Email que aparecerá como remetente</p>
            </div>

            <div>
              <strong>4. Teste de Envio</strong>
              <p className="mt-1 text-sm text-gray-600">
                Clique em {`"Testar Email"`} para confirmar funcionamento
              </p>
            </div>

            <div>
              <strong>5. Salvar</strong>
              <p className="mt-1 text-sm text-gray-600">
                Clique em {`"Salvar Configuração de Email"`}
              </p>
            </div>
          </div>
        </section>

        {/* SMS/WhatsApp */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Configurar SMS e WhatsApp</h3>
          <p className="mb-4 text-gray-700">Configure notificações via celular:</p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>1. Provedor SMS</strong>
              <p className="mt-1 text-sm text-gray-600">Twilio, AWS SNS, TotalVoice, etc</p>
            </div>

            <div>
              <strong>2. Provedor WhatsApp</strong>
              <p className="mt-1 text-sm text-gray-600">Twilio Business, Meta, Green-API, etc</p>
            </div>

            <div>
              <strong>3. Número de Origem</strong>
              <p className="mt-1 text-sm text-gray-600">Número de telefone que será exibido</p>
            </div>

            <div>
              <strong>4. Credenciais</strong>
              <p className="mt-1 text-sm text-gray-600">API keys e tokens do seu provedor</p>
            </div>

            <div>
              <strong>5. Teste</strong>
              <p className="mt-1 text-sm text-gray-600">Envie mensagem de teste para seu número</p>
            </div>
          </div>
        </section>

        {/* Segurança */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Configurações de Segurança</h3>
          <p className="mb-4 text-gray-700">Defina políticas de segurança do sistema:</p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Autenticação em Duas Etapas</strong>
              <p className="mt-1 text-sm text-gray-600">Obrigatória para admin: Sim/Não</p>
            </div>

            <div>
              <strong>Senha Mínima</strong>
              <p className="mt-1 text-sm text-gray-600">Comprimento e requisitos de complexidade</p>
            </div>

            <div>
              <strong>Expiração de Sessão</strong>
              <p className="mt-1 text-sm text-gray-600">
                Minutos de inatividade até logout automático
              </p>
            </div>

            <div>
              <strong>HTTPS Obrigatório</strong>
              <p className="mt-1 text-sm text-gray-600">Forçar conexão criptografada</p>
            </div>

            <div>
              <strong>IP Whitelist</strong>
              <p className="mt-1 text-sm text-gray-600">
                Permitir acesso apenas de IPs específicos (opcional)
              </p>
            </div>

            <div>
              <strong>Limite de Tentativas de Login</strong>
              <p className="mt-1 text-sm text-gray-600">Máximo de tentativas antes de bloquear</p>
            </div>
          </div>
        </section>

        {/* Backup */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Configurar Backup Automático</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Vá para <strong>Configurações</strong> → <strong>Backup</strong>.
            </li>
            <li>
              <strong>2.</strong> Escolha frequência de backup:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Diário</li>
                <li>• Semanal</li>
                <li>• Mensal</li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> Escolha horário preferencial (melhor fora do pico).
            </li>
            <li>
              <strong>4.</strong> Defina retenção de backups (ex: últimos 30 dias).
            </li>
            <li>
              <strong>5.</strong> Escolha armazenamento (cloud, servidor local, etc).
            </li>
            <li>
              <strong>6.</strong> Clique em <strong>Ativar Backup</strong>.
            </li>
          </ol>
        </section>

        {/* Integrações */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Gerenciar Integrações</h3>
          <p className="mb-4 text-gray-700">Configure conexões com sistemas externos:</p>

          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Vá para <strong>Configurações</strong> →{' '}
              <strong>Integrações</strong>.
            </li>
            <li>
              <strong>2.</strong> Clique em <strong>+ Adicionar Integração</strong>.
            </li>
            <li>
              <strong>3.</strong> Selecione sistema:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Sistema de saúde municipal</li>
                <li>• Google Maps (para geolocalização)</li>
                <li>• Redes sociais (para login)</li>
                <li>• CRM ou ERP</li>
              </ul>
            </li>
            <li>
              <strong>4.</strong> Insira credenciais ou tokens.
            </li>
            <li>
              <strong>5.</strong> Teste a conexão.
            </li>
            <li>
              <strong>6.</strong> Salve a integração.
            </li>
          </ol>
        </section>

        {/* Manutenção */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Modo de Manutenção</h3>
          <p className="mb-4 text-gray-700">Coloque o sistema em manutenção:</p>

          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Vá para <strong>Configurações</strong> →{' '}
              <strong>Manutenção</strong>.
            </li>
            <li>
              <strong>2.</strong> Clique em <strong>Ativar Modo de Manutenção</strong>.
            </li>
            <li>
              <strong>3.</strong> Customize mensagem aos usuários.
            </li>
            <li>
              <strong>4.</strong> Você pode ainda acessar como admin.
            </li>
            <li>
              <strong>5.</strong> Configure horário de término (opcional).
            </li>
            <li>
              <strong>6.</strong> Quando terminar, clique em <strong>Desativar</strong>.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Uso:</strong> Use durante atualizações ou grandes mudanças.
            </p>
          </div>
        </section>

        {/* Logs */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Visualizar Logs do Sistema</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Vá para <strong>Configurações</strong> → <strong>Logs</strong>.
            </li>
            <li>
              <strong>2.</strong> Você verá logs de:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Acessos (logins, logouts)</li>
                <li>• Erros e exceções</li>
                <li>• Mudanças no sistema</li>
                <li>• Operações sensíveis</li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> Use filtros para buscar eventos específicos.
            </li>
            <li>
              <strong>4.</strong> Exporte logs para análise.
            </li>
          </ol>
        </section>

        {/* Limpeza */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Limpeza e Otimização de Dados</h3>
          <p className="mb-4 text-gray-700">Mantenha o sistema otimizado:</p>

          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Vá para <strong>Configurações</strong> →{' '}
              <strong>Manutenção</strong>.
            </li>
            <li>
              <strong>2.</strong> Clique em <strong>Otimizar Banco de Dados</strong>.
            </li>
            <li>
              <strong>3.</strong> Limpe dados antigos:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Logs antigos (mais de X meses)</li>
                <li>• Sessões expiradas</li>
                <li>• Cache temporário</li>
              </ul>
            </li>
            <li>
              <strong>4.</strong> Clique em {`"Executar Limpeza"`}.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Aviso:</strong> Faça backup antes de limpar dados. Esta ação é irreversível.
            </p>
          </div>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Problemas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Se Você Encontrar Problemas</h3>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Mudanças de configuração não foram salvas</strong>
              <p className="mt-1 text-sm text-gray-600">
                Certifique-se de clicar em {`"Salvar Configurações"`}.
              </p>
            </div>

            <div>
              <strong>Email não está funcionando</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique credenciais do SMTP. Teste novamente. Verifique logs de erro.
              </p>
            </div>

            <div>
              <strong>SMS/WhatsApp não funciona</strong>
              <p className="mt-1 text-sm text-gray-600">
                Confirme API keys. Verifique saldo na conta do provedor.
              </p>
            </div>

            <div>
              <strong>Backup não está rodando</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique frequência e armazenamento. Confirme permissões de acesso.
              </p>
            </div>

            <div>
              <strong>Não consigo desativar modo de manutenção</strong>
              <p className="mt-1 text-sm text-gray-600">
                Tente fazer login novamente. Reinicie o navegador.
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
            Ver Todos os Tutoriais de Admin →
          </Link>
        </div>
      </div>
    </main>
  )
}
