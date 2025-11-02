import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { memo, useEffect, useMemo, useState } from 'react'
import LoadingFullPage from '../LoadingFullPage'
import ListItemContainer from '../ListItemContainer'
import { useTranslation } from 'react-i18next'
import kitService from '@/services/v2/kit.service'
import DropDown from '../Dropdown'
import { KIT_STATIS } from '@/constant/gunplaKits'
import { queryClient } from '@/utils/queryClient'

const STATUS = [KIT_STATIS.PENDING, KIT_STATIS.IN_PROGRESS, KIT_STATIS.DONE]
const Overview = memo(
  ({ kitId }: { kitId: string }) => {
    const { data, isLoading } = useSuspenseQuery(
      kitService.getKitByIdQuery(kitId),
    )

    const [kitStatus, setKitStatus] = useState<KitStatus>(
      KIT_STATIS.PENDING as KitStatus,
    )

    const { t } = useTranslation('kit')

    const numberOfRunners = useMemo(() => {
      if ((data?.runners ?? []).length === 0) {
        return 0
      }

      let count = 0
      for (const runner of data?.runners ?? []) {
        count = count + (runner.amount ?? 0)
      }
      return count
    }, [data?.runners])

    const { mutate } = useMutation({
      mutationFn: (status: KitStatus) =>
        kitService.updateKitStatus(kitId, status),
      onSuccess: (newData) => {
        queryClient.setQueryData(['kits', kitId], newData)

        // update in old list status
        queryClient.setQueryData<Array<KitV2>>(
          ['kits', kitStatus],
          (oldData) => {
            if (!oldData) return oldData

            oldData = oldData.filter((kit) => kit.id !== Number(kitId))

            // oldData.push(newData)
            return oldData
          },
        )

        queryClient.setQueryData<Array<KitV2>>(
          ['kits', newData.status],
          (oldData) => {
            if (!oldData) return oldData
            oldData.push(newData)

            return oldData
          },
        )

        setKitStatus(newData.status)
      },
    })

    useEffect(() => {
      if (data) {
        setKitStatus(data.status)
      }
    }, [data])

    if (isLoading) return <LoadingFullPage />

    return (
      <div>
        <ListItemContainer>
          <h6 className="text-primary font-bold">{t('overview.name')}: </h6>
          <span className="text-gray-500 text-sm font-bold">{data?.name}</span>
        </ListItemContainer>
        <ListItemContainer>
          <h6 className="text-primary font-bold">{t('overview.grade')}: </h6>
          <span className="text-gray-500 text-sm font-bold">
            {data?.grade.toUpperCase()}
          </span>
        </ListItemContainer>
        <ListItemContainer>
          <h6 className="text-primary font-bold">
            {t('overview.no-runners')}:{' '}
          </h6>
          <span className="text-gray-500 text-sm font-bold">
            {numberOfRunners}
          </span>
        </ListItemContainer>

        <ListItemContainer>
          <h6 className="text-primary font-bold">{t('overview.status')}: </h6>
          <DropDown
            value={kitStatus}
            options={STATUS.map((status) => ({
              value: status,
              label: status.toUpperCase(),
            }))}
            onChange={(e) => {
              mutate(e as KitStatus)
            }}
          />
        </ListItemContainer>
      </div>
    )
  },
  (prev, next) => prev.kitId === next.kitId,
)

export default Overview
