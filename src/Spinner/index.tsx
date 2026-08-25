import * as Styled from './styles'
import type { SpinnerProps } from './types'

export function Spinner({ size = 'inherit', ...props }: SpinnerProps) {
  return <Styled.Spinner {...props} $size={size} aria-hidden="true" />
}
