import React, { memo } from 'react'

const DetailItem = memo(
  ({ label, value, renderValue }: { label: string; value?: string, renderValue?: React.ReactNode }) => {
    return (
      <div className="flex gap-2 items-center">
        <span className="font-bold ">{label}:</span>
        {
          !renderValue  ? <span className="text-gray-500">{value}</span> : renderValue
        }
      </div>
    )
  },
  (prev, nexte) => prev.label === nexte.label && prev.value === nexte.value,
)

export default DetailItem
