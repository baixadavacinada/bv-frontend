'use client'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function MoradorCriarContaPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Como Criar Sua Conta" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Crie uma conta na Baixada Vacinada em poucos minutos para começar a registrar suas vacinas
          e acompanhar sua saúde.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Um email válido que você acessa regularmente</li>
            <li>Um celular com WhatsApp ativo</li>
            <li>Seus dados pessoais (nome completo e CPF)</li>
            <li>Seu endereço residencial</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Acessar a Plataforma */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Acessar a Plataforma</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> No seu navegador, acesse <strong>baixadavacinada.com.br</strong>.
            </li>
            <li>
              <strong>2.</strong> Toque em <strong>Criar Conta</strong> (localizado no canto
              superior ou no centro da página).
            </li>
            <li>
              <strong>3.</strong> Escolha se deseja continuar com email ou WhatsApp.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Dica:</strong> Usar email é mais rápido e seguro. Você receberá um código de
              verificação instantaneamente.
            </p>
          </div>
        </section>

        {/* Preencher Seus Dados */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Preencher Seus Dados</h3>
          <p className="mb-4 text-gray-700">Na primeira tela, insira as informações solicitadas:</p>
          <ol className="space-y-3 text-gray-700">
            <li>
              <strong>1. Nome Completo</strong> — Digite exatamente como aparece em seus documentos.
            </li>
            <li>
              <strong>2. Email</strong> — Use um email que você acessa com frequência.
            </li>
            <li>
              <strong>3. CPF</strong> — Insira seu CPF sem pontos ou hífen (apenas números).
            </li>
            <li>
              <strong>4. Celular</strong> — Digite seu número com DDD. Este será seu número de
              contato.
            </li>
          </ol>
          <p className="mt-4 text-gray-700">
            Clique em <strong>Continuar</strong>.
          </p>
          <div className="mt-4 rounded-lg border-l-4 border-green-400 bg-green-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Importante:</strong> Seus dados estão protegidos por criptografia. Nunca
              compartilharemos suas informações sem sua permissão.
            </p>
          </div>
        </section>

        {/* Criar Sua Senha */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Criar Sua Senha</h3>
          <p className="mb-4 text-gray-700">Crie uma senha segura. Ela deve conter:</p>
          <ul className="mb-4 space-y-2 text-gray-700">
            <li>Mínimo 8 caracteres</li>
            <li>Pelo menos 1 letra maiúscula (A-Z)</li>
            <li>Pelo menos 1 número (0-9)</li>
            <li>Pelo menos 1 caractere especial (!@#$%^&*)</li>
          </ul>
          <p className="mb-3 text-sm font-semibold text-gray-900">Exemplos de senhas seguras:</p>
          <ul className="mb-4 space-y-1 font-mono text-sm text-gray-700">
            <li>MinhaSenh@123</li>
            <li>Vacinado!2024</li>
            <li>Saúde@Baixada#99</li>
          </ul>
          <p className="text-gray-700">
            Clique em <strong>Continuar</strong>.
          </p>
          <div className="mt-4 rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Dica de Segurança:</strong> Nunca reutilize senhas de outras contas. Use uma
              combinação única.
            </p>
          </div>
        </section>

        {/* Validar Seu Email */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Validar Seu Email</h3>
          <p className="mb-4 text-gray-700">Você receberá um código de verificação por email:</p>
          <ol className="space-y-3 text-gray-700">
            <li>
              <strong>1.</strong> Abra seu email e procure uma mensagem de{' '}
              <strong>Baixada Vacinada</strong>.
            </li>
            <li>
              <strong>2.</strong> Copie o código de 6 dígitos.
            </li>
            <li>
              <strong>3.</strong> Retorne à plataforma e insira o código no campo{' '}
              <strong>Código de Verificação</strong>.
            </li>
            <li>
              <strong>4.</strong> Clique em <strong>Verificar</strong>.
            </li>
          </ol>
          <p className="mt-4 text-sm text-gray-600">
            O código expira em 10 minutos. Se não recebeu, verifique sua pasta de spam ou clique em{' '}
            <strong>Reenviar Código</strong>.
          </p>
        </section>

        {/* Validar Seu WhatsApp */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Validar Seu WhatsApp</h3>
          <p className="mb-4 text-gray-700">
            Você receberá uma mensagem no WhatsApp com outro código:
          </p>
          <ol className="space-y-3 text-gray-700">
            <li>
              <strong>1.</strong> Abra o WhatsApp e procure a mensagem de{' '}
              <strong>Baixada Vacinada</strong>.
            </li>
            <li>
              <strong>2.</strong> Copie o código de 6 dígitos.
            </li>
            <li>
              <strong>3.</strong> Retorne à plataforma e insira o código no campo{' '}
              <strong>Código do WhatsApp</strong>.
            </li>
            <li>
              <strong>4.</strong> Clique em <strong>Verificar</strong>.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Nota:</strong> Você receberá atualizações e lembretes via WhatsApp.
              Certifique-se de que as notificações estão ativadas no seu app.
            </p>
          </div>
        </section>

        {/* Escolher UBS */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Escolher Sua Unidade de Saúde (UBS)
          </h3>
          <ol className="space-y-3 text-gray-700">
            <li>
              <strong>1.</strong> Na próxima tela, selecione sua{' '}
              <strong>Unidade de Saúde (UBS)</strong> mais próxima.
            </li>
            <li>
              <strong>2.</strong> Se não encontrar, use a barra de busca ou ative sua localização.
            </li>
            <li>
              <strong>3.</strong> Clique em <strong>Continuar</strong>.
            </li>
          </ol>
          <p className="mt-4 text-sm text-gray-600">
            Você poderá alterar esta informação depois em <strong>Configurações</strong>.
          </p>
        </section>

        {/* Aceitar os Termos */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Aceitar os Termos</h3>
          <ol className="space-y-3 text-gray-700">
            <li>
              <strong>1.</strong> Leia os <strong>Termos de Serviço</strong> (ou veja um resumo
              rápido).
            </li>
            <li>
              <strong>2.</strong> Marque a caixa <strong>Aceito os termos</strong>.
            </li>
            <li>
              <strong>3.</strong> Clique em <strong>Finalizar Registro</strong>.
            </li>
          </ol>
        </section>

        {/* Pronto */}
        <section className="mb-12 rounded-lg border border-green-200 bg-green-50 p-6">
          <h3 className="mb-4 text-xl font-bold text-gray-900">Pronto! Sua Conta Está Criada</h3>
          <p className="mb-4 text-gray-700">Você agora pode:</p>
          <ul className="space-y-2 text-gray-700">
            <li>Registrar suas vacinas</li>
            <li>Consultar seu histórico de vacinação</li>
            <li>Configurar lembretes de doses</li>
            <li>Avaliar unidades de saúde</li>
            <li>Gerenciar suas notificações</li>
          </ul>
          <p className="mt-4 text-gray-700">Faça login com seu email e senha para começar.</p>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Problemas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Se Você Encontrar Problemas</h3>

          <div className="space-y-6">
            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Se não recebi o código de email:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Aguarde 5 minutos e verifique sua pasta de spam.</li>
                <li>
                  • Clique em <strong>Reenviar Código</strong>.
                </li>
                <li>• Se continuar não recebendo, tente usar outro email.</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">{`Se recebi erro "Email já registrado":`}</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Este email já está associado a uma conta.</li>
                <li>• Tente fazer login com este email ou use outro email.</li>
                <li>
                  • Se não lembrar a senha, clique em <strong>Esqueceu a Senha?</strong> na tela de
                  login.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">{`Se recebi erro "CPF inválido":`}</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Certifique-se de que digitou apenas números, sem pontos ou hífens.</li>
                <li>• Verifique se não há espaços em branco.</li>
                <li>• O CPF já pode estar registrado. Tente fazer login.</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900">Preciso de mais ajuda:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Entre em contato com nosso suporte via WhatsApp ou email.</li>
                <li>
                  • Consulte nossa seção de <strong>Perguntas Frequentes</strong>.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="mt-12 flex gap-4 border-t border-gray-200 pt-6">
          <Link
            href="/perguntas-frequentes"
            className="border-primary text-primary hover:bg-primary/5 rounded-lg border-2 px-6 py-3 font-medium transition-colors"
          >
            ← Voltar
          </Link>
          <Link
            href="/docs-tutoriais"
            className="bg-primary rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Ver Todos os Tutoriais →
          </Link>
        </div>
      </div>
    </main>
  )
}
