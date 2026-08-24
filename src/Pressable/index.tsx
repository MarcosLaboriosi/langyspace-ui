import * as Styled from './styles'
import type { PressableProps } from './types'

export function Pressable({ type = 'button', ...props }: PressableProps) {
  return <Styled.Pressable {...props} type={type} />
}
