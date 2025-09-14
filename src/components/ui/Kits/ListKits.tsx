import { getKits } from '@/services/gunplaKits/kit.service'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import LoadingFullPage from '../LoadingFullPage'
import ListItemContainer from '../ListItemContainer'
import useCustomRouter from '@/hooks/useCustomRouter'
import Button from '../Button'

const KitItem = memo(
  ({
    kitName,
    grade,
    kitId,
  }: {
    kitName: string
    grade: string
    kitId: string
  }) => {
    const { goTo } = useCustomRouter()
    return (
      <ListItemContainer>
        <div>
          <h6 className="text-primary font-bold">{kitName}</h6>
          <span className="text-gray-500 text-sm">Sizing: {grade}</span>
        </div>
        <div className="ml-auto">
          <Button onClick={() => goTo('/gunpla-kits/kits/' + kitId)}>
            View
          </Button>
        </div>
      </ListItemContainer>
    )
  },
  (prev, next) => prev.kitName === next.kitName && prev.grade === next.grade,
)

const ListKits = memo(() => {
  const { data, isLoading } = useQuery({
    queryKey: ['kits'],
    queryFn: () => getKits(),
  })

  if (isLoading) return <LoadingFullPage />
  return (
    <div className="flex flex-col gap-4 divide-gray-500">
      {data?.map((kit) => (
        <KitItem
          key={kit._id}
          kitId={kit._id}
          kitName={kit.name}
          grade={kit.grade}
        />
      ))}
    </div>
  )
})

export default ListKits
