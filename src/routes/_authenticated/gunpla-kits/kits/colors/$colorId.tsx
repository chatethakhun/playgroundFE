import ColorForm from '@/components/ui/Kits/ColorForm'
import PageContainer from '@/components/ui/PageContainer'
import {
  getColorQuery,
  getColorsQuery,
} from '@/services/gunplaKits/color.service'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/gunpla-kits/kits/colors/$colorId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { colorId } = Route.useParams()
  const { data: colors } = useSuspenseQuery(getColorsQuery())

  // const { data: color } = useQuery({
  //   queryFn: () => getColor(colorId),
  //   queryKey: ['color', colorId],
  //   enabled: !!colorId && !colors.find((c) => c._id === colorId),
  // })

  // console.log(colors)
  //

  const { data: color } = useSuspenseQuery({
    ...getColorQuery(colorId),
    initialData: () => colors.find((c) => c._id === colorId),
  })

  return (
    <PageContainer>
      <ColorForm color={color} />
    </PageContainer>
  )
}
