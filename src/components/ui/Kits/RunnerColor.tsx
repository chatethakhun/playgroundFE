import { memo } from 'react'

const RunnerColor = memo(
  ({ color }: { color: string }) => {
    return (
      <div
        style={{
          backgroundColor: color,
        }}
        className="w-2 h-8 rounded-sm border border-gray-100"
      ></div>
    )
  },
  (prev, next) => prev.color === next.color,
)

export default RunnerColor
