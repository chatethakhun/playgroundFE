import { memo, useRef } from 'react'
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
        <X className="w-4 h-4 text-red-500" onClick={onRemoveTag} />
      </li>
    )
  },
  (prev, next) => prev.tag === next.tag,
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
}: ITagInput) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const addTag = (tag: string) => {
    onChange([...tags, tag])
  }
  const onRemoveTag = (i: number) => {
    onChange(tags.filter((_, index) => index !== i))
  }

  const isEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    return e.key === 'Enter'
  }

  const isComma = (e: React.KeyboardEvent<HTMLInputElement>) => {
    return e.key === ','
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    if ((isEnter(e) || isComma(e)) && !!value) {
      addTag(e.currentTarget.value)

      setTimeout(() => {
        if (!inputRef.current) return
        inputRef.current.focus()
        inputRef.current.value = ''
      }, 200)
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
              key={`${i}_${tag}`}
              tag={tag}
              onRemoveTag={() => onRemoveTag(i)}
            />
          ))}
          <li className="input-tag__tags__input">
            <input
              id={id}
              name={name}
              type="text"
              onKeyDown={onKeyDown}
              ref={(c) => {
                inputRef.current = c
              }}
              placeholder={placeholder || 'Add a tag'}
              className="px-2 focus:outline-none"
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
