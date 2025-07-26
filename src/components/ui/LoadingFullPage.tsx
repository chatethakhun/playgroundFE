import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import PageContainer from './PageContainer'

const LoadingFullPage = () => {
  return (
    <PageContainer>
      <div className="flex justify-center items-center-safe h-[100%] relative ">
        <AiOutlineLoading3Quarters className="text-primary animate-spin text-2xl" />
      </div>
    </PageContainer>
  )
}

export default LoadingFullPage
