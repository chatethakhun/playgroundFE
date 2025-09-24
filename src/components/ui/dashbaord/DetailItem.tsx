import { memo } from 'react'

const DetailItem = memo(
  ({ label, value }: { label: string; value: string }) => {
    return (
      <div className="flex gap-2 items-center">
        <span className="font-bold ">{label}:</span>
        <span className="text-gray-500">{value}</span>
      </div>
    )
  },
  (prev, nexte) => prev.label === nexte.label && prev.value === nexte.value,
)

export default DetailItem
