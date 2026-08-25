import type { TextareaHTMLAttributes } from 'react'
import type { FieldControlSize } from '../fieldControlStyles'

export interface TextareaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: FieldControlSize
}
