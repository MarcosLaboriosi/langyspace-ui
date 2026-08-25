import type { InputHTMLAttributes } from 'react'
import type { CompatibleAccessibleName } from '../../foundations/accessibility'
import type { FieldControlSize } from '../../foundations/fields'
import type { CompoundControlSurface } from '../CompoundControl/types'

type NativeProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'aria-label' | 'aria-labelledby' | 'size' | 'type'
>

export type SearchInputProps = NativeProps &
  CompatibleAccessibleName & {
    clearLabel?: string
    onClear?: () => void
    size?: FieldControlSize
    surface?: CompoundControlSurface
  }
