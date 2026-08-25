import { forwardRef } from 'react'
import { useCompoundControlContext } from '../../internal/CompoundControlContext'
import { useFieldControlAttributes } from '../../internal/FieldControlContext'
import * as Styled from './styles'
import type { TextareaInputProps } from './types'

const isInvalid = (value: TextareaInputProps['aria-invalid']) =>
  value === true || value === 'true'

export const TextareaInput = forwardRef<
  HTMLTextAreaElement,
  TextareaInputProps
>(function TextareaInput({ size = 'md', ...props }, ref) {
  const compoundControl = useCompoundControlContext()
  const fieldAttributes = useFieldControlAttributes(props)
  const invalid =
    isInvalid(fieldAttributes['aria-invalid']) ||
    Boolean(compoundControl?.invalid)

  return (
    <Styled.Textarea
      {...props}
      {...fieldAttributes}
      aria-invalid={invalid || undefined}
      disabled={props.disabled || compoundControl?.disabled}
      ref={ref}
      $invalid={invalid}
      $size={compoundControl?.size ?? size}
    />
  )
})

export type { TextareaInputProps } from './types'
export type { FieldControlSize as TextareaInputSize } from '../../foundations/fields'
