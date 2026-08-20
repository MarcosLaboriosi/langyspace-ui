import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'

export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonIconPosition = 'start' | 'end'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  fullWidth?: boolean
  icon?: ReactNode
  iconPosition?: ButtonIconPosition
  isLoading?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}

export interface ButtonStyleProps {
  $fullWidth: boolean
  $size: ButtonSize
  $variant: ButtonVariant
}
