import Overview from '@/components/ui/Kits/Overview'
import LoadingFullPage from '@/components/ui/LoadingFullPage'

import MenuTab from '@/components/ui/MenuTab'
import PageContainer from '@/components/ui/PageContainer'
import { getKit } from '@/services/gunplaKits/kit.service'
import { queryClient } from '@/utils/queryClient'
import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useMemo, useState } from 'react'

const KitPart = lazy(() => import('@/components/ui/Kits/KitPart'))
const KitSubassembly = lazy(() => import('@/components/ui/Kits/KitSubassembly'))
const Runners = lazy(() => import('@/components/ui/Kits/Runners'))

// กำหนด query key + fetcher
const kitQuery = (kitId: string) => ({
  queryKey: ['kit', kitId],
  queryFn: () => getKit(kitId),
})

export const Route = createFileRoute(
  '/_authenticated/gunpla-kits/kits/$kitId/',
)({
  loader: async ({ params: { kitId } }) => {
    const kit = await queryClient.ensureQueryData(kitQuery(kitId))
    return { kit }
  },
  head: ({ loaderData }) => {
    return {
      meta: [
        { title: `${loaderData?.kit?.name ?? ''} | Kit`, description: 'Kit' },
      ],
    }
  },
  component: RouteComponent,
})

const TABS = [
  'kit:overview.title',
  'runner:runner.title',
  'subassembly:subassembly.title',
  'part:part.title',
]

function RouteComponent() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { kitId } = Route.useParams()

  const renderTab = useMemo(() => {
    switch (currentIndex) {
      case 0:
        return <Overview kitId={kitId} />
      case 1:
        return (
          <Suspense fallback={<LoadingFullPage></LoadingFullPage>}>
            <Runners kitId={kitId} />
          </Suspense>
        )
      case 2:
        return (
          <Suspense fallback={<LoadingFullPage></LoadingFullPage>}>
            <KitSubassembly kitId={kitId} />
          </Suspense>
        )
      case 3:
        return (
          <Suspense fallback={<LoadingFullPage></LoadingFullPage>}>
            <KitPart kitId={kitId} />
          </Suspense>
        )
      default:
        return <Overview kitId={kitId} />
    }
  }, [currentIndex, kitId])
  return (
    <PageContainer>
      <MenuTab
        tabs={TABS}
        currentIndex={currentIndex}
        onChange={setCurrentIndex}
      />

      {renderTab}
    </PageContainer>
  )
}
