import PageContainer from '@/components/ui/PageContainer'
import ListWorkout from '@/components/ui/workout/ListWorkout'
import useCustomRouter from '@/hooks/useCustomRouter'

import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { memo } from 'react'

export const Route = createFileRoute('/_authenticated/fitnesstracker/workout/')(
  {
    component: RouteComponent,
  },
)

const FloatAddButton = memo(() => {
  const { goTo } = useCustomRouter()
  return (
    <button
      className="absolute right-4 bottom-20 rounded-full bg-primary p-2 text-white"
      onClick={() => goTo('/fitnesstracker/workout/new')}
    >
      <Plus className="w-6 h-6" />
    </button>
  )
})

function RouteComponent() {
  return (
    <PageContainer>
      <ListWorkout />
      <FloatAddButton />
    </PageContainer>
  )
}
