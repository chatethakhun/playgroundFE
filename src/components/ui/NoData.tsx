import { memo } from 'react'
import { useTranslation } from 'react-i18next'

const NoData = memo(() => {
  const { t } = useTranslation('common')

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center text-xl  text-gray-500">{t('no-data')}</div>
    </div>
  )
})

export default NoData
