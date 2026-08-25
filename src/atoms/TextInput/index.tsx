import { forwardRef } from 'react'
import { useCompoundControlContext } from '../../internal/CompoundControlContext'
import { useFieldControlAttributes } from '../../internal/FieldControlContext'
import * as Styled from './styles'
import type { TextInputProps } from './types'

const isInvalid = (value: TextInputProps['aria-invalid']) =>
  value === true || value === 'true'

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ size = 'md', ...props }, ref) {
    const compoundControl = useCompoundControlContext()
    const fieldAttributes = useFieldControlAttributes(props)
    const invalid =
      isInvalid(fieldAttributes['aria-invalid']) ||
      Boolean(compoundControl?.invalid)

    return (
      <Styled.Input
        {...props}
        {...fieldAttributes}
        aria-invalid={invalid || undefined}
        disabled={props.disabled || compoundControl?.disabled}
        ref={ref}
        $invalid={invalid}
        $size={compoundControl?.size ?? size}
      />
    )
  },
)

export type { TextInputProps } from './types'
export type { FieldControlSize as TextInputSize } from '../../foundations/fields'
