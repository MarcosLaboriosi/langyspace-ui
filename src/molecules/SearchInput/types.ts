import type { InputHTMLAttributes } from 'react'
import type { FieldControlSize } from '../../atoms/fieldControlStyles'
import type { CompoundControlSurface } from '../CompoundControl/types'

type SearchInputAccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: string }
  | { 'aria-label'?: string; 'aria-labelledby': string }

type NativeProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'aria-label' | 'aria-labelledby' | 'size' | 'type'
>

export type SearchInputProps = NativeProps &
  SearchInputAccessibleName & {
    clearLabel?: string
    onClear?: () => void
    size?: FieldControlSize
    surface?: CompoundControlSurface
  }
