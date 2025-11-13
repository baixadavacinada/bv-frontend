import React from 'react'
import dynamic from 'next/dynamic'
import { BvAddVaccineModal } from '../BvAddVaccineModal'

export interface LazyBvAddVaccineModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onAdd: (newVaccineName: string) => void
  existingVaccines: string[]
}

function LoadingFallback() {
  return null
}

const DynamicBvAddVaccineModal = dynamic(() => Promise.resolve(BvAddVaccineModal), {
  loading: () => <LoadingFallback />,
})

export function LazyBvAddVaccineModal(props: LazyBvAddVaccineModalProps) {
  if (!props.isOpen) {
    return null
  }

  return (
    <React.Suspense fallback={<LoadingFallback />}>
      <DynamicBvAddVaccineModal {...props} />
    </React.Suspense>
  )
}
