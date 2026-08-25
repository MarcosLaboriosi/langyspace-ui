import * as Styled from './styles'
import type { PressableProps } from './types'

export function Pressable({ type = 'button', ...nativeProps }: PressableProps) {
  return <Styled.Pressable {...nativeProps} type={type} />
}
