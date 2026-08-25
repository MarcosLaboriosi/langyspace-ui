import type { ComponentPropsWithRef, ReactNode } from 'react'
import type {
  ActionRecipeStyleProps,
  ActionShape,
  ActionSize,
} from '../../foundations/actions/types'

export type IconButtonVariant =
  'neutral' | 'subtle' | 'brand' | 'success' | 'danger' | 'inverse'

export type IconButtonSize = ActionSize

export type IconButtonShape = 'circle' | 'rounded'

type AccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby': string }

type NativeIconButtonProps = Omit<
  ComponentPropsWithRef<'button'>,
  'aria-label' | 'aria-labelledby' | 'children' | 'color'
>

export type IconButtonProps = NativeIconButtonProps &
  AccessibleName & {
    children: ReactNode
    isLoading?: boolean
    shape?: IconButtonShape
    size?: IconButtonSize
    variant?: IconButtonVariant
  }

export interface IconButtonStyleProps extends ActionRecipeStyleProps {
  $iconVariant: IconButtonVariant
  $shape: ActionShape
}
