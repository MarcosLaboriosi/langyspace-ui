import { forwardRef } from 'react'
import { useFieldControlAttributes } from '../../internal/FieldControlContext'
import * as Styled from './styles'
import type { SelectInputProps } from './types'

const isInvalid = (value: SelectInputProps['aria-invalid']) =>
  value === true || value === 'true'

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  function SelectInput({ size = 'md', ...props }, ref) {
    const fieldAttributes = useFieldControlAttributes(props)

    return (
      <Styled.Select
        {...props}
        {...fieldAttributes}
        ref={ref}
        $invalid={isInvalid(fieldAttributes['aria-invalid'])}
        $size={size}
      />
    )
  },
)

export type { SelectInputProps } from './types'
export type { FieldControlSize as SelectInputSize } from '../../foundations/fields'
