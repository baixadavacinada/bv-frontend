import React from 'react'
import { EducationalMaterialsSection } from '@/components/sections/EducationalMaterialsSection'
import { MainActionsSection } from '@/components/sections/MainActionsSection'
import { WelcomeSection } from '@/components/sections/WelcomeSection'
import { educationalMaterialsData } from '@/mock/cards'

async function getHomeData() {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
    userName: 'Maria',
    materials: educationalMaterialsData,
  }
}

export default async function HomeScreen() {
  const { userName, materials } = await getHomeData()

  return (
    <div aria-label="Página inicial do aplicativo" id="main-content">
      <WelcomeSection userName={userName} />
      <MainActionsSection />
      <EducationalMaterialsSection materials={materials} />
    </div>
  )
}
