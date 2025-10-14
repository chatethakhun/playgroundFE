import FloatButton from '@/components/ui/FloatButton'
import ColorForm from '@/components/ui/Kits/ColorForm'
import ListColors from '@/components/ui/Kits/ListColor'

import PageContainer from '@/components/ui/PageContainer'
import useModal from '@/hooks/useModal'

import { getAllColorQuery } from '@/services/v2/color.service'
import { queryClient } from '@/utils/queryClient'
import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { lazy } from 'react'

const CustomModal = lazy(() => import('@/components/ui/Modal'))

export const Route = createFileRoute(
  '/_authenticated/gunpla-kits/kits/colors/',
)({
  loader: async () => {
    const colors = queryClient.ensureQueryData(getAllColorQuery())
    return colors
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { isOpen, openModal, closeModal } = useModal()
  return (
    <PageContainer>
      <ListColors />
      <FloatButton onClick={() => openModal()}>
        <Plus className="w-6 h-6" strokeWidth={2} />
      </FloatButton>
      <CustomModal modalIsOpen={isOpen} onClose={closeModal}>
        <ColorForm onClose={closeModal} />
      </CustomModal>
    </PageContainer>
  )
}
