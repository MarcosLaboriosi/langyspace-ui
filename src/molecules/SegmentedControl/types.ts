import type { HTMLAttributes } from 'react'
import type { CompatibleAccessibleName } from '../../foundations/accessibility'
import type { ChoiceOption, ChoiceValue } from '../../foundations/selection'

export type SegmentedControlShape = 'pill' | 'rounded'
export type SegmentedControlSurface = 'inverse' | 'light'

export type SegmentedControlProps<Value extends ChoiceValue = string> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'aria-label' | 'aria-labelledby' | 'onChange'
> &
  CompatibleAccessibleName & {
    onChange: (value: Value) => void
    options: readonly ChoiceOption<Value>[]
    shape?: SegmentedControlShape
    surface?: SegmentedControlSurface
    value: Value
  }
