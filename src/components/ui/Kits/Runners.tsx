import { lazy, memo } from 'react'
import LoadingFullPage from '../LoadingFullPage'
import { getKitRunners } from '@/services/gunplaKits/kit.service'
import { useQuery } from '@tanstack/react-query'
import { Plus, PencilIcon } from 'lucide-react'
import FloatButton from '../FloatButton'
import useModal from '@/hooks/useModal'
import RunnerForm from './RunnerForm'
import useCustomRouter from '@/hooks/useCustomRouter'
import { useTranslation } from 'react-i18next'
import NoData from '../NoData'

const CustomModal = lazy(() => import('../Modal'))

const RunnerItem = memo(
  ({ runner }: { runner: Runner }) => {
    const { goTo } = useCustomRouter()
    const { t } = useTranslation('runner')
    const backgroundColor =
      typeof runner.color === 'string' ? '#ffffff' : runner.color.hex
    return (
      <div className="flex gap-2 items-center border-b-gray-500 border-b p-2">
        <div className="flex  items-center  gap-2 basis-[20%] md:basis-[10%]">
          <span
            className="text-gray-500 text-sm w-4 h-4 border rounded-sm"
            style={{
              backgroundColor,
            }}
          ></span>
          {runner.code}
        </div>
        <span className="text-gray-500 text-sm">
          {t('runner:runner.qty')}:{' '}
          <span className="font-bold text-primary">{runner.qty}</span>
        </span>

        <div className="ml-auto">
          <PencilIcon
            className="w-6 h-6 cursor-pointer text-primary"
            onClick={() => {
              console.log('edit')
              goTo(`/gunpla-kits/kits/${runner.kit}/runners/${runner._id}`)
            }}
          />
        </div>
      </div>
    )
  },
  (prev, next) => prev.runner._id === next.runner._id,
)

const Runners = memo(({ kitId }: { kitId: string }) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getKitRunners(kitId),
    queryKey: ['kits', kitId, 'runners'],
    enabled: !!kitId,
  })

  const { isOpen, openModal, closeModal } = useModal()

  if (isLoading) return <LoadingFullPage />
  return (
    <>
      {data?.length === 0 && <NoData />}
      {data?.map((runner) => (
        <RunnerItem key={runner._id} runner={runner} />
      ))}
      <CustomModal modalIsOpen={isOpen} onClose={closeModal}>
        <RunnerForm kitId={kitId} />
      </CustomModal>
      <FloatButton onClick={() => openModal()}>
        <Plus className="w-6 h-6" strokeWidth={2} />
      </FloatButton>
    </>
  )
})

export default Runners
