'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import VaccineBookletContent from './booklet'
import VaccineRegistrationContent from './vaccine-registration'
import VaccineCalendarContent from './calendar'

type TabType = 'cartilha' | 'minhas-vacinas' | 'calendario'

export default function VaccineBookletScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('minhas-vacinas')

  return (
    <div>
      {/* Abas de navegação */}
      <div className="mb-6 flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('cartilha')}
          className={cn(
            'px-4 py-3 font-medium transition-colors',
            activeTab === 'cartilha'
              ? 'text-primary border-b-2 border-gray-700'
              : 'text-gray-600 hover:text-gray-900',
          )}
          aria-selected={activeTab === 'cartilha'}
          role="tab"
        >
          Cartilha de Vacinas
        </button>
        <button
          onClick={() => setActiveTab('minhas-vacinas')}
          className={cn(
            'px-4 py-3 font-medium transition-colors',
            activeTab === 'minhas-vacinas'
              ? 'text-primary border-b-2 border-gray-700'
              : 'text-gray-600 hover:text-gray-900',
          )}
          aria-selected={activeTab === 'minhas-vacinas'}
          role="tab"
        >
          Minhas Vacinas
        </button>
        <button
          onClick={() => setActiveTab('calendario')}
          className={cn(
            'px-4 py-3 font-medium transition-colors',
            activeTab === 'calendario'
              ? 'text-primary border-b-2 border-gray-700'
              : 'text-gray-600 hover:text-gray-900',
          )}
          aria-selected={activeTab === 'calendario'}
          role="tab"
        >
          Calendário de Vacinação
        </button>
      </div>

      {/* Conteúdo das abas */}
      <div role="tabpanel">
        {activeTab === 'cartilha' && <VaccineBookletContent />}
        {activeTab === 'minhas-vacinas' && (
          <VaccineRegistrationContent onVaccineAdded={() => setActiveTab('minhas-vacinas')} />
        )}
        {activeTab === 'calendario' && <VaccineCalendarContent />}
      </div>
    </div>
  )
}
