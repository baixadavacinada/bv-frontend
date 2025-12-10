'use client'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { TutorialGrid } from '@/components/sections/TutorialGrid'
import { useAuth } from '@/hooks/use-firebase-auth'
import { Users, Shield, Stethoscope } from 'lucide-react'
import Link from 'next/link'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface Tutorial {
  id: string
  title: string
  description: string
  href: string
  duration: string
  level?: 'iniciante' | 'intermediário' | 'avançado'
}

export default function PerguntasFrequentesScreen() {
  const { user } = useAuth()

  const faqGeral: FAQItem[] = [
    {
      id: 'login-senha-correta',
      question: 'Como faço login na plataforma?',
      answer:
        'Acesse a página inicial, clique em "Entrar", digite seu email e senha e clique em "Entrar". Se você não tem conta ainda, clique em "Criar Conta".',
    },
    {
      id: 'esqueci-senha',
      question: 'Esqueci minha senha. O que faço?',
      answer:
        'Na página de login, clique em "Esqueceu a senha?". Digite seu email e você receberá um link para criar uma nova senha. Verifique também sua pasta de spam.',
    },
    {
      id: 'codigo-validacao-email',
      question: 'Não recebi o código de confirmação por email',
      answer:
        'Aguarde alguns minutos e verifique sua pasta de spam. Se não receber, clique em "Reenviar código". Se o problema persistir, tente usar outro email ou contate o suporte.',
    },
    {
      id: 'codigo-validacao-whatsapp',
      question: 'Não recebi o código no WhatsApp',
      answer:
        'Verifique sua conexão de internet. Aguarde alguns minutos e clique em "Reenviar código". Certifique-se de que permitiu notificações do WhatsApp.',
    },
    {
      id: 'email-registrado',
      question: 'Recebi erro "Email já registrado"',
      answer:
        'Esse email já está associado a uma conta. Faça login com esse email ou use outro. Se não lembrar a senha, clique em "Esqueceu a senha?".',
    },
    {
      id: 'celular-registrado',
      question: 'Recebi erro "Celular já registrado"',
      answer:
        'Esse número de celular já está associado a uma conta. Use outro número ou faça login com o número anterior.',
    },
    {
      id: 'muda-dados-perfil',
      question: 'Como atualizo meus dados pessoais?',
      answer:
        'Clique em "Configurações" (engrenagem no menu), depois em "Editar Perfil". Você pode alterar nome, telefone, email e endereço. Clique em "Salvar" quando terminar.',
    },
    {
      id: 'altera-senha',
      question: 'Como troco minha senha?',
      answer:
        'Acesse "Configurações" → "Alterar Senha". Digite sua senha atual e depois a nova senha duas vezes. Clique em "Salvar".',
    },
    {
      id: 'nao-recebe-notificacoes',
      question: 'Não estou recebendo notificações',
      answer:
        'Verifique em "Configurações" se as notificações estão ativadas. Também confirme se seu email e celular estão corretos. Verifique a pasta de spam do seu email.',
    },
    {
      id: 'notificacoes-muito-frequentes',
      question: 'Estou recebendo muitas notificações',
      answer:
        'Acesse "Configurações" e ajuste quais notificações deseja receber. Você pode desativar lembretes de vacinas, avisos ou outras notificações específicas.',
    },
    {
      id: 'como-faco-logout',
      question: 'Como faço logout (sair da minha conta)?',
      answer:
        'Clique no botão "Sair" que fica no final do menu lateral (desktop) ou no rodapé (celular). Você será desconectado da sua conta.',
    },
    {
      id: 'seguranca-dados',
      question: 'Meus dados estão seguros na plataforma?',
      answer:
        'Sim! Todos os seus dados pessoais são criptografados e protegidos. A plataforma segue as regras de proteção de dados (LGPD). Nunca compartilhamos suas informações com terceiros sem permissão.',
    },
  ]

  const faqVacinas: FAQItem[] = [
    {
      id: 'registra-vacina',
      question: 'Como registro uma vacina que tomei?',
      answer:
        'Clique em "Registro de Vacinação" no menu. Clique em "Adicionar Vacina". Selecione a vacina, a dose (1ª, 2ª, reforço), a data e o local. Clique em "Salvar".',
    },
    {
      id: 'nao-encontra-vacina',
      question: 'Não encontro a vacina que tomei na lista',
      answer:
        'Procure na lista por nome. Se não encontrar, clique em "Outra" ou "Não sei qual é" e digite o nome da vacina. O sistema ajudará a identificar.',
    },
    {
      id: 'edita-vacina-registrada',
      question: 'Posso editar uma vacina que registrei?',
      answer:
        'Sim! Clique na vacina que deseja editar. Clique no ícone de lápis. Altere as informações. Clique em "Salvar".',
    },
    {
      id: 'remove-vacina',
      question: 'Como removo um registro de vacina?',
      answer:
        'Clique na vacina que deseja remover. Clique no ícone de lixeira. Confirme a exclusão. A vacina será apagada do seu histórico.',
    },
    {
      id: 'lembretes-segunda-dose',
      question: 'Como ativo lembretes de segunda dose?',
      answer:
        'Clique em "Configurações". Procure por "Lembretes de Vacinas". Ative a opção. Você receberá avisos sobre doses que ainda precisa tomar.',
    },
    {
      id: 'vacina-nao-aparece',
      question: 'Registrei uma vacina mas não aparece no histórico',
      answer:
        'Atualize a página (F5 ou clique no botão de atualizar). Se ainda não aparecer, tente registrar novamente. Se o problema continuar, contate o suporte.',
    },
    {
      id: 'sincronizar-sus',
      question: 'Posso sincronizar meu histórico com o SUS?',
      answer:
        'Alguns estados permitem sincronização automática. Clique em "Sincronizar com SUS" se disponível em sua região. Você precisará autorizar o acesso.',
    },
    {
      id: 'vacina-duplicada',
      question: 'Registrei a mesma vacina duas vezes por engano',
      answer:
        'Clique em "Registro de Vacinação". Localize a vacina duplicada. Clique no ícone de lixeira e remova. Você pode registrar novamente se necessário.',
    },
  ]

  const faqUbs: FAQItem[] = [
    {
      id: 'encontra-ubs',
      question: 'Como encontro uma UBS perto de mim?',
      answer:
        'Clique em "UBS" no menu. O mapa mostrará as unidades próximas. Você pode buscar por nome, bairro ou usar a localização do celular.',
    },
    {
      id: 'avalia-ubs',
      question: 'Como faço uma avaliação de uma UBS?',
      answer:
        'Clique em "UBS", selecione uma unidade. Clique em "Avaliar". Dê notas com estrelas, avalie aspectos (limpeza, atendimento, etc) e deixe um comentário. Clique em "Enviar".',
    },
    {
      id: 'edita-avaliacao',
      question: 'Posso editar minha avaliação de uma UBS?',
      answer:
        'Sim! Na página da UBS, clique em "Minhas Avaliações". Clique no ícone de lápis. Altere as notas e comentário. Clique em "Salvar".',
    },
    {
      id: 'remove-avaliacao',
      question: 'Como removo minha avaliação?',
      answer:
        'Na página da UBS, clique em "Minhas Avaliações". Clique no ícone de lixeira. Confirme a exclusão. Sua avaliação será removida.',
    },
    {
      id: 've-avaliacoes-outras',
      question: 'Como vejo as avaliações de outros usuários?',
      answer:
        'Na página da UBS, desça até "Avaliações". Você verá todas as avaliações deixadas por outros usuários, com notas, comentários e datas.',
    },
  ]

  const tutoriaisMorador: Tutorial[] = [
    {
      id: 'criar-conta',
      title: 'Como Criar Sua Conta',
      description: 'Passo a passo para registrar-se na plataforma com email, senha e validações.',
      href: '/docs-tutoriais/morador/criar-conta',
      duration: '10 min',
      level: 'iniciante',
    },
    {
      id: 'historico-vacinas',
      title: 'Ver Meu Histórico de Vacinas',
      description: 'Aprenda a consultar todas as vacinas que já registrou na plataforma.',
      href: '/docs-tutoriais/morador/historico-vacinas',
      duration: '5 min',
      level: 'iniciante',
    },
    {
      id: 'adicionar-vacina',
      title: 'Registrar uma Vacina',
      description: 'Como adicionar um novo registro de vacinação ao seu perfil.',
      href: '/docs-tutoriais/morador/adicionar-vacina',
      duration: '7 min',
      level: 'iniciante',
    },
    {
      id: 'editar-vacina',
      title: 'Editar e Remover Vacinas',
      description: 'Altere ou delete registros de vacinas quando precisar corrigir dados.',
      href: '/docs-tutoriais/morador/editar-remover-vacinas',
      duration: '5 min',
      level: 'iniciante',
    },
    {
      id: 'lembretes',
      title: 'Configurar Lembretes',
      description: 'Receba notificações sobre suas próximas doses de vacinação.',
      href: '/docs-tutoriais/morador/configurar-lembretes',
      duration: '5 min',
      level: 'iniciante',
    },
    {
      id: 'ubs-proxima',
      title: 'Encontrar uma UBS Próxima',
      description: 'Localize unidades de saúde (UBS) perto de você no mapa interativo.',
      href: '/docs-tutoriais/morador/encontrar-ubs',
      duration: '5 min',
      level: 'iniciante',
    },
    {
      id: 'avaliar-ubs',
      title: 'Avaliar uma UBS',
      description: 'Deixe sua avaliação sobre o atendimento e infraestrutura de uma UBS.',
      href: '/docs-tutoriais/morador/avaliar-ubs',
      duration: '7 min',
      level: 'iniciante',
    },
  ]

  const tutoriaisProfissional: Tutorial[] = [
    {
      id: 'criar-conta-prof',
      title: 'Criar Conta de Profissional',
      description: 'Registre-se como profissional de saúde na plataforma.',
      href: '/docs-tutoriais/profissional/criar-conta-prof',
      duration: '10 min',
      level: 'iniciante',
    },
    {
      id: 'gerenciar-notificacoes',
      title: 'Gerenciar Notificações',
      description: 'Configure alertas e templates de notificações para seus pacientes.',
      href: '/docs-tutoriais/profissional/gerenciar-notificacoes',
      duration: '10 min',
      level: 'intermediário',
    },
    {
      id: 'enviar-notificacao',
      title: 'Enviar Notificações Personalizadas',
      description: 'Crie e envie mensagens para grupos de usuários ou usuários específicos.',
      href: '/docs-tutoriais/profissional/enviar-notificacao',
      duration: '8 min',
      level: 'intermediário',
    },
    {
      id: 'visualizar-usuarios',
      title: 'Consultar Dados de Usuários',
      description: 'Acesse informações de vacinação e perfil dos usuários de sua área.',
      href: '/docs-tutoriais/profissional/visualizar-usuarios',
      duration: '7 min',
      level: 'intermediário',
    },
  ]

  const tutoriaisAdmin: Tutorial[] = [
    {
      id: 'criar-conta-admin',
      title: 'Criar Conta de Administrador',
      description: 'Configure sua conta como administrador da plataforma.',
      href: '/docs-tutoriais/admin/criar-conta-admin',
      duration: '10 min',
      level: 'intermediário',
    },
    {
      id: 'gerenciar-usuarios',
      title: 'Gerenciar Usuários',
      description: 'Criar, editar e remover contas de usuários e profissionais.',
      href: '/docs-tutoriais/admin/gerenciar-usuarios',
      duration: '12 min',
      level: 'avançado',
    },
    {
      id: 'gerenciar-ubs',
      title: 'Gerenciar Unidades de Saúde',
      description: 'Cadastro e configuração de UBS na plataforma.',
      href: '/docs-tutoriais/admin/gerenciar-ubs',
      duration: '15 min',
      level: 'avançado',
    },
    {
      id: 'gerenciar-vacinas',
      title: 'Gerenciar Vacinas',
      description: 'Adicione novas vacinas e gerencie o cadastro vacinal do sistema.',
      href: '/docs-tutoriais/admin/gerenciar-vacinas',
      duration: '10 min',
      level: 'avançado',
    },
    {
      id: 'templates-notificacoes',
      title: 'Gerenciar Templates de Notificações',
      description: 'Crie e configure templates reutilizáveis para notificações em massa.',
      href: '/docs-tutoriais/admin/templates-notificacoes',
      duration: '12 min',
      level: 'avançado',
    },
    {
      id: 'relatorios',
      title: 'Gerar Relatórios',
      description: 'Analise dados de vacinação, usuários e atividades da plataforma.',
      href: '/docs-tutoriais/admin/relatorios',
      duration: '10 min',
      level: 'avançado',
    },
    {
      id: 'configuracoes-sistema',
      title: 'Configurações do Sistema',
      description: 'Ajuste parâmetros globais, temas e políticas da plataforma.',
      href: '/docs-tutoriais/admin/configuracoes-sistema',
      duration: '15 min',
      level: 'avançado',
    },
  ]

  const showProfessionalDocs = user?.role === 'agent' || user?.role === 'admin'
  const showAdminDocs = user?.role === 'admin'

  return (
    <div className="w-full">
      <BvTitleHeader title="Perguntas Frequentes" />

      <div className="border-primary/20 bg-primary/5 mt-8 mb-10 rounded-xl border p-6">
        <p className="text-base leading-relaxed text-gray-700">
          Bem-vindo ao centro de ajuda! Aqui você encontra respostas rápidas para dúvidas comuns e
          tutoriais passo a passo para usar a plataforma.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Conta e Segurança</h2>
            <p className="text-gray-600">
              Dúvidas sobre login, senha, notificações e proteção de dados
            </p>
          </div>
          <FAQAccordion items={faqGeral} />
        </section>

        <section>
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Vacinas e Histórico</h2>
            <p className="text-gray-600">Aprenda a registrar e gerenciar suas vacinas</p>
          </div>
          <FAQAccordion items={faqVacinas} />
        </section>

        <section>
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Unidades de Saúde</h2>
            <p className="text-gray-600">Encontre UBS e deixe suas avaliações</p>
          </div>
          <FAQAccordion items={faqUbs} />
        </section>

        <section className="border-t border-gray-200 pt-8">
          <h2 className="mb-12 text-3xl font-bold text-gray-900">Tutoriais Completos</h2>

          <TutorialGrid
            tutorials={tutoriaisMorador}
            roleLabel="Para Moradores"
            roleDescription="Tutoriais completos para usuários da plataforma"
            icon={<Users className="text-primary" size={24} />}
            horizontal
          />

          {showProfessionalDocs && (
            <TutorialGrid
              tutorials={tutoriaisProfissional}
              roleLabel="Para Profissionais de Saúde"
              roleDescription="Aprenda a gerenciar notificações e consultar dados de pacientes"
              icon={<Stethoscope className="text-alert" size={24} />}
              horizontal
            />
          )}

          {showAdminDocs && (
            <TutorialGrid
              tutorials={tutoriaisAdmin}
              roleLabel="Para Administradores"
              roleDescription="Gerencie usuários, UBS, vacinas e configurações do sistema"
              icon={<Shield className="text-primary" size={24} />}
              horizontal
            />
          )}
        </section>

        <section className="border-primary/20 bg-primary/5 rounded-lg border p-8">
          <h3 className="mb-3 text-xl font-bold text-gray-900">Ainda tem dúvida?</h3>
          <p className="mb-4 text-gray-700">
            Se não encontrou a resposta que procurava, consulte a documentação completa ou entre em
            contato com nosso time.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/docs-tutoriais"
              className="bg-primary inline-block rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
            >
              Ver Todos os Tutoriais
            </Link>
            <Link
              href="/configuracoes"
              className="border-primary text-primary hover:bg-primary/5 inline-block rounded-lg border-2 px-6 py-3 font-medium transition-colors"
            >
              Ir para Configurações
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
