import { lazy, memo, useMemo } from 'react'
import LoadingFullPage from '../LoadingFullPage'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus, PencilIcon } from 'lucide-react'
import FloatButton from '../FloatButton'
import useModal from '@/hooks/useModal'
import RunnerForm from './RunnerForm'
import useCustomRouter from '@/hooks/useCustomRouter'
import { useTranslation } from 'react-i18next'
import NoData from '../NoData'
import RunnerColor from './RunnderColor'
import MultipleColorBox from './MultipleColorBox'
import { Check, X } from 'lucide-react'
import runnerService from '@/services/v2/runner.service'

const CustomModal = lazy(() => import('../Modal'))

const RunnerItem = memo(
  ({ runner }: { runner: RunnerColor }) => {
    const { goTo } = useCustomRouter()
    const { t } = useTranslation(['runner', 'color'])
    const queryClient = useQueryClient()
    const backgroundColor = runner.color.hex
    const isMultipleRunerColor =
      typeof runner.color === 'object' && (runner.color?.is_multiple || false)

    const isClearColor =
      typeof runner.color === 'string' ? false : runner.color?.is_clear || false

    const runnerIsCut = runner.is_used || false

    const { mutate: toggleRunner } = useMutation({
      mutationFn: () =>
        runnerService.updateIsUsed(Number(runner.id), {
          is_used: !runnerIsCut,
        }),
      onSuccess: (newData) => {
        if (!newData) return
        queryClient.setQueryData<Array<RunnerColor>>(
          ['kits', newData.kit_id, 'runners'],
          (oldData) => {
            if (!oldData) return oldData

            return oldData.map((r: RunnerColor) =>
              r.id === newData.id ? { ...runner, is_used: !runnerIsCut } : r,
            )
          },
        )
      },
    })
    return (
      <div className="flex gap-2 items-center border-b-gray-500 border-b p-2">
        <div className="flex  items-center  gap-2 basis-[30%] md:basis-[10%]">
          {!isMultipleRunerColor && <RunnerColor color={backgroundColor} />}
          {isMultipleRunerColor && <MultipleColorBox />}
          {runner.name}
          {isClearColor ? (
            <span className="text-gray-500 text-sm">
              ( {t('color:color.clear-color')} )
            </span>
          ) : (
            ''
          )}
        </div>
        <span className="text-gray-500 text-sm">
          {t('runner:runner.qty')}:{' '}
          <span className="font-bold text-primary">{runner.amount}</span>
        </span>

        <div className="ml-auto flex gap-4">
          {runnerIsCut ? (
            <X
              className="w-4 h-4 cursor-pointer  text-red-400"
              onClick={() => toggleRunner()}
            />
          ) : (
            <Check
              className="w-4 h-4 cursor-pointer text-green-400"
              onClick={() => toggleRunner()}
            />
          )}
          <PencilIcon
            className="w-3 h-3 cursor-pointer text-primary"
            onClick={() => {
              goTo(`/gunpla-kits/kits/${runner.kit_id}/runners/${runner.id}`)
            }}
          />
        </div>
      </div>
    )
  },
  (prev, next) =>
    prev.runner.id === next.runner.id &&
    prev.runner.is_used === next.runner.is_used,
)

const sortByRunnerCode = (a: RunnerColor, b: RunnerColor) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}

const sortedByIsCutAndRunnerCode = (a: RunnerColor, b: RunnerColor) => {
  if (a.is_used < b.is_used) return -1
  if (a.is_used > b.is_used) return 1
  return sortByRunnerCode(a, b)
}

const Runners = memo(({ kitId }: { kitId: string }) => {
  const { data, isLoading } = useQuery({
    queryFn: () => runnerService.getKitRunners(kitId),
    queryKey: ['kits', Number(kitId), 'runners'],
    enabled: !!kitId,
  })

  const { isOpen, openModal, closeModal } = useModal()

  const sortedData = useMemo(
    () => data?.sort(sortedByIsCutAndRunnerCode),
    [data],
  )

  if (isLoading) return <LoadingFullPage />
  return (
    <>
      {sortedData?.length === 0 && <NoData />}
      {sortedData?.map((runner) => (
        <RunnerItem key={runner.id} runner={runner} />
      ))}
      <br />
      <br />
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
