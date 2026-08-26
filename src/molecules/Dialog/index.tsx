import { ModalLayer } from '../../internal/ModalLayer'
import { OverlayCloseButton } from '../OverlayCloseButton'
import type { DialogProps } from './types'

export function Dialog(props: DialogProps) {
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
      kind="dialog"
    />
  )
}

export type { DialogProps } from './types'
export type {
  OverlayDismissal as DialogDismissal,
  OverlayPanelProps as DialogPanelProps,
  OverlaySize as DialogSize,
} from '../../internal/ModalLayer/types'
