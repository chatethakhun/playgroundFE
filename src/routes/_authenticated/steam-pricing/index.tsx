import LoadingFullPage from '@/components/ui/LoadingFullPage'
import PageContainer from '@/components/ui/PageContainer'
import SteamPricing from '@/components/ui/steam-pricing/SteamPricing'
import useCustomRouter from '@/hooks/useCustomRouter'
import { SteamPriceService } from '@/services/steam/price.service'
import { queryClient } from '@/utils/queryClient'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import FlexboxGrid from 'rsuite/FlexboxGrid'

export const Route = createFileRoute('/_authenticated/steam-pricing/')({
  component: RouteComponent,
  loader: async () => {
    const data = await queryClient.ensureQueryData(
      SteamPriceService.getAllGamesWatchList(),
    )

    return data
  },
})

function RouteComponent() {
  const { data, isLoading } = useSuspenseQuery(
    SteamPriceService.getAllGamesWatchList(),
  )

  const { goTo } = useCustomRouter()

  if (isLoading) return <LoadingFullPage />
  return (
    <PageContainer>
      <FlexboxGrid className="gap-2">
        {(data ?? []).map((game) => (
          <SteamPricing
            key={game.id}
            name={game.name}
            steam_db_url={game.steam_db_url}
            onClick={() => {
              goTo(`/steam-pricing/${game.app_id}`)
            }}
          />
        ))}
      </FlexboxGrid>
    </PageContainer>
  )
}
