import type { ComponentPropsWithRef, ReactNode } from 'react'
import type {
  ActionDensity,
  ActionShape,
  ActionSize,
  ActionTone,
  ActionVariant,
} from '../../foundations/actions/types'

export type ButtonVariant = ActionVariant

export type ButtonTone = ActionTone

export type ButtonSize = ActionSize

export type ButtonDensity = ActionDensity

export type ButtonShape = ActionShape

interface ButtonBaseProps extends ComponentPropsWithRef<'button'> {
  children: ReactNode
  density?: ButtonDensity
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
  $density: ButtonDensity
  $fullWidth: boolean
  $iconOnly: boolean
  $shape: ButtonShape
  $size: ButtonSize
  $tone: ButtonTone
  $variant: ButtonVariant
}
