import { styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'

export const Header = styled.header.withConfig({
  componentId: 'lsui-sc-message-thread-header',
})`
  display: flex;
  width: 100%;
  min-width: 0;
  align-items: center;
  gap: ${tokens.spacing[3]};
`

export const Action = styled.div`
  display: inline-flex;
  min-width: 0;
  flex: 0 0 auto;
  align-items: center;
`

export const Identity = styled.div`
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  align-items: center;
  gap: ${tokens.spacing[3]};
`

export const Text = styled.div`
  min-width: 0;
  flex: 1 1 auto;
`

export const Title = styled.h2`
  overflow: hidden;
  margin: 0;
  color: ${tokens.color.content.default};
  font-size: ${tokens.typography.fontSize.md};
  font-weight: ${tokens.typography.fontWeight.semibold};
  line-height: ${tokens.typography.lineHeight.snug};
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Subtitle = styled.p`
  overflow: hidden;
  margin: ${tokens.spacing[1]} 0 0;
  color: ${tokens.color.content.muted};
  font-size: ${tokens.typography.fontSize.xs};
  line-height: ${tokens.typography.lineHeight.snug};
  text-overflow: ellipsis;
  white-space: nowrap;
`
