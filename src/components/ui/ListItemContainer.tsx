import { memo } from 'react'

const ListItemContainer = memo(
  ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex items-center gap-2 p-4 border-b border-gray-500">
        {children}
      </div>
    )
  },
)

export default ListItemContainer
