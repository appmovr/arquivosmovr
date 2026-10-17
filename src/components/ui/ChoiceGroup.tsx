import { useId } from 'react'
import type { Option } from '@/features/profile/profileOptions'
import { cn } from '@/utils/cn'

interface ChoiceGroupProps<T extends string> {
  legend: string
  options: readonly Option<T>[]
  value: T | ''
  onChange: (value: T) => void
  error?: string
}

/** Grupo de opções de escolha única (radio) em formato de cartões. */
export function ChoiceGroup<T extends string>({ legend, options, value, onChange, error }: ChoiceGroupProps<T>) {
  const name = useId()

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm font-semibold">{legend}</legend>
      {options.map((option) => {
        const selected = option.value === value
        return (
          <label
            key={option.value}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lime',
              selected ? 'border-lime bg-surface-raised' : 'border-surface-line bg-surface hover:bg-surface-raised',
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={cn(
                'grid size-5 shrink-0 place-items-center rounded-full border',
                selected ? 'border-lime' : 'border-mute-faint',
              )}
            >
              {selected && <span className="size-2.5 rounded-full bg-lime" />}
            </span>
            <span>
              <span className="block font-semibold">{option.label}</span>
              {option.description && <span className="block text-sm text-mute">{option.description}</span>}
            </span>
          </label>
        )
      })}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </fieldset>
  )
}
