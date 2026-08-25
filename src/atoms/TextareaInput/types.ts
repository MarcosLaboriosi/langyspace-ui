import type { TextareaHTMLAttributes } from 'react'
import type { FieldControlSize } from '../../foundations/fields'

export interface TextareaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: FieldControlSize
}
