'use client'

import { BvTitleHeader } from '@/components/design/BvTitleHeader'
import Link from 'next/link'

export default function AdminGerenciarVacinasPage() {
  return (
    <main className="w-full" role="main">
      <BvTitleHeader title="Gerenciar Vacinas" />

      <div className="mt-8 max-w-3xl">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Administre o catálogo de vacinas disponíveis no sistema. Você pode adicionar novas
          vacinas, atualizar esquemas de vacinação, definir protocolos e gerenciar calendários de
          vacinação.
        </p>

        {/* O que você precisa */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">O que você precisa</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Conta de administrador ativa</li>
            <li>Informações sobre vacinas (nome, fabricante, doses)</li>
            <li>Calendário vacinal atualizado</li>
            <li>Protocolos de vacinação por faixa etária</li>
          </ul>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Acessar Vacinas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Acessar Gerenciamento de Vacinas</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Clique em <strong>Painel Administrativo</strong>.
            </li>
            <li>
              <strong>2.</strong> Selecione <strong>Catálogo</strong> → <strong>Vacinas</strong>.
            </li>
            <li>
              <strong>3.</strong> Você verá lista de todas as vacinas cadastradas.
            </li>
          </ol>
        </section>

        {/* Visualizar Vacinas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Visualizar Lista de Vacinas</h3>
          <p className="mb-4 text-gray-700">A tabela mostra informações de cada vacina:</p>

          <div className="space-y-3 text-gray-700">
            <div>
              <strong>Nome:</strong> Nome popular e científico
            </div>
            <div>
              <strong>Abreviação:</strong> Sigla (ex: DPT, MMR)
            </div>
            <div>
              <strong>Número de Doses:</strong> Quantas doses são necessárias
            </div>
            <div>
              <strong>Faixa Etária:</strong> Público-alvo
            </div>
            <div>
              <strong>Status:</strong> Ativa, Inativa ou Descontinuada
            </div>
            <div>
              <strong>Ações:</strong> Editar, ativar/desativar, visualizar esquema
            </div>
          </div>
        </section>

        {/* Criar Vacina */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Cadastrar Nova Vacina</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Clique em <strong>+ Nova Vacina</strong>.
            </li>
            <li>
              <strong>2.</strong> Preencha informações básicas:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>
                  • <strong>Nome Popular:</strong> Ex: Vacina da Gripe
                </li>
                <li>
                  • <strong>Nome Científico:</strong> Ex: Influenza Inativada
                </li>
                <li>
                  • <strong>Abreviação:</strong> Ex: FLU
                </li>
                <li>
                  • <strong>Descrição:</strong> Breve descrição da vacina
                </li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> Configure o esquema de doses:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Número total de doses</li>
                <li>• Intervalo entre doses (em dias)</li>
                <li>• Idade mínima para primeira dose</li>
                <li>• Idade máxima (se houver)</li>
              </ul>
            </li>
            <li>
              <strong>4.</strong> Defina faixa etária e calendário:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Meses/anos para cada dose</li>
                <li>• Grupos especiais que precisam</li>
              </ul>
            </li>
            <li>
              <strong>5.</strong> Adicione informações sobre efeitos colaterais (opcional).
            </li>
            <li>
              <strong>6.</strong> Clique em <strong>Criar Vacina</strong>.
            </li>
          </ol>
        </section>

        {/* Editar Vacina */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Editar Informações de Vacina</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na lista, clique na vacina ou no ícone <strong>editar</strong>.
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
            <li>• Nomes e descrição</li>
            <li>• Esquema de doses</li>
            <li>• Faixa etária alvo</li>
            <li>• Grupos especiais</li>
            <li>• Informações sobre efeitos colaterais</li>
          </ul>
        </section>

        {/* Esquema de Doses */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Configurar Esquema de Doses</h3>
          <p className="mb-4 text-gray-700">
            O esquema define quando e quantas vezes uma pessoa deve receber a vacina:
          </p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>1. Defina o número de doses</strong>
              <p className="mt-1 text-sm text-gray-600">
                Ex: 3 doses para uma vacina padrão, 1 dose para vacina única.
              </p>
            </div>

            <div>
              <strong>2. Para cada dose, defina:</strong>
              <ul className="mt-1 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Idade mínima recomendada</li>
                <li>• Dias mínimos após dose anterior</li>
                <li>• Dias máximos após dose anterior (intervalo)</li>
              </ul>
            </div>

            <div>
              <strong>3. Exemplo - Vacina DPT (3 doses):</strong>
              <ul className="mt-1 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Dose 1: 2 meses de idade</li>
                <li>• Dose 2: 2 meses após dose 1</li>
                <li>• Dose 3: 2 meses após dose 2</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Calendário */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Gerenciar Calendário Vacinal</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na edição da vacina, vá para a aba <strong>Calendário</strong>.
            </li>
            <li>
              <strong>2.</strong> Defina o calendário oficial para diferentes faixas etárias:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Bebês (até 1 ano)</li>
                <li>• Crianças (1-5 anos)</li>
                <li>• Adolescentes (6-17 anos)</li>
                <li>• Adultos</li>
                <li>• Idosos</li>
              </ul>
            </li>
            <li>
              <strong>3.</strong> Para cada grupo, defina se é recomendada ou obrigatória.
            </li>
            <li>
              <strong>4.</strong> Adicione campanhas especiais se aplicável.
            </li>
            <li>
              <strong>5.</strong> Clique em <strong>Salvar Calendário</strong>.
            </li>
          </ol>
        </section>

        {/* Grupos Especiais */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Definir Grupos Especiais</h3>
          <p className="mb-4 text-gray-700">
            Você pode indicar populações específicas que precisam dessa vacina:
          </p>

          <div className="space-y-3 text-gray-700">
            <label className="flex items-center gap-3">
              <input type="checkbox" />
              <span>Grávidas</span>
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" />
              <span>Imunossuprimidos</span>
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" />
              <span>Profissionais de Saúde</span>
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" />
              <span>Portadores de Doenças Crônicas</span>
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" />
              <span>Viajantes Internacionais</span>
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" />
              <span>Outros Grupos (especificar)</span>
            </label>
          </div>
        </section>

        {/* Status */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Ativar ou Desativar Vacina</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Abra a vacina na lista.
            </li>
            <li>
              <strong>2.</strong> No campo <strong>Status</strong>, escolha:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>
                  • <strong>Ativa:</strong> Disponível para registro
                </li>
                <li>
                  • <strong>Inativa:</strong> Oculta mas dados preservados
                </li>
                <li>
                  • <strong>Descontinuada:</strong> Não mais usada
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

        {/* Visualizar Esquema */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Visualizar Esquema Vacinal</h3>
          <p className="mb-4 text-gray-700">
            Para cada vacina, você pode visualizar uma representação visual do esquema:
          </p>

          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na lista de vacinas, clique em <strong>Ver Esquema</strong>.
            </li>
            <li>
              <strong>2.</strong> Uma linha do tempo será exibida mostrando:
              <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                <li>• Cada dose</li>
                <li>• Idade recomendada</li>
                <li>• Intervalo entre doses</li>
                <li>• Grupos alvo</li>
              </ul>
            </li>
          </ol>
        </section>

        {/* Importar Calendário */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Importar Calendário Oficial</h3>
          <p className="mb-4 text-gray-700">
            Você pode importar o calendário vacinal oficial do governo:
          </p>

          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Clique em <strong>Importar Calendário</strong>.
            </li>
            <li>
              <strong>2.</strong> Selecione a origem: Ministério da Saúde, Secretaria Estadual, etc.
            </li>
            <li>
              <strong>3.</strong> Escolha a versão/ano do calendário.
            </li>
            <li>
              <strong>4.</strong> O sistema importará automaticamente as vacinas e esquemas.
            </li>
            <li>
              <strong>5.</strong> Revise e faça ajustes locais se necessário.
            </li>
            <li>
              <strong>6.</strong> Clique em <strong>Aplicar Calendário</strong>.
            </li>
          </ol>
        </section>

        {/* Exportar */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Exportar Catálogo de Vacinas</h3>
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1.</strong> Na lista de vacinas, clique em <strong>Exportar</strong>.
            </li>
            <li>
              <strong>2.</strong> Escolha formato: <strong>CSV</strong>, <strong>Excel</strong> ou{' '}
              <strong>PDF</strong>.
            </li>
            <li>
              <strong>3.</strong> Selecione informações a incluir (nomes, esquema, calendário, etc).
            </li>
            <li>
              <strong>4.</strong> O arquivo será gerado e baixado.
            </li>
          </ol>
        </section>

        <hr className="my-8 border-gray-200" />

        {/* Problemas */}
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Se Você Encontrar Problemas</h3>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Usuários não conseguem registrar a vacina</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique se a vacina está com status Ativa. Verifique se combina com a faixa etária
                do usuário.
              </p>
            </div>

            <div>
              <strong>Esquema de doses não está correto</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique intervalos entre doses. Edite e corrija os valores.
              </p>
            </div>

            <div>
              <strong>Não consigo importar calendário</strong>
              <p className="mt-1 text-sm text-gray-600">
                Verifique formato do arquivo. Tente novamente ou entre em contato com suporte.
              </p>
            </div>

            <div>
              <strong>Vacina antiga não desaparece</strong>
              <p className="mt-1 text-sm text-gray-600">
                Mude o status para Inativa em vez de deletar. Dados históricos são preservados.
              </p>
            </div>

            <div>
              <strong>Mudanças não foram salvas</strong>
              <p className="mt-1 text-sm text-gray-600">
                Certifique-se de clicar em {`"Salvar Alterações"`}. Recarregue se necessário.
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
