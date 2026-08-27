import type { HTMLAttributes, ReactNode, RefObject } from 'react'

export type OverlayDismissal =
  'blocked' | 'escape-and-backdrop' | 'escape-only' | 'explicit-only'

export type OverlayKind = 'dialog' | 'drawer'
export type OverlaySize = 'lg' | 'md' | 'sm'

export type OverlayPanelProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  | 'aria-describedby'
  | 'aria-labelledby'
  | 'aria-modal'
  | 'children'
  | 'onKeyDown'
  | 'role'
  | 'title'
> & {
  [attribute: `data-${string}`]: string | number | undefined
}

export interface OverlayShellProps {
  children: ReactNode
  closeLabel: string
  description?: ReactNode
  dismissal?: OverlayDismissal
  fallbackFocusRef?: RefObject<HTMLElement | null>
  footer?: ReactNode
  initialFocusRef?: RefObject<HTMLElement | null>
  onClose: () => void
  open: boolean
  panelProps?: OverlayPanelProps
  returnFocusRef?: RefObject<HTMLElement | null>
  size?: OverlaySize
  title: ReactNode
}

export interface ModalLayerProps extends OverlayShellProps {
  closeControl: ReactNode
  kind: OverlayKind
}
