import { getKit } from '@/services/gunplaKits/kit.service'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import LoadingFullPage from '../LoadingFullPage'
import ListItemContainer from '../ListItemContainer'

const Overview = memo(({ kitId }: { kitId: string }) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getKit(kitId),
    queryKey: ['kits', kitId],
  })

  if (isLoading) return <LoadingFullPage />

  return (
    <div>
      <ListItemContainer>
        <h6 className="text-primary font-bold">Kit Name: </h6>
        <span className="text-gray-500 text-sm font-bold">{data?.name}</span>
      </ListItemContainer>
      <ListItemContainer>
        <h6 className="text-primary font-bold">Kit grade: </h6>
        <span className="text-gray-500 text-sm font-bold">{data?.grade}</span>
      </ListItemContainer>
      <ListItemContainer>
        <h6 className="text-primary font-bold">Number of runners: </h6>
        <span className="text-gray-500 text-sm font-bold">
          {data?.runners.length}
        </span>
      </ListItemContainer>
    </div>
  )
})

export default Overview
