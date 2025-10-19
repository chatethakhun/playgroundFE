import { memo, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ITagInput extends React.InputHTMLAttributes<HTMLInputElement> {
  tags: Array<string>
  handleTag: (tags: Array<string>) => void
  label?: string
  errorMessage?: string
}

const TagItem = memo(
  ({ tag, onRemoveTag }: { tag: string; onRemoveTag?: () => void }) => {
    return (
      <li className="input-tag__tags__item border border-primary rounded-sm px-2 py-0 flex gap-2 items-center">
        {tag}
        <X
          className="w-4 h-4 text-red-500 cursor-pointer"
          onClick={onRemoveTag}
        />
      </li>
    )
  },
)

const TagInput = ({
  tags,
  handleTag: onChange,
  label,
  placeholder,
  id,
  name,
  errorMessage,
  disabled,
  type = 'text',
}: ITagInput) => {
  const [inputValue, setInputValue] = useState('') // 👈 ใช้ state แทน ref

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      // 👈 ป้องกัน duplicate
      onChange([...tags, trimmedTag])
    }
  }

  const onRemoveTag = (i: number) => {
    onChange(tags.filter((_, index) => index !== i))
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault() // 👈 ป้องกัน default behavior

      if (inputValue.trim()) {
        addTag(inputValue)
        setInputValue('') // 👈 clear โดยใช้ state
      }
    }
  }

  return (
    <fieldset className="flex flex-col gap-2 relative">
      {label && <label className="text-dark">{label}</label>}
      <div
        className={cn(
          'rounded-md border-border border-1 bg-white py-2 px-4 text-dark rounde-lg focus:outline-dark-gray',
          {
            'bg-light-gray': disabled,
            'border-red-500 border-2': errorMessage,
          },
        )}
      >
        <ul className="input-tag__tags flex gap-1 flex-wrap">
          {tags.map((tag, i) => (
            <TagItem
              key={`${tag}_${i}`} // 👈 เปลี่ยน key order
              tag={tag}
              onRemoveTag={() => onRemoveTag(i)}
            />
          ))}
          <li className="input-tag__tags__input">
            <input
              id={id}
              name={name}
              type={type}
              value={inputValue} // 👈 controlled input
              onChange={(e) => setInputValue(e.target.value)} // 👈 update state
              onKeyDown={onKeyDown}
              autoComplete="off"
              placeholder={placeholder || 'Add a tag'}
              className="focus:outline-none"
              disabled={disabled}
            />
          </li>
        </ul>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm font-bold px-1">{errorMessage}</p>
      )}
    </fieldset>
  )
}

export default TagInput
