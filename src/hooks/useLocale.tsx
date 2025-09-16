import React from 'react'
import { LocaleContext } from '@/providers/LocaleProvider'

export const useLocale = () => {
  const context = React.useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
