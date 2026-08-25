import type { HTMLAttributes } from 'react'
import type { AccessibleName } from '../../foundations/accessibility'
import type { ChoiceOption, ChoiceValue } from '../../foundations/selection'

export type SegmentedControlShape = 'pill' | 'rounded'
export type SegmentedControlSurface = 'inverse' | 'light'

export type SegmentedControlProps<Value extends ChoiceValue = string> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'aria-label' | 'aria-labelledby' | 'onChange'
> &
  AccessibleName & {
    onChange: (value: Value) => void
    options: readonly ChoiceOption<Value>[]
    shape?: SegmentedControlShape
    surface?: SegmentedControlSurface
    value: Value
  }
