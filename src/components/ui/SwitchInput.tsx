import { Switch } from './switch'

const SwitchInput = ({
  checked,
  onCheckedChange,
  label,
  id,
  name,
}: {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label?: string
  id?: string
  name?: string
}) => {
  return (
    <fieldset className="flex items-center gap-2">
      <Switch
        id={id}
        name={name}
        checked={checked}
        onCheckedChange={(e) => onCheckedChange(e)}
      />
      {label && <label className="text-dark">{label}</label>}
    </fieldset>
  )
}

export default SwitchInput
