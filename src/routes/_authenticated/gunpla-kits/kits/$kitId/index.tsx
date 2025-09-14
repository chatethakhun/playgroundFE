import KitPart from '@/components/ui/Kits/KitPart'
import KitSubassembly from '@/components/ui/Kits/KitSubassembly'
import Overview from '@/components/ui/Kits/Overview'
import Runners from '@/components/ui/Kits/Runners'
import MenuTab from '@/components/ui/MenuTab'
import PageContainer from '@/components/ui/PageContainer'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

export const Route = createFileRoute('/_authenticated/gunpla-kits/kits/$kitId/')(
  {
    component: RouteComponent,
  },
)

const TABS = ['Overview', 'Runners', 'Subassemblies', 'Parts', 'BOM Summary']

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
      case 4:
        return <div>BOM Summary</div>
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
