import type { HTMLAttributes } from 'react'
import type { CompatibleAccessibleName } from '../../foundations/accessibility'

export type AuthTokenDigitsProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'aria-label' | 'aria-labelledby' | 'onChange'
> &
  CompatibleAccessibleName & {
    autoFocus?: boolean
    digitLabel: string
    disabled?: boolean
    hasError?: boolean
    idPrefix: string
    length: number
    value?: string
    onTokenChange: (token: string) => void
  }
