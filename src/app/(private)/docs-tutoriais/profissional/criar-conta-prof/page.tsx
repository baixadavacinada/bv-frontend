'use client'

export const dynamic = 'force-dynamic'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function ProfissionalCriarContaPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Criar Conta de Profissional de Saúde" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Registre-se como profissional de saúde para acessar funcionalidades avançadas, enviar
          notificações aos usuários e gerenciar campanhas de vacinação.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Email profissional válido (preferencialmente do seu estabelecimento)</li>
            <li>Número de Registro Profissional (CRM, COREN, etc)</li>
            <li>Identificação da UBS ou estabelecimento onde trabalha</li>
            <li>Aceitar os termos de uso para profissionais</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Acessar Formulário */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Acessar Formulário de Registro</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na página inicial (sem estar conectado), clique em{' '}
              <strong>Registrar-se</strong>.
            </li>
            <li>
              <strong>2.</strong> Selecione <strong>Profissional de Saúde</strong> como tipo de
              conta.
            </li>
            <li>
              <strong>3.</strong> Clique em <strong>Próximo</strong> para prosseguir.
            </li>
          </ol>
        </section>

        {/* Dados Pessoais */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Preencher Dados Pessoais</h3>
          <p className="mb-4 text-gray-700">Informe suas informações pessoais:</p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Nome Completo</strong>
              <p className="mt-1 text-sm text-gray-600">
                Use seu nome legal. Este será exibido aos usuários.
              </p>
            </div>

            <div>
              <strong>Email Profissional</strong>
              <p className="mt-1 text-sm text-gray-600">
                Preferencialmente um email do seu estabelecimento (ex: nome@ubs.gov.br)
              </p>
            </div>

            <div>
              <strong>Telefone</strong>
              <p className="mt-1 text-sm text-gray-600">
                Use o formato com DDD (ex: (21) 98888-7777)
              </p>
            </div>

            <div>
              <strong>Data de Nascimento</strong>
              <p className="mt-1 text-sm text-gray-600">Clique no campo para selecionar a data</p>
            </div>
          </div>
        </section>

        {/* Dados Profissionais */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Dados Profissionais</h3>
          <p className="mb-4 text-gray-700">Informe suas credenciais profissionais:</p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Número de Registro</strong>
              <p className="mt-1 text-sm text-gray-600">
                CRM para médicos, COREN para enfermeiros, CMAS para assistentes sociais, etc.
              </p>
            </div>

            <div>
              <strong>Tipo de Profissional</strong>
              <p className="mt-1 text-sm text-gray-600">Selecione sua profissão na lista:</p>
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Médico(a)</li>
                <li>• Enfermeiro(a)</li>
                <li>• Técnico de Enfermagem</li>
                <li>• Profissional de Saúde</li>
                <li>• Assistente Social</li>
                <li>• Psicólogo(a)</li>
                <li>• Outro</li>
              </ul>
            </div>

            <div>
              <strong>UBS / Estabelecimento</strong>
              <p className="mt-1 text-sm text-gray-600">
                Busque e selecione o estabelecimento onde você trabalha. Será feita verificação.
              </p>
            </div>
          </div>
        </section>

        {/* Criar Senha */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Criar Senha Segura</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> No campo <strong>Senha</strong>, crie uma senha forte.
            </li>
            <li>
              <strong>2.</strong> A senha deve ter pelo menos 8 caracteres.
            </li>
            <li>
              <strong>3.</strong> Use letras, números e símbolos para maior segurança.
            </li>
            <li>
              <strong>4.</strong> Confirme a senha no campo <strong>Repetir Senha</strong>.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Dica:</strong> Use uma combinação de maiúsculas, minúsculas, números e
              símbolos. Exemplo: {`"Saude@2024!Prof"`}
            </p>
          </div>
        </section>

        {/* Validação de Email */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Validar seu Email</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Após preencher os dados, clique em <strong>Registrar</strong>.
            </li>
            <li>
              <strong>2.</strong> Um email de confirmação será enviado para seu email profissional.
            </li>
            <li>
              <strong>3.</strong> Abra o email e clique no link <strong>Confirmar Email</strong>.
            </li>
            <li>
              <strong>4.</strong> Seu email será validado em segundos.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Nota:</strong> Verifique a pasta de spam se não receber o email em 5 minutos.
            </p>
          </div>
        </section>

        {/* Validação de WhatsApp */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Validar seu WhatsApp</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Após validar o email, será sua vez validar o WhatsApp.
            </li>
            <li>
              <strong>2.</strong> Um código será enviado via WhatsApp para o telefone informado.
            </li>
            <li>
              <strong>3.</strong> Copie o código e cole no campo exibido.
            </li>
            <li>
              <strong>4.</strong> Seu WhatsApp será validado automaticamente.
            </li>
          </ol>
        </section>

        {/* Aprovar Conta */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Aguardar Aprovação</h3>
          <p className="mb-4 text-gray-700">
            Sua conta será verificada por um administrador. Este processo pode levar até 48 horas:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Verificação:</strong> Seus dados profissionais serão validados.
            </li>
            <li>
              <strong>Confirmação:</strong> Será feita confirmação com sua UBS.
            </li>
            <li>
              <strong>Notificação:</strong> Você receberá um email quando sua conta for aprovada.
            </li>
          </ul>
          <div className="mt-4 rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Aguarde:</strong> Pode levar até 48 horas para aprovação. Verifique seu email
              regularmente.
            </p>
          </div>
        </section>

        {/* Aceitar Termos */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Aceitar Termos e Políticas</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Leia os <strong>Termos de Uso para Profissionais</strong>.
            </li>
            <li>
              <strong>2.</strong> Leia a <strong>Política de Privacidade</strong>.
            </li>
            <li>
              <strong>3.</strong> Marque as caixas indicando que você aceita os termos.
            </li>
            <li>
              <strong>4.</strong> Clique em <strong>Registrar</strong> para concluir.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-green-400 bg-green-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Pronto!</strong> Sua solicitação de registro foi enviada. Você receberá um
              email de confirmação assim que for aprovado.
            </p>
          </div>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Problemas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Se Você Encontrar Problemas</h3>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Email não recebido</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique pasta de spam. Aguarde 5 minutos. Clique em {`"Reenviar Email"`}.
              </p>
            </div>

            <div>
              <strong>Número de registro inválido</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique se o número está correto. O sistema faz validação automática.
              </p>
            </div>

            <div>
              <strong>UBS não encontrada</strong>
              <p className="mt-1 text-sm text-gray-600">
                Procure pelo nome completo da unidade. Se não encontrar, contacte o administrador.
              </p>
            </div>

            <div>
              <strong>Conta rejeitada</strong>
              <p className="mt-1 text-sm text-gray-600">
                Você receberá um email explicando o motivo. Corrija os dados e tente novamente.
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
            href="/docs-tutoriais/profissional/gerenciar-notificacoes"
            className="bg-primary rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Próximo: Gerenciar Notificações →
          </Link>
        </div>
      </div>
    </main>
  )
}
