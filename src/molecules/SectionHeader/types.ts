import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type SectionHeaderLevel = 2 | 3 | 4
export type SectionHeaderSpacing = 'default' | 'flush'

export interface SectionHeaderProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'title'
> {
  actions?: ReactNode
  headingLevel?: SectionHeaderLevel
  meta?: ReactNode
  spacing?: SectionHeaderSpacing
  title: ReactNode
}
