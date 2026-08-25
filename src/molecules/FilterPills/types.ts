import type { HTMLAttributes } from 'react'
import type { CompatibleAccessibleName } from '../../foundations/accessibility'
import type { ChoiceOption, ChoiceValue } from '../../foundations/selection'

export type FilterPillsOverflow = 'scroll' | 'wrap'
export type FilterPillsSize = 'sm' | 'md'

export type FilterPillsProps<Value extends ChoiceValue = string> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'aria-label' | 'aria-labelledby' | 'onChange'
> &
  CompatibleAccessibleName & {
    counts?: Partial<Record<Value, number>>
    onChange: (value: Value) => void
    options: readonly ChoiceOption<Value>[]
    overflow?: FilterPillsOverflow
    size?: FilterPillsSize
    value: Value
  }
