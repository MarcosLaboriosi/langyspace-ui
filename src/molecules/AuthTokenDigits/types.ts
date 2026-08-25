import type { HTMLAttributes } from 'react'

type AccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: string }
  | { 'aria-label'?: string; 'aria-labelledby': string }

export type AuthTokenDigitsProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> &
  AccessibleName & {
    autoFocus?: boolean
    digitLabel: string
    disabled?: boolean
    hasError?: boolean
    idPrefix: string
    length: number
    value?: string
    onTokenChange: (token: string) => void
  }
