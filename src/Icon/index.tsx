import * as Styled from './styles'
import type { IconProps } from './types'

export function Icon({ icon, isLoading = false }: IconProps) {
  const content = isLoading ? <Styled.Spinner aria-hidden="true" /> : icon

  return content ? <Styled.Icon>{content}</Styled.Icon> : null
}
