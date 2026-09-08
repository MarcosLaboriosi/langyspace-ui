import type { ComponentPropsWithRef, ReactNode } from 'react'

export interface MessageThreadHeaderProps extends Omit<
  ComponentPropsWithRef<'header'>,
  'children' | 'title'
> {
  imageUrl?: string
  initials: string
  leadingAction?: ReactNode
  subtitle?: string
  title: string
  trailingAction?: ReactNode
}
