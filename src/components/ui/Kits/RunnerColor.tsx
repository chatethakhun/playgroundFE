import { memo } from 'react'

const RunnerColor = memo(
  ({ color, name }: { color: string; name?: string }) => {
    return (
      <div className="flex items-center-safe gap-2">
        <div
          style={{
            backgroundColor: color,
          }}
          className="w-2 h-8 rounded-sm border border-gray-100"
        ></div>
        {name ?? ''}
      </div>
    )
  },
  (prev, next) => prev.color === next.color && prev.name === next.name,
)

export default RunnerColor
