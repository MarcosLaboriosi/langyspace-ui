import { ModalLayer } from '../../internal/ModalLayer'
import { OverlayCloseButton } from '../OverlayCloseButton'
import type { DrawerProps } from './types'

export function Drawer(props: DrawerProps) {
  return (
    <ModalLayer
      {...props}
      closeControl={
        <OverlayCloseButton
          disabled={props.dismissal === 'blocked'}
          label={props.closeLabel}
          onClick={props.onClose}
        />
      }
      kind="drawer"
    />
  )
}

export type { DrawerProps } from './types'
export type {
  OverlayDismissal as DrawerDismissal,
  OverlayPanelProps as DrawerPanelProps,
  OverlaySize as DrawerSize,
} from '../../internal/ModalLayer/types'
