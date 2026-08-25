import type { ReactNode } from 'react'

export interface ChoiceOption<Value extends string = string> {
  accessibleLabel?: string
  disabled?: boolean
  label: ReactNode
  value: Value
}
