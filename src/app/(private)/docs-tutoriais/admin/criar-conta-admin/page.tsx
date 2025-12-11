'use client'

export const dynamic = 'force-dynamic'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function AdminCriarContaPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Criar Conta de Administrador" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Configure sua conta como administrador da plataforma. Administradores têm acesso completo
          a todas as funcionalidades, configurações e relatórios do sistema.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Ser indicado por um administrador existente</li>
            <li>Email corporativo ou de domínio verificável</li>
            <li>Autorização da diretoria da secretaria de saúde</li>
            <li>Aceitar políticas de segurança e sigilo</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Solicitação */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Solicitar Acesso de Administrador
          </h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Um administrador existente deve entrar no painel
              <strong> Gerenciamento de Usuários</strong>.
            </li>
            <li>
              <strong>2.</strong> Clicar em <strong>Convidar Novo Administrador</strong>.
            </li>
            <li>
              <strong>3.</strong> Fornecer o email corporativo do novo administrador.
            </li>
            <li>
              <strong>4.</strong> Descrever o motivo da concessão de acesso.
            </li>
            <li>
              <strong>5.</strong> Submeter para aprovação da diretoria.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Nota:</strong> O acesso de administrador deve ser aprovado por pelo menos dois
              administradores existentes por razões de segurança.
            </p>
          </div>
        </section>

        {/* Receber Convite */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Receber e Aceitar o Convite</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Você receberá um email com o assunto{' '}
              <strong>Convite de Administrador - Baixada Vacinada</strong>.
            </li>
            <li>
              <strong>2.</strong> Clique no link <strong>Aceitar Convite</strong> no email.
            </li>
            <li>
              <strong>3.</strong> Você será redirecionado para a plataforma.
            </li>
            <li>
              <strong>4.</strong> Clique em <strong>Aceitar Convite</strong> para confirmar.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Validade:</strong> O convite expira em 7 dias. Solicite um novo se expirar.
            </p>
          </div>
        </section>

        {/* Completar Perfil */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Completar seu Perfil</h3>
          <p className="mb-4 text-gray-700">Preencha as informações profissionais:</p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Nome Completo</strong>
              <p className="mt-1 text-sm text-gray-600">Seu nome legal como consta em documentos</p>
            </div>

            <div>
              <strong>Email Corporativo</strong>
              <p className="mt-1 text-sm text-gray-600">Email verificado do órgão de saúde</p>
            </div>

            <div>
              <strong>Telefone Comercial</strong>
              <p className="mt-1 text-sm text-gray-600">
                Para contato urgente (com DDD, ex: 21 3333-4444)
              </p>
            </div>

            <div>
              <strong>Cargo/Função</strong>
              <p className="mt-1 text-sm text-gray-600">
                Ex: Coordenador de TI, Diretor de Epidemiologia, Assessor Técnico
              </p>
            </div>

            <div>
              <strong>Órgão/Departamento</strong>
              <p className="mt-1 text-sm text-gray-600">
                Ex: Secretaria Municipal de Saúde, Centro de Coordenação de Campanhas
              </p>
            </div>

            <div>
              <strong>Telefone de Emergência</strong>
              <p className="mt-1 text-sm text-gray-600">
                Para resetar credenciais em caso de perda de acesso
              </p>
            </div>
          </div>
        </section>

        {/* Definir Senha */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Definir Senha Forte</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> No formulário, clique em <strong>Definir Senha</strong>.
            </li>
            <li>
              <strong>2.</strong> Crie uma senha com requisitos mínimos:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Mínimo 12 caracteres</li>
                <li>• Pelo menos uma letra maiúscula</li>
                <li>• Pelo menos um número</li>
                <li>• Pelo menos um caractere especial (!@#$%^&*)</li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> Exemplo válido: {`Admin@2024!Saude123`}
            </li>
            <li>
              <strong>4.</strong> Confirme a senha no segundo campo.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Segurança:</strong> Use uma senha única que não utilize em outros sistemas.
              Guarde-a com segurança.
            </p>
          </div>
        </section>

        {/* Autenticação em Duas Etapas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Ativar Autenticação em Duas Etapas
          </h3>
          <p className="mb-4 text-gray-700">
            Por segurança, administradores DEVEM usar autenticação em dois fatores:
          </p>

          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na página de segurança, clique em{' '}
              <strong>Ativar Autenticação em Duas Etapas</strong>.
            </li>
            <li>
              <strong>2.</strong> Escolha o método:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>
                  • <strong>Aplicativo Autenticador:</strong> Use Google Authenticator, Authy ou
                  Microsoft Authenticator
                </li>
                <li>
                  • <strong>SMS:</strong> Receba códigos por mensagem de texto
                </li>
                <li>
                  • <strong>Email:</strong> Receba códigos por email
                </li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> Siga as instruções para configurar o método escolhido.
            </li>
            <li>
              <strong>4.</strong> Guarde os códigos de recuperação em local seguro.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-green-400 bg-green-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Recomendação:</strong> Use aplicativo autenticador em vez de SMS para maior
              segurança.
            </p>
          </div>
        </section>

        {/* Aceitar Termos */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Aceitar Políticas de Segurança</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Revise a{' '}
              <strong>Política de Segurança para Administradores</strong>.
            </li>
            <li>
              <strong>2.</strong> Revise o <strong>Termo de Confidencialidade e Sigilo</strong>.
            </li>
            <li>
              <strong>3.</strong> Revise o <strong>Acordo de Responsabilidade Executiva</strong>.
            </li>
            <li>
              <strong>4.</strong> Marque as caixas confirmando leitura e aceitação.
            </li>
            <li>
              <strong>5.</strong> Clique em <strong>Confirmar e Criar Conta</strong>.
            </li>
          </ol>
        </section>

        {/* Aprovação Final */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Aguardar Aprovação Final</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Sua conta está criada mas em estado{' '}
              <strong>Pendente de Ativação</strong>.
            </li>
            <li>
              <strong>2.</strong> Um administrador supervisor precisará ativar sua conta.
            </li>
            <li>
              <strong>3.</strong> Você receberá um email quando for ativado.
            </li>
            <li>
              <strong>4.</strong> A partir daí, você terá acesso completo ao painel administrativo.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-green-400 bg-green-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Pronto!</strong> Você é agora um administrador. Consulte o tutorial{' '}
              <strong>Visão Geral do Painel Administrativo</strong> para conhecer as funções.
            </p>
          </div>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Problemas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Se Você Encontrar Problemas</h3>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Não recebi o convite por email</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique pasta de spam. Solicite reenvio ao administrador que o convidou.
              </p>
            </div>

            <div>
              <strong>O link do convite expirou</strong>
              <p className="mt-1 text-sm text-gray-600">
                Convites expiram em 7 dias. Solicite um novo convite ao administrador.
              </p>
            </div>

            <div>
              <strong>Erro na autenticação em duas etapas</strong>
              <p className="mt-1 text-sm text-gray-600">
                Certifique-se que o horário do seu dispositivo está correto. Tente o código de
                recuperação.
              </p>
            </div>

            <div>
              <strong>Não consigo definir senha</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique se a senha atende aos requisitos. Deve ter 12+ caracteres com letras,
                números e símbolos.
              </p>
            </div>

            <div>
              <strong>Minha conta está desativada</strong>
              <p className="mt-1 text-sm text-gray-600">
                Entre em contato com um administrador supervisor para reativar.
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
            href="/docs-tutoriais/admin/gerenciar-usuarios"
            className="bg-primary rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Próximo: Gerenciar Usuários →
          </Link>
        </div>
      </div>
    </main>
  )
}
