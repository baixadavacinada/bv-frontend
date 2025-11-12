import React from 'react'
import dynamic from 'next/dynamic'
import { CookieConsentModal } from '../CookieConsentModal'

function LoadingFallback() {
  return null
}

const DynamicCookieConsentModal = dynamic(() => Promise.resolve(CookieConsentModal), {
  loading: () => <LoadingFallback />,
})

export function LazyCookieConsentModal() {
  return (
    <React.Suspense fallback={<LoadingFallback />}>
      <DynamicCookieConsentModal />
    </React.Suspense>
  )
}
