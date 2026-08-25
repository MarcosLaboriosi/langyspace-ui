import { forwardRef } from 'react'
import { useCompoundControlContext } from '../../internal/CompoundControlContext'
import { useFieldControlAttributes } from '../../internal/FieldControlContext'
import * as Styled from './styles'
import type { SelectInputProps } from './types'

const isInvalid = (value: SelectInputProps['aria-invalid']) =>
  value === true || value === 'true'

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  function SelectInput({ size = 'md', ...props }, ref) {
    const compoundControl = useCompoundControlContext()
    const fieldAttributes = useFieldControlAttributes(props)
    const invalid =
      isInvalid(fieldAttributes['aria-invalid']) ||
      Boolean(compoundControl?.invalid)

    return (
      <Styled.Select
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

export type { SelectInputProps } from './types'
export type { FieldControlSize as SelectInputSize } from '../../foundations/fields'
