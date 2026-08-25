import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type StatusChipTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'brand'
export type StatusChipSize = 'sm' | 'md'

export interface StatusChipProps extends Omit<
  ComponentPropsWithoutRef<'span'>,
  'color'
> {
  children: ReactNode
  iconStart?: ReactNode
  indicator?: boolean
  size?: StatusChipSize
  tone?: StatusChipTone
}
