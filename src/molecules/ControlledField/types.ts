import type { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'
import type { ReactNode } from 'react'
import type { TextInputProps } from '../../atoms/TextInput'
import type { FieldLabelVariant } from '../FieldRoot/types'

export interface ControlledFieldBaseProps<TFieldValues extends FieldValues> {
  controlId?: string
  hint?: ReactNode
  error?: ReactNode
  label: ReactNode
  labelVariant?: FieldLabelVariant
  name: FieldPath<TFieldValues>
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>
}

export type ControlledFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> = ControlledFieldBaseProps<TFieldValues> &
  Omit<TextInputProps, 'defaultValue' | 'name'>
