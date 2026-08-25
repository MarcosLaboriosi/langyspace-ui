import type { HTMLAttributes } from 'react'
import type { AccessibleName } from '../../foundations/accessibility'

export type AuthTokenLength = 4 | 6

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
    length: AuthTokenLength
    value?: string
    onTokenChange: (token: string) => void
  }
