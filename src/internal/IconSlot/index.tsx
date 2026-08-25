import * as Styled from './styles'
import type { IconSlotProps } from './types'

export function IconSlot({ icon }: IconSlotProps) {
  return icon ? <Styled.IconSlot>{icon}</Styled.IconSlot> : null
}
