import type { SelectHTMLAttributes } from 'react'
import type { FieldControlSize } from '../../foundations/fields'

export interface SelectInputProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'size'
> {
  size?: FieldControlSize
}
