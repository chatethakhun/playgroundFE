import { Frown } from 'lucide-react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

const NoData = memo(() => {
  const { t } = useTranslation('common')

  return (
    <div className="flex flex-col items-center justify-center">
      <Frown className="w-10 h-10 text-gray-500 mb-2" />
      <div className="text-center text-sm  text-gray-500">{t('no-data')}</div>
    </div>
  )
})

export default NoData
