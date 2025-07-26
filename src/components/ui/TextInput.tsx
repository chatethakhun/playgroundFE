import { cn } from '@/utils/cn'

interface ITextInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  placeholder: string
  id: string
  icon?: React.ReactNode
  errorMessage?: string
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
}: ITextInput) => {
  return (
    <fieldset className="flex flex-col gap-2 relative">
      {label && <label className="text-dark">{label}</label>}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
        className={cn(
          'rounded-md border-border border-1 bg-white py-2 px-4 text-dark rounde-lg focus:outline-dark-gray',
          {
            'bg-light-gray': disabled,
            'border-red-500 border-2': errorMessage,
          },
        )}
      />
      <div className="absolute right-2 top-2">{icon}</div>
      {errorMessage && (
        <p className="text-red-500 text-sm font-bold px-1">{errorMessage}</p>
      )}
    </fieldset>
  )
}

export default TextInput
