import { forwardRef } from 'react'
import { useFieldControlAttributes } from '../../internal/FieldControlContext'
import * as Styled from './styles'
import type { TextInputProps } from './types'

const isInvalid = (value: TextInputProps['aria-invalid']) =>
  value === true || value === 'true'

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ size = 'md', ...props }, ref) {
    const fieldAttributes = useFieldControlAttributes(props)

    return (
      <Styled.Input
        {...props}
        {...fieldAttributes}
        ref={ref}
        $invalid={isInvalid(fieldAttributes['aria-invalid'])}
        $size={size}
      />
    )
  },
)

export type { TextInputProps } from './types'
export type { FieldControlSize as TextInputSize } from '../../foundations/fields'
