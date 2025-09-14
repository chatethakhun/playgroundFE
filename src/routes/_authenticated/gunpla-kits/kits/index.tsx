import Button from '@/components/ui/Button'
import ListKits from '@/components/ui/Kits/ListKits'

import PageContainer from '@/components/ui/PageContainer'
import useCustomRouter from '@/hooks/useCustomRouter'
import { createFileRoute } from '@tanstack/react-router'
import { ToyBrick } from 'lucide-react'

import GunplaSVG from '@/assets/images/gunpla.svg'

export const Route = createFileRoute('/_authenticated/gunpla-kits/kits/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { goTo } = useCustomRouter()
  return (
    <PageContainer>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img src={GunplaSVG} alt="gunpla" className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-primary">My Gunpla Kits</h1>
        </div>

        <Button onClick={() => goTo('/gunpla-kits/kits/new')}>
          <div className="flex items-center gap-2">
            + <ToyBrick className="text-xs w-4 h-4" />
          </div>
        </Button>
      </div>

      <ListKits />
    </PageContainer>
  )
}
