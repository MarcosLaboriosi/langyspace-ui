import type { HTMLAttributes } from 'react'
import type { AccessibleName } from '../../foundations/accessibility'

export type AuthTokenDigitsProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'aria-label' | 'aria-labelledby' | 'onChange'
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
