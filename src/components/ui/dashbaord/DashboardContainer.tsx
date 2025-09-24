import { memo } from 'react'

const DashboardContainer = memo(
  ({
    children,
    flexDirection = 'column',
  }: {
    children: React.ReactNode
    flexDirection?: 'row' | 'column'
  }) => {
    return (
      <div
        className="pr-3 py-3 flex gap-4 rounded-sm"
        style={{ flexDirection }}
      >
        {children}
      </div>
    )
  },
)

export default DashboardContainer
