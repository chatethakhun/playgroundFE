import ColorForm from '@/components/ui/Kits/ColorForm'
import LoadingFullPage from '@/components/ui/LoadingFullPage'
import PageContainer from '@/components/ui/PageContainer'

import colorService from '@/services/v2/color.service'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/gunpla-kits/kits/colors/$colorId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { colorId } = Route.useParams()
  const { data: colors } = useSuspenseQuery(colorService.getAllColorQuery())

  // const { data: color } = useQuery({
  //   queryFn: () => getColor(colorId),
  //   queryKey: ['color', colorId],
  //   enabled: !!colorId && !colors.find((c) => c._id === colorId),
  // })

  // console.log(colors)
  //

  const { data: color } = useSuspenseQuery({
    ...colorService.getColorByIdQuery(colorId),
    initialData: () => colors.find((c) => c.id === colorId),
  })

  if (!color) return <LoadingFullPage></LoadingFullPage>

  return (
    <PageContainer>
      <ColorForm color={color} />
    </PageContainer>
  )
}
