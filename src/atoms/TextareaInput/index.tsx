import { forwardRef } from 'react'
import { useFieldControlAttributes } from '../../internal/FieldControlContext'
import * as Styled from './styles'
import type { TextareaInputProps } from './types'

const isInvalid = (value: TextareaInputProps['aria-invalid']) =>
  value === true || value === 'true'

export const TextareaInput = forwardRef<
  HTMLTextAreaElement,
  TextareaInputProps
>(function TextareaInput({ size = 'md', ...props }, ref) {
  const fieldAttributes = useFieldControlAttributes(props)

  return (
    <Styled.Textarea
      {...props}
      {...fieldAttributes}
      ref={ref}
      $invalid={isInvalid(fieldAttributes['aria-invalid'])}
      $size={size}
    />
  )
})

export type { TextareaInputProps } from './types'
export type { FieldControlSize as TextareaInputSize } from '../fieldControlStyles'
