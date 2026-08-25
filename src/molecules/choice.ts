import type { ReactNode } from 'react'

export type ChoiceValue = string | number

export interface ChoiceOption<Value extends ChoiceValue = string> {
  accessibleLabel?: string
  disabled?: boolean
  label: ReactNode
  value: Value
}
