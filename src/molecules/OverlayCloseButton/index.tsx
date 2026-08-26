import { IconButton } from '../../atoms/IconButton'
import * as Styled from './styles'
import type { OverlayCloseButtonProps } from './types'

export function OverlayCloseButton({
  disabled,
  label,
  onClick,
}: OverlayCloseButtonProps) {
  return (
    <IconButton
      aria-label={label}
      disabled={disabled}
      shape="rounded"
      size="sm"
      variant="subtle"
      onClick={onClick}
    >
      <Styled.Glyph aria-hidden="true" />
    </IconButton>
  )
}
