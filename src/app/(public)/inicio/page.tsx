import React from 'react'
import { EducationalMaterialsSection } from '@/components/sections/EducationalMaterialsSection'
import { MainActionsSection } from '@/components/sections/MainActionsSection'
import { WelcomeSection } from '@/components/sections/WelcomeSection'
import { educationalMaterialsData } from '@/mock/cards'

export default function HomeScreen() {
  return (
    <div aria-label="Página inicial do aplicativo" id="main-content">
      <WelcomeSection />
      <MainActionsSection />
      <EducationalMaterialsSection materials={educationalMaterialsData} />
    </div>
  )
}
