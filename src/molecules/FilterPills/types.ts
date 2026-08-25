import type { HTMLAttributes } from 'react'
import type { ChoiceOption, ChoiceValue } from '../choice'

export type FilterPillsOverflow = 'scroll' | 'wrap'
export type FilterPillsSize = 'sm' | 'md'

type AccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: string }
  | { 'aria-label'?: string; 'aria-labelledby': string }

export type FilterPillsProps<Value extends ChoiceValue = string> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'aria-label' | 'onChange'
> &
  AccessibleName & {
    counts?: Partial<Record<Value, number>>
    onChange: (value: Value) => void
    options: readonly ChoiceOption<Value>[]
    overflow?: FilterPillsOverflow
    size?: FilterPillsSize
    value: Value
  }
