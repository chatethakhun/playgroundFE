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
        className="rounded-md border-border bg-light-gray border-1 py-2 px-4 text-dark rounde-lg focus:outline-dark-gray-"
      />
      <div className="absolute right-2 top-2">{icon}</div>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </fieldset>
  )
}

export default TextInput
