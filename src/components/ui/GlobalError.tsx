import { memo } from 'react'
import { useTranslation } from 'react-i18next'

const GlobalError = memo(
  ({ error }: { error: unknown }) => {
    const { t } = useTranslation('common')

    const isDev = true
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-gray-50 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4 text-center">
          500 - {t('500-title')}
        </h1>

        <p className="text-gray-700">{t('500-message')}</p>
        {isDev && (
          <pre className="mt-4 p-2 bg-gray-200 rounded text-sm text-gray-800">
            {JSON.stringify(error)}
          </pre>
        )}
      </div>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.error === nextProps.error
  },
)

export default GlobalError
