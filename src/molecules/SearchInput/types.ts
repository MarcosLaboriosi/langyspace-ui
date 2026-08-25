import type { InputHTMLAttributes } from 'react'
import type { AccessibleName } from '../../foundations/accessibility'
import type { FieldControlSize } from '../../foundations/fields'
import type { CompoundControlSurface } from '../CompoundControl/types'

type NativeProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'aria-label' | 'aria-labelledby' | 'size' | 'type'
>

type ClearAction =
  | { clearLabel?: never; onClear?: never }
  | { clearLabel: string; onClear: () => void }

export type SearchInputProps = NativeProps &
  AccessibleName & {
    size?: FieldControlSize
    surface?: CompoundControlSurface
  } & ClearAction
