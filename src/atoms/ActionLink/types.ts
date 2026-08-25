import type { ComponentPropsWithRef, ReactNode } from 'react'
import type {
  ActionDensity,
  ActionRecipeStyleProps,
  ActionShape,
  ActionSize,
  ActionTone,
} from '../../foundations/actions/types'

export type ActionLinkVariant = 'primary' | 'secondary' | 'tertiary'

interface ActionLinkBaseProps extends Omit<
  ComponentPropsWithRef<'a'>,
  'aria-disabled' | 'children' | 'href'
> {
  children: ReactNode
  density?: ActionDensity
  fullWidth?: boolean
  href: string
  iconEnd?: ReactNode
  iconStart?: ReactNode
  shape?: ActionShape
  size?: ActionSize
}

type ActionLinkSemanticProps =
  | { tone?: 'neutral'; variant?: ActionLinkVariant }
  | { tone: 'brand'; variant?: 'primary' }

export type ActionLinkProps = ActionLinkBaseProps & ActionLinkSemanticProps

export interface ActionLinkStyleProps extends ActionRecipeStyleProps {
  $variant: ActionLinkVariant
  $tone: ActionTone
}
