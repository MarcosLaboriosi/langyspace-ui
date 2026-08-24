import type { ComponentPropsWithRef, ReactNode } from 'react'

export type ButtonVariant =
  'primary' | 'secondary' | 'tertiary' | 'danger' | 'success'

export type ButtonTone = 'neutral' | 'brand'

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
}

type AccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby': string }

type ButtonContentProps =
  | (ButtonBaseProps & { iconOnly?: false })
  | (ButtonBaseProps &
      AccessibleName & {
        iconEnd?: never
        iconOnly: true
        iconStart?: never
      })

type ButtonSemanticProps =
  | { tone?: 'neutral'; variant?: ButtonVariant }
  | { tone: 'brand'; variant?: 'primary' }

export type ButtonProps = ButtonContentProps & ButtonSemanticProps

export interface ButtonStyleProps {
  $fullWidth: boolean
  $iconOnly: boolean
  $shape: ButtonShape
  $size: ButtonSize
  $tone: ButtonTone
  $variant: ButtonVariant
}
