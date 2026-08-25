import type { SelectHTMLAttributes } from 'react'
import type { FieldControlSize } from '../fieldControlStyles'

export interface SelectInputProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'size'
> {
  size?: FieldControlSize
}
