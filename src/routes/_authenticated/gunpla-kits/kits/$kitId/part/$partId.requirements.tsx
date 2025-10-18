import RequireItem from '@/components/ui/Kits/RequireItem'
import LoadingFullPage from '@/components/ui/LoadingFullPage'
import PageContainer from '@/components/ui/PageContainer'
import kitPartRequirementService from '@/services/v2/kitPartRequirement.service'
import { queryClient } from '@/utils/queryClient'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

export const Route = createFileRoute(
  '/_authenticated/gunpla-kits/kits/$kitId/part/$partId/requirements',
)({
  component: RouteComponent,
  loader: async ({ params }) => {
    const data = await queryClient.ensureQueryData(
      kitPartRequirementService.getAllKitPartRequirementsQuery(
        Number(params.partId),
        Number(params.kitId),
      ),
    )
    return data
  },
})

function RouteComponent() {
  const { kitId, partId } = Route.useParams()
  const { t } = useTranslation()
  const target = useRef<number | undefined>(undefined)
  const { data, isLoading } = useSuspenseQuery(
    kitPartRequirementService.getAllKitPartRequirementsQuery(
      Number(partId),
      Number(kitId),
    ),
  )

  const { mutate: compareSync } = useMutation({
    mutationFn: (data: Array<CompareSyncPayload>) =>
      kitPartRequirementService.requirementCompareSync(Number(kitId), data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [
          'kits',
          Number(kitId),
          'kit_parts',
          Number(partId),
          'requirements',
        ],
      })

      toast.success(t('common.success'), { position: 'bottom-center' })
    },
  })

  const checked = useCallback(
    (kitReq: KitRequirementWithRunnerAndColor) => {
      const targetToChange = kitReq.id
      const newCheck = !kitReq.is_cut
      target.current = targetToChange
      const newData = data?.map((item) => {
        if (item.id === targetToChange) {
          return {
            ...item,
            is_cut: newCheck,
          }
        }
        return item
      })

      compareSync(newData)
    },
    [data],
  )

  if (isLoading || !data) return <LoadingFullPage />
  return (
    <PageContainer>
      {data.map((item, index) => (
        <RequireItem
          key={index}
          item={item}
          onChecked={(data) => {
            checked(data)
          }}
        />
      ))}
    </PageContainer>
  )
}
