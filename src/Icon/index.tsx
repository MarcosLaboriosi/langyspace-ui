import * as Styled from './styles'
import type { IconProps } from './types'

export function Icon({ icon }: IconProps) {
  return icon ? <Styled.Icon>{icon}</Styled.Icon> : null
}
