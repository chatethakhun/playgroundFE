import { memo } from 'react'
import { useTranslation } from 'react-i18next'

const NotFoundError = memo(() => {
  const { t } = useTranslation('common')
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-red-600 mb-4 text-center">
        404 - {t('404-title')}
      </h1>
      <p className="text-gray-700">{t('404-message')}</p>
    </div>
  )
})

export default NotFoundError
