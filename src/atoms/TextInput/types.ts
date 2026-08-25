import type { InputHTMLAttributes } from 'react'
import type { FieldControlSize } from '../fieldControlStyles'

export interface TextInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  size?: FieldControlSize
}
