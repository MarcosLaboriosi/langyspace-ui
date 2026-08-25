import type { ReactElement, ReactNode } from 'react'

export type ChoiceValue = string | number

interface ChoiceOptionBase<Value extends ChoiceValue> {
  disabled?: boolean
  value: Value
}

type AccessibleChoiceLabel =
  | { accessibleLabel?: string; label: string }
  | { accessibleLabel: string; label: ReactElement }

export interface CompatibleChoiceOption<
  Value extends ChoiceValue = string,
> extends ChoiceOptionBase<Value> {
  accessibleLabel?: string
  label: ReactNode
}

export type ChoiceOption<Value extends ChoiceValue = string> =
  ChoiceOptionBase<Value> & AccessibleChoiceLabel

export type AccessibleChoiceOption<Value extends ChoiceValue = string> =
  ChoiceOption<Value>
