'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import VaccineBookletContent from './booklet'
import VaccineRegistrationContent from './vaccine-registration'

type TabType = 'cartilha' | 'minhas-vacinas'

export default function VaccineBookletScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('cartilha')

  return (
    <div>
      {/* Abas de navegação */}
      <div className="mb-6 flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('cartilha')}
          className={cn(
            'px-4 py-3 font-medium transition-colors',
            activeTab === 'cartilha'
              ? 'border-b-2 border-purple-600 text-purple-600'
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
              ? 'border-b-2 border-purple-600 text-purple-600'
              : 'text-gray-600 hover:text-gray-900',
          )}
          aria-selected={activeTab === 'minhas-vacinas'}
          role="tab"
        >
          Minhas Vacinas
        </button>
      </div>

      {/* Conteúdo das abas */}
      <div role="tabpanel">
        {activeTab === 'cartilha' && <VaccineBookletContent />}
        {activeTab === 'minhas-vacinas' && <VaccineRegistrationContent />}
      </div>
    </div>
  )
}
