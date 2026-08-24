import type { ComponentPropsWithRef, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'

export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonShape = 'pill' | 'rounded'

interface ButtonBaseProps extends ComponentPropsWithRef<'button'> {
  children: ReactNode
  fullWidth?: boolean
  iconEnd?: ReactNode
  iconStart?: ReactNode
  isLoading?: boolean
  shape?: ButtonShape
  size?: ButtonSize
  variant?: ButtonVariant
}

type AccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby': string }

export type ButtonProps =
  | (ButtonBaseProps & { iconOnly?: false })
  | (ButtonBaseProps &
      AccessibleName & {
        iconEnd?: never
        iconOnly: true
        iconStart?: never
      })

export interface ButtonStyleProps {
  $fullWidth: boolean
  $iconOnly: boolean
  $shape: ButtonShape
  $size: ButtonSize
  $variant: ButtonVariant
}
