import { useQuery } from '@tanstack/react-query'
import { lazy, memo } from 'react'
import FloatButton from '../FloatButton'
import { Plus } from 'lucide-react'
import useModal from '@/hooks/useModal'
import LoadingFullPage from '../LoadingFullPage'
import KitSubassemblyForm from './KitSubassemblyForm'
import NoData from '../NoData'
import kitSubassemblyService from '@/services/v2/kitSubassembly.service'
const CustomModal = lazy(() => import('../Modal'))

const KitSubassemblyItem = memo(
  ({ kitSubassembly }: { kitSubassembly: KitSubassemblyV2 }) => {
    return (
      <div className="flex flex-col gap-2 border-b border-gray-200 p-2">
        <div className="flex gap-2 flex-col">
          <p className="text-sm font-medium line-clamp-1">
            {kitSubassembly.name}
          </p>
        </div>
      </div>
    )
  },
  (prev, next) => prev.kitSubassembly.id === next.kitSubassembly.id,
)

const KitSubassembly = memo(({ kitId }: { kitId: string }) => {
  const { data, isLoading } = useQuery({
    queryFn: () => kitSubassemblyService.getAllKitSubassemblies(kitId),
    enabled: !!kitId,
    queryKey: ['kit', Number(kitId), 'subassemblies'],
  })
  const { isOpen, openModal, closeModal } = useModal()

  if (isLoading) return <LoadingFullPage />

  return (
    <>
      {data?.length === 0 && <NoData />}
      {data?.map((kitSubassembly) => (
        <KitSubassemblyItem
          key={kitSubassembly.id}
          kitSubassembly={kitSubassembly}
        />
      ))}
      <br />
      <br />
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
