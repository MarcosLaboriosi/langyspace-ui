import * as Styled from './styles'
import type { AuthNoticeProps } from './types'

export function AuthNotice({
  children,
  tone = 'error',
  ...props
}: AuthNoticeProps) {
  return (
    <Styled.Notice {...props} $tone={tone}>
      {children}
    </Styled.Notice>
  )
}

export type { AuthNoticeProps, AuthNoticeTone } from './types'
