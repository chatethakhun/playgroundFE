import { memo, useMemo } from 'react'

import SelectPicker from 'rsuite/SelectPicker'
type Option = {
  label: string
  value: string
  disabled?: boolean
}

interface IDropDown {
  id?: string
  value?: string
  disabled?: boolean
  label?: string
  icon?: React.ReactNode
  errorMessage?: string
  placeholder?: string
  options: Array<Option>
  onChange: (value: string | number | null) => void
  name?: string
}

const DropDown = memo((props: IDropDown) => {
  const disabledItemValues = useMemo(() => {
    return props.options.filter((op) => op.disabled).map((op) => op.value)
  }, [props.options])
  return (
    <fieldset className="flex flex-col gap-2 relative">
      {props.label && <label className="text-dark">{props.label}</label>}
      <SelectPicker
        id={props.id}
        name={props.name}
        // className={cn(
        //   'rounded-md border-border border-1 bg-white py-2.5 px-4 text-dark rounde-lg focus:outline-dark-gray',
        //   {
        //     'bg-light-gray': props.disabled,
        //     'border-red-500 border-2': props.errorMessage,
        //   },
        // )}
        data={props.options.map((op) => ({
          value: op.value,
          label: <div>{op.label}</div>,
        }))}
        value={props.value}
        onChange={props.onChange}
        searchable={false}
        disabledItemValues={disabledItemValues}
        block
      />
      {/*<option selected>{props.placeholder ?? 'Choose an option'}</option>*/}
      {/*{(props.options || []).map((option) => (
          <RSDropdown.Item
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </RSDropdown.Item>
        ))}*/}

      {props.errorMessage && (
        <p className="text-red-500 text-sm font-bold px-1">
          {props.errorMessage}
        </p>
      )}
    </fieldset>
  )
})

export default DropDown
