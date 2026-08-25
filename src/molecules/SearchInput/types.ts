import type { InputHTMLAttributes } from 'react'
import type { CompatibleAccessibleName } from '../../foundations/accessibility'
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
  CompatibleAccessibleName & {
    size?: FieldControlSize
    surface?: CompoundControlSurface
  } & ClearAction
