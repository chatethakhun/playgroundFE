import Input from 'rsuite/Input'

interface ITextInput {
  label?: string
  id: string
  icon?: React.ReactNode
  errorMessage?: string
  onChange: (value: string) => void
  value?: string
  type?: string
  disabled?: boolean
  placeholder?: string
  name?: string
}
const TextInput = ({
  label,
  placeholder,
  id,
  icon,
  errorMessage,
  onChange,
  value,
  type = 'text',
  disabled = false,
  name,
}: ITextInput) => {
  return (
    <fieldset className="space-y-1 relative">
      {label && <label className="text-dark">{label}</label>}
      <Input
        name={name}
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoComplete="off"
        disabled={disabled}
      />
      <div className="absolute right-2 top-2">{icon}</div>
      {errorMessage && <p className="text-red-500 text-xs ">{errorMessage}</p>}
    </fieldset>
  )
}

export default TextInput
