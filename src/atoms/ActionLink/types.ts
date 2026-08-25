import type { ComponentPropsWithRef, ReactNode } from 'react'
import type {
  ActionDensity,
  ActionRecipeStyleProps,
  ActionSize,
} from '../../foundations/actions/types'

export type ActionLinkVariant = 'primary' | 'secondary' | 'tertiary' | 'brand'

interface ActionLinkBaseProps extends Omit<
  ComponentPropsWithRef<'a'>,
  'aria-disabled' | 'children' | 'color' | 'href'
> {
  children: ReactNode
  density?: ActionDensity
  fullWidth?: boolean
  href: string
  iconEnd?: ReactNode
  iconStart?: ReactNode
  size?: ActionSize
  variant?: ActionLinkVariant
}

export type ActionLinkProps = ActionLinkBaseProps

export interface ActionLinkStyleProps extends ActionRecipeStyleProps {
  $variant: ActionLinkVariant
}
