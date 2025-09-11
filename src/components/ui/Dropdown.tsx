import { cn } from '@/utils/cn'
import { memo } from 'react'

type Option = {
  label: string
  value: string
}

interface IDropDown extends React.InputHTMLAttributes<HTMLSelectElement> {
  label?: string
  icon?: React.ReactNode
  errorMessage?: string
  placeholder?: string
  options: Array<Option>
}

const DropDown = memo((props: IDropDown) => {
  return (
    <fieldset className="flex flex-col gap-2 relative">
      {props.label && <label className="text-dark">{props.label}</label>}
      <select
        id={props.id}
        className={cn(
          'rounded-md border-border border-1 bg-white py-2.5 px-4 text-dark rounde-lg focus:outline-dark-gray',
          {
            'bg-light-gray': props.disabled,
            'border-red-500 border-2': props.errorMessage,
          },
        )}
        value={props.value}
        onChange={props.onChange}
      >
        <option selected>{props.placeholder ?? 'Choose an option'}</option>
        {(props.options || []).map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {props.errorMessage && (
        <p className="text-red-500 text-sm font-bold px-1">
          {props.errorMessage}
        </p>
      )}
    </fieldset>
  )
})

export default DropDown
