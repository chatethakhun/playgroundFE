import Button from '@/components/ui/Button'
import PageContainer from '@/components/ui/PageContainer'
import { SteamPriceService } from '@/services/steam/price.service'
import { queryClient } from '@/utils/queryClient'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/_authenticated/steam-pricing/$appId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const data = await queryClient.ensureQueryData(
      SteamPriceService.getPrice(params.appId),
    )
    return data
  },
})

function RouteComponent() {
  const { appId } = Route.useParams()
  const { data } = useSuspenseQuery(SteamPriceService.getPrice(appId))
  const { t } = useTranslation('steam')
  return (
    <PageContainer>
      <img src={data?.image} alt={data?.name} loading="lazy" />
      <h1 className="text-3xl">{data?.name}</h1>
      <p className="text-xl">
        {data?.price} {data?.currency}{' '}
        {(data?.discount ?? 0) > 0 && `(-${data?.discount}%)`}
      </p>
      <Button
        onClick={() => {
          // open link in new tab
          window.open(`https://steamdb.info/app/${data?.app_id}`, '_blank')
        }}
      >
        {t('steam.openInSteamDB')}
      </Button>
    </PageContainer>
  )
}
