import PageContainer from './PageContainer'
import { Loader } from 'lucide-react'

const LoadingFullPage = () => {
  return (
    <PageContainer>
      <div className="flex justify-center items-center-safe h-[100%] relative ">
        <Loader className="text-primary animate-spin text-2xl" />
      </div>
    </PageContainer>
  )
}

export default LoadingFullPage
