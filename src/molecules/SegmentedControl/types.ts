import type { HTMLAttributes } from 'react'
import type { ChoiceOption } from '../choice'

export type SegmentedControlShape = 'pill' | 'rounded'
export type SegmentedControlSurface = 'inverse' | 'light'

type AccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: string }
  | { 'aria-label'?: string; 'aria-labelledby': string }

export type SegmentedControlProps<Value extends string = string> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'aria-label' | 'onChange'
> &
  AccessibleName & {
    onChange: (value: Value) => void
    options: readonly ChoiceOption<Value>[]
    shape?: SegmentedControlShape
    surface?: SegmentedControlSurface
    value: Value
  }
