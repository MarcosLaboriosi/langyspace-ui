import type { ComponentPropsWithRef, ReactNode } from 'react'
import type {
  ActionDensity,
  ActionRecipeStyleProps,
  ActionSize,
  ActionVariant,
} from '../../foundations/actions/types'

export type ButtonVariant = ActionVariant

export type ButtonSize = ActionSize

export type ButtonDensity = ActionDensity

type NativeButtonProps = Omit<
  ComponentPropsWithRef<'button'>,
  'children' | 'color'
>

export interface ButtonProps extends NativeButtonProps {
  children: ReactNode
  density?: ButtonDensity
  fullWidth?: boolean
  iconEnd?: ReactNode
  iconStart?: ReactNode
  isLoading?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}

export type ButtonStyleProps = ActionRecipeStyleProps
