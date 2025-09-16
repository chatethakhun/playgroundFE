import i18n from '@/i18n'
import React from 'react'

interface LocaleContextType {
  locale: string
  setLocale: (locale: string) => void
}

export const LocaleContext = React.createContext<LocaleContextType>({
  locale: 'en',
  setLocale: () => {},
})

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const current = i18n.language
  const [locale, setLocale] =
    React.useState<LocaleContextType['locale']>(current)

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}
