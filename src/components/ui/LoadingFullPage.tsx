import { Loader } from 'lucide-react'
import { memo } from 'react'

const LoadingFullPage = memo(() => {
  return (
    <div className="flex justify-center items-center-safe h-full relative ">
      <Loader className="text-primary animate-spin text-2xl" />
    </div>
  )
})

export default LoadingFullPage
