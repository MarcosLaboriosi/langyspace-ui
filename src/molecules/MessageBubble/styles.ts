import { styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'
import type { MessageBubbleSide, MessageBubbleStatus } from './types'

interface MessageBubbleStyleProps {
  $side: MessageBubbleSide
  $status?: MessageBubbleStatus
}

export const Container = styled.article.withConfig({
  componentId: 'lsui-sc-message-bubble',
})<MessageBubbleStyleProps>`
  display: flex;
  width: 100%;
  min-width: 0;
  justify-content: ${({ $side }) =>
    $side === 'outgoing' ? 'flex-end' : 'flex-start'};
`

export const Bubble = styled.div<MessageBubbleStyleProps>`
  width: fit-content;
  max-width: min(80%, 34rem);
  min-width: 0;
  padding: ${tokens.spacing[3]} ${tokens.spacing[4]};
  border: 1px solid
    ${({ $side, $status }) => {
      if ($status === 'failed') return tokens.color.feedback.danger
      if ($side === 'outgoing') return tokens.color.brand.default
      return tokens.color.surfaceBorder.subtle
    }};
  border-radius: ${({ $side }) =>
    $side === 'outgoing'
      ? `${tokens.radius.rounded} ${tokens.radius.rounded} ${tokens.spacing[1]} ${tokens.radius.rounded}`
      : `${tokens.radius.rounded} ${tokens.radius.rounded} ${tokens.radius.rounded} ${tokens.spacing[1]}`};
  color: ${({ $side, $status }) => {
    if ($status === 'failed') return tokens.color.feedback.dangerStrong
    if ($side === 'outgoing') return tokens.color.neutral[0]
    return tokens.color.content.default
  }};
  background: ${({ $side, $status }) => {
    if ($status === 'failed') return tokens.color.feedback.dangerSoft
    if ($side === 'outgoing') return tokens.color.brand.default
    return tokens.color.surface.muted
  }};
  box-shadow: ${tokens.shadow.subtle};
  overflow-wrap: anywhere;
`

export const Content = styled.div`
  font-size: ${tokens.typography.fontSize.sm};
  line-height: ${tokens.typography.lineHeight.normal};
  white-space: pre-wrap;
`

export const Meta = styled.footer<MessageBubbleStyleProps>`
  display: flex;
  min-width: 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: ${tokens.spacing[2]};
  margin-top: ${tokens.spacing[1]};
  color: ${({ $side, $status }) => {
    if ($status === 'failed') return tokens.color.feedback.dangerStrong
    if ($side === 'outgoing') return tokens.color.neutral[0]
    return tokens.color.content.muted
  }};
  font-size: ${tokens.typography.fontSize['2xs']};
  line-height: ${tokens.typography.lineHeight.normal};
`

export const Timestamp = styled.time`
  white-space: nowrap;
`

export const Status = styled.span`
  font-weight: ${tokens.typography.fontWeight.medium};
`
