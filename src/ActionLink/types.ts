import type { ComponentPropsWithRef, ReactNode } from 'react'
import type {
  ButtonDensity,
  ButtonShape,
  ButtonSize,
  ButtonTone,
} from '../Button/types'
import type { ActionRecipeStyleProps } from '../actionRecipe'

export type ActionLinkVariant = 'primary' | 'secondary' | 'tertiary'

interface ActionLinkBaseProps extends Omit<
  ComponentPropsWithRef<'a'>,
  'aria-disabled' | 'children' | 'href'
> {
  children: ReactNode
  density?: ButtonDensity
  fullWidth?: boolean
  href: string
  iconEnd?: ReactNode
  iconStart?: ReactNode
  shape?: ButtonShape
  size?: ButtonSize
}

type ActionLinkSemanticProps =
  | { tone?: 'neutral'; variant?: ActionLinkVariant }
  | { tone: 'brand'; variant?: 'primary' }

export type ActionLinkProps = ActionLinkBaseProps & ActionLinkSemanticProps

export interface ActionLinkStyleProps extends ActionRecipeStyleProps {
  $variant: ActionLinkVariant
  $tone: ButtonTone
}
