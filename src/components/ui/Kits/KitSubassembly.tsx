import { getKitSubassemblies } from '@/services/gunplaKits/kit.service'
import { useQuery } from '@tanstack/react-query'
import { lazy, memo } from 'react'
import FloatButton from '../FloatButton'
import { Plus } from 'lucide-react'
import useModal from '@/hooks/useModal'
import LoadingFullPage from '../LoadingFullPage'
import KitSubassemblyForm from './KitSubassemblyForm'
import NoData from '../NoData'
const CustomModal = lazy(() => import('../Modal'))

const KitSubassemblyItem = memo(
  ({ kitSubassembly }: { kitSubassembly: KitSubassembly }) => {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-col">
          <div className="text-sm font-medium">{kitSubassembly.name}</div>
        </div>
      </div>
    )
  },
  (prev, next) => prev.kitSubassembly._id === next.kitSubassembly._id,
)

const KitSubassembly = memo(({ kitId }: { kitId: string }) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getKitSubassemblies(kitId),
    enabled: !!kitId,
    queryKey: ['kit', kitId, 'subassemblies'],
  })
  const { isOpen, openModal, closeModal } = useModal()

  if (isLoading) return <LoadingFullPage />

  return (
    <>
      {data?.length === 0 && <NoData />}
      {data?.map((kitSubassembly) => (
        <KitSubassemblyItem
          key={kitSubassembly._id}
          kitSubassembly={kitSubassembly}
        />
      ))}
      <CustomModal modalIsOpen={isOpen} onClose={closeModal}>
        <KitSubassemblyForm kitId={kitId} />
      </CustomModal>
      <FloatButton onClick={() => openModal()}>
        <Plus className="w-6 h-6" strokeWidth={2} />
      </FloatButton>
    </>
  )
})
export default KitSubassembly
