import * as Styled from './styles'
import type { SpinnerProps } from './types'

export function Spinner({ size = 'inherit', ...nativeProps }: SpinnerProps) {
  return <Styled.Spinner {...nativeProps} $size={size} aria-hidden="true" />
}
