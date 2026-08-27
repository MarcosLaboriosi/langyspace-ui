import type { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'
import type { InputHTMLAttributes, ReactNode } from 'react'

export interface ControlledFieldBaseProps<TFieldValues extends FieldValues> {
  controlId?: string
  hint?: ReactNode
  error?: ReactNode
  label: ReactNode
  name: FieldPath<TFieldValues>
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>
}

export type ControlledFieldProps<TFieldValues extends FieldValues = FieldValues> =
  ControlledFieldBaseProps<TFieldValues> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>
