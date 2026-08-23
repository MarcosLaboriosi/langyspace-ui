import type { ComponentPropsWithRef, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'

export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  children: ReactNode
  fullWidth?: boolean
  iconEnd?: ReactNode
  iconStart?: ReactNode
  isLoading?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}

export interface ButtonStyleProps {
  $fullWidth: boolean
  $size: ButtonSize
  $variant: ButtonVariant
}
