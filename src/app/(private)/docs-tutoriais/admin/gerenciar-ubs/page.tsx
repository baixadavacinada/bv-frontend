'use client'

export const dynamic = 'force-dynamic'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function AdminGerenciarUBSPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Gerenciar UBS" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Administre todas as Unidades Básicas de Saúde (UBS) cadastradas. Você pode adicionar novas
          unidades, editar informações, ativar/desativar e configurar parâmetros operacionais.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Conta de administrador ativa</li>
            <li>Informações das UBS (endereço, CNPJ, telefone)</li>
            <li>Horários de funcionamento</li>
            <li>Coordenadas de localização (latitude e longitude)</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Acessar UBS */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Acessar Gerenciamento de UBS</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Clique em <strong>Painel Administrativo</strong>.
            </li>
            <li>
              <strong>2.</strong> Selecione <strong>Gerenciamento</strong> →{' '}
              <strong>Unidades de Saúde</strong>.
            </li>
            <li>
              <strong>3.</strong> Você verá a lista de todas as UBS cadastradas.
            </li>
          </ol>
        </section>

        {/* Visualizar UBS */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Visualizar Lista de UBS</h3>
          <p className="mb-4 text-gray-700">A tabela mostra informações principais:</p>

          <div className="space-y-3 text-gray-700">
            <div>
              <strong>Nome:</strong> Nome oficial da UBS
            </div>
            <div>
              <strong>Endereço:</strong> Localização completa
            </div>
            <div>
              <strong>Telefone:</strong> Para contato
            </div>
            <div>
              <strong>Status:</strong> Ativa ou Inativa
            </div>
            <div>
              <strong>Usuários:</strong> Quantos usuários são dessa UBS
            </div>
            <div>
              <strong>Ações:</strong> Editar, visualizar, desativar
            </div>
          </div>
        </section>

        {/* Criar UBS */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Cadastrar Nova UBS</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Clique em <strong>+ Nova UBS</strong> ou{' '}
              <strong>Adicionar Unidade</strong>.
            </li>
            <li>
              <strong>2.</strong> Um formulário será aberto. Preencha os dados:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>
                  • <strong>Nome Oficial:</strong> Nome completo da UBS
                </li>
                <li>
                  • <strong>CNPJ:</strong> Cadastro nacional (se disponível)
                </li>
                <li>
                  • <strong>Endereco:</strong> Rua, número, bairro
                </li>
                <li>
                  • <strong>Cidade/Município:</strong> Localidade
                </li>
                <li>
                  • <strong>CEP:</strong> Código postal
                </li>
                <li>
                  • <strong>Telefone:</strong> Principal de contato
                </li>
                <li>
                  • <strong>Email:</strong> Contato administrativo
                </li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> Na próxima etapa, adicione localização (clique no mapa para
              definir):
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>
                  • <strong>Latitude:</strong> Coordenada Y
                </li>
                <li>
                  • <strong>Longitude:</strong> Coordenada X
                </li>
              </ul>
            </li>
            <li>
              <strong>4.</strong> Defina horários de funcionamento:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Horário de abertura (seg-sex)</li>
                <li>• Horário de fechamento (seg-sex)</li>
                <li>• Horários especiais (sábado, domingo, feriados)</li>
              </ul>
            </li>
            <li>
              <strong>5.</strong> Adicione informações adicionais (opcional):
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Responsável técnico (profissional)</li>
                <li>• Número de agentes de saúde</li>
                <li>• Capacidade de vacinação (doses/dia)</li>
              </ul>
            </li>
            <li>
              <strong>6.</strong> Clique em <strong>Salvar e Ativar</strong>.
            </li>
          </ol>
        </section>

        {/* Editar UBS */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Editar Informações da UBS</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na lista, clique na UBS ou no ícone <strong>editar</strong>.
            </li>
            <li>
              <strong>2.</strong> A página de edição será aberta.
            </li>
            <li>
              <strong>3.</strong> Modifique os campos necessários.
            </li>
            <li>
              <strong>4.</strong> Clique em <strong>Salvar Alterações</strong>.
            </li>
          </ol>

          <p className="mt-4 text-gray-700">
            <strong>Você pode editar:</strong>
          </p>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>• Informações de contato (telefone, email)</li>
            <li>• Endereço e localização no mapa</li>
            <li>• Horários de funcionamento</li>
            <li>• Responsáveis e equipe</li>
            <li>• Capacidades operacionais</li>
            <li>• Descrição e observações</li>
          </ul>
        </section>

        {/* Ativar/Desativar */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Ativar ou Desativar UBS</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Abra a página da UBS.
            </li>
            <li>
              <strong>2.</strong> No campo <strong>Status</strong>, escolha:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>
                  • <strong>Ativa:</strong> Visível no mapa, usuários podem se registrar
                </li>
                <li>
                  • <strong>Inativa:</strong> Oculta mas dados preservados
                </li>
                <li>
                  • <strong>Em Manutenção:</strong> Temporariamente indisponível
                </li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> Se desativar, explique o motivo.
            </li>
            <li>
              <strong>4.</strong> Clique em <strong>Salvar</strong>.
            </li>
          </ol>
        </section>

        {/* Horários */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Configurar Horários de Funcionamento
          </h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na edição da UBS, vá para a seção <strong>Horários</strong>.
            </li>
            <li>
              <strong>2.</strong> Configure os horários padrão (segunda a sexta):
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Hora de abertura</li>
                <li>• Hora de fechamento</li>
                <li>• Intervalo de almoço (se houver)</li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> Configure horários especiais:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Sábado</li>
                <li>• Domingo</li>
                <li>• Feriados específicos</li>
              </ul>
            </li>
            <li>
              <strong>4.</strong> Adicione exceções se necessário (data específica).
            </li>
            <li>
              <strong>5.</strong> Clique em <strong>Salvar Horários</strong>.
            </li>
          </ol>
          <div className="mt-4 rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Dica:</strong> Os horários são mostrados aos usuários no mapa e nos perfis.
              Mantenha atualizados.
            </p>
          </div>
        </section>

        {/* Mapa */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Atualizar Localização no Mapa</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na edição da UBS, encontre a seção <strong>Localização</strong>.
            </li>
            <li>
              <strong>2.</strong> Você pode:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Clicar no mapa para marcar a localização</li>
                <li>• Digitar endereço e deixar o sistema geocodificar</li>
                <li>• Inserir latitude/longitude manualmente</li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> Arraste o marcador para ajustar se necessário.
            </li>
            <li>
              <strong>4.</strong> Clique em <strong>Salvar Localização</strong>.
            </li>
          </ol>
        </section>

        {/* Profissionais */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Gerenciar Profissionais da UBS</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na edição da UBS, vá para a aba <strong>Profissionais</strong>.
            </li>
            <li>
              <strong>2.</strong> Você verá lista dos profissionais cadastrados nessa UBS.
            </li>
            <li>
              <strong>3.</strong> Pode <strong>Adicionar</strong>, <strong>Remover</strong> ou{' '}
              <strong>Editar</strong> profissionais.
            </li>
            <li>
              <strong>4.</strong> Defina o responsável técnico da UBS.
            </li>
            <li>
              <strong>5.</strong> Clique em <strong>Salvar</strong>.
            </li>
          </ol>
        </section>

        {/* Estatísticas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Visualizar Estatísticas da UBS</h3>
          <p className="mb-4 text-gray-700">
            Para cada UBS, você pode visualizar estatísticas úteis:
          </p>

          <div className="space-y-3 text-gray-700">
            <div>
              <strong>Total de Usuários:</strong> Quantas pessoas se registraram dessa UBS
            </div>
            <div>
              <strong>Usuários Ativos:</strong> Que fizeram login nos últimos 30 dias
            </div>
            <div>
              <strong>Vacinações Registradas:</strong> Total de doses registradas
            </div>
            <div>
              <strong>Campanhas Ativas:</strong> Quantas campanhas estão em andamento
            </div>
            <div>
              <strong>Avaliações:</strong> Nota média da UBS (com link para comentários)
            </div>
          </div>
        </section>

        {/* Exportar */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Exportar Dados de UBS</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na lista de UBS, use filtros conforme necessário.
            </li>
            <li>
              <strong>2.</strong> Clique em <strong>Exportar</strong>.
            </li>
            <li>
              <strong>3.</strong> Escolha formato: <strong>CSV</strong>, <strong>Excel</strong> ou{' '}
              <strong>PDF</strong>.
            </li>
            <li>
              <strong>4.</strong> O arquivo será baixado.
            </li>
          </ol>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Problemas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Se Você Encontrar Problemas</h3>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Localização não aparece no mapa</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique coordenadas (latitude/longitude). Tente novo endereço.
              </p>
            </div>

            <div>
              <strong>Usuários não podem se registrar em minha UBS</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique se a UBS está ativa no status. Confirme que é visível no mapa.
              </p>
            </div>

            <div>
              <strong>Horários não aparecem corretos</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique fuso horário do sistema. Reload a página se necessário.
              </p>
            </div>

            <div>
              <strong>Não consigo adicionar profissional</strong>
              <p className="mt-1 text-sm text-gray-600">
                O profissional pode não estar cadastrado no sistema. Crie primeiro em Gerenciar
                Usuários.
              </p>
            </div>

            <div>
              <strong>Dados não foram salvos</strong>
              <p className="mt-1 text-sm text-gray-600">
                Certifique-se de clicar em {`"Salvar Alterações"`}. Verifique conexão de internet.
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
            href="/docs-tutoriais/admin/gerenciar-vacinas"
            className="bg-primary rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            Próximo: Gerenciar Vacinas →
          </Link>
        </div>
      </div>
    </main>
  )
}
