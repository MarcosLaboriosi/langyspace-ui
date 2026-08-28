import type { ComponentPropsWithRef, ReactNode } from 'react'

export type ActionMenuAlign = 'start' | 'end'
export type ActionMenuSize = 'sm' | 'md'
export type ActionMenuTone = 'neutral' | 'danger'

export interface ActionMenuItem {
  disabled?: boolean
  icon?: ReactNode
  id: string
  isLoading?: boolean
  label: string
  onSelect: () => void
  tone?: ActionMenuTone
}

export interface ActionMenuProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'children'
> {
  align?: ActionMenuAlign
  defaultOpen?: boolean
  items: readonly ActionMenuItem[]
  onOpenChange?: (open: boolean) => void
  open?: boolean
  size?: ActionMenuSize
  triggerLabel: string
}

export interface ActionMenuMenuStyleProps {
  $align: ActionMenuAlign
  $placement: ActionMenuPlacement
}

export interface ActionMenuItemStyleProps {
  $size: ActionMenuSize
  $tone: ActionMenuTone
}

export type ActionMenuPlacement = 'bottom' | 'top'
