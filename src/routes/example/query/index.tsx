import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getArticles } from '@/services/example/article.service'

export const Route = createFileRoute('/example/query/')({
  component: RouteComponent,
})
const queryClientProvider = new QueryClient()
function RouteComponent() {
  return (
    <QueryClientProvider client={queryClientProvider}>
      <Todos />
    </QueryClientProvider>
  )
}

const Todos = () => {
  // Queries
  const { data, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  })

  if (isLoading) {
    return <div className="flex flex-1  justify-center">Loading</div>
  }
  return (
    <div>
      {(data || []).map((article, index) => (
        <div
          className="px-2 border-b-2 border-b-gray-300 font-open-sans-regular"
          key={index}
        >
          {article.work.title}
        </div>
      ))}
    </div>
  )
}
