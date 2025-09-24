import { memo } from 'react'

const DashboardContainer = memo(
  ({ children }: { children: React.ReactNode }) => {
    return <div className="pr-3 py-3">{children}</div>
  },
)

export default DashboardContainer
