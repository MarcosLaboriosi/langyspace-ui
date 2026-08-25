import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type StatePanelDensity = 'compact' | 'regular'
export type StatePanelState = 'empty' | 'error' | 'loading' | 'partial'
export type StatePanelSurface = 'dashed' | 'outlined'

export interface StatePanelProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'title'
> {
  action?: ReactNode
  density?: StatePanelDensity
  description?: ReactNode
  fill?: boolean
  icon?: ReactNode
  state: StatePanelState
  surface?: StatePanelSurface
  title: ReactNode
}
