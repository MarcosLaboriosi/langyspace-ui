import type { InputHTMLAttributes } from 'react'
import type { FieldControlSize } from '../../foundations/fields'

export interface TextInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  size?: FieldControlSize
}
