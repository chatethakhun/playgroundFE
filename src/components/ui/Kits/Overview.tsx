import { getKit } from '@/services/gunplaKits/kit.service'
import { useQuery } from '@tanstack/react-query'
import { memo, useMemo } from 'react'
import LoadingFullPage from '../LoadingFullPage'
import ListItemContainer from '../ListItemContainer'
import { useTranslation } from 'react-i18next'

const Overview = memo(
  ({ kitId }: { kitId: string }) => {
    const { data, isLoading } = useQuery({
      queryFn: () => getKit(kitId),
      queryKey: ['kits', kitId],
      enabled: !!kitId,
    })

    const { t } = useTranslation('kit')

    const numberOfRunners = useMemo(() => {
      if ((data?.runners ?? []).length === 0) {
        return 0
      }

      let count = 0
      for (const runner of data?.runners ?? []) {
        count = count + (runner.qty ?? 0)
      }
      return count
    }, [data?.runners])

    if (isLoading) return <LoadingFullPage />

    return (
      <div>
        <ListItemContainer>
          <h6 className="text-primary font-bold">{t('overview.name')}: </h6>
          <span className="text-gray-500 text-sm font-bold">{data?.name}</span>
        </ListItemContainer>
        <ListItemContainer>
          <h6 className="text-primary font-bold">{t('overview.grade')}: </h6>
          <span className="text-gray-500 text-sm font-bold">{data?.grade}</span>
        </ListItemContainer>
        <ListItemContainer>
          <h6 className="text-primary font-bold">
            {t('overview.no-runners')}:{' '}
          </h6>
          <span className="text-gray-500 text-sm font-bold">
            {numberOfRunners}
          </span>
        </ListItemContainer>
      </div>
    )
  },
  (prev, next) => prev.kitId === next.kitId,
)

export default Overview
