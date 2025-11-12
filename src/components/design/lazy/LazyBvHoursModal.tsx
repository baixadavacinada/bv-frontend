import React from 'react'
import dynamic from 'next/dynamic'
import { BvHoursModal } from '../BvHoursModal'

export interface LazyBvHoursModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  currentHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  currentWaitTime: string
  onSave: (
    newHours: {
      monday: string
      tuesday: string
      wednesday: string
      thursday: string
      friday: string
      saturday: string
      sunday: string
    },
    newWaitTime: string,
  ) => void
}

function LoadingFallback() {
  return null
}

const DynamicBvHoursModal = dynamic(() => Promise.resolve(BvHoursModal), {
  loading: () => <LoadingFallback />,
})

export function LazyBvHoursModal(props: LazyBvHoursModalProps) {
  if (!props.isOpen) {
    return null
  }

  return (
    <React.Suspense fallback={<LoadingFallback />}>
      <DynamicBvHoursModal {...props} />
    </React.Suspense>
  )
}
