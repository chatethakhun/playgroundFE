import Overview from '@/components/ui/Kits/Overview'

import MenuTab from '@/components/ui/MenuTab'
import PageContainer from '@/components/ui/PageContainer'
import { createFileRoute } from '@tanstack/react-router'
import { lazy, useMemo, useState } from 'react'

const KitPart = lazy(() => import('@/components/ui/Kits/KitPart'))
const KitSubassembly = lazy(() => import('@/components/ui/Kits/KitSubassembly'))
const Runners = lazy(() => import('@/components/ui/Kits/Runners'))

export const Route = createFileRoute(
  '/_authenticated/gunpla-kits/kits/$kitId/',
)({
  component: RouteComponent,
})

const TABS = ['Overview', 'Runners', 'Subassemblies', 'Parts']

function RouteComponent() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { kitId } = Route.useParams()
  const renderTab = useMemo(() => {
    switch (currentIndex) {
      case 0:
        return <Overview kitId={kitId} />
      case 1:
        return <Runners kitId={kitId} />
      case 2:
        return <KitSubassembly kitId={kitId} />
      case 3:
        return <KitPart kitId={kitId} />
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
