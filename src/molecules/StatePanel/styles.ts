import { styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'
import type { StatePanelDensity, StatePanelSurface } from './types'

const compactDescriptionFontSize = '0.8125rem'
const compactDescriptionOffset = '0.4375rem'
const compactPanelGap = '0.625rem'
const compactPanelPadding = '1.875rem'
const contentMaxWidth = '32rem'
const filledPanelMinHeight = '13.125rem'

export const Container = styled.div.withConfig({
  componentId: 'lsui-sc-state-panel',
})<{
  $density: StatePanelDensity
  $fill: boolean
  $surface: StatePanelSurface
}>`
  display: grid;
  min-width: 0;
  min-height: ${({ $fill }) => ($fill ? filledPanelMinHeight : 'auto')};
  align-content: center;
  justify-items: center;
  gap: ${({ $density }) => ($density === 'compact' ? compactPanelGap : tokens.spacing[2])};
  padding: ${({ $density }) => ($density === 'compact' ? compactPanelPadding : `${tokens.spacing[16]} ${tokens.spacing[5]}`)};
  border-width: 1px;
  border-style: ${({ $surface }) => ($surface === 'dashed' ? 'dashed' : 'solid')};
  border-color: ${({ $surface }) =>
    $surface === 'dashed'
      ? tokens.color.surfaceBorder.default
      : tokens.color.surfaceBorder.subtle};
  border-radius: ${tokens.radius.card};
  color: ${tokens.color.neutral[600]};
  background: ${tokens.color.neutral[0]};
  text-align: center;
`
export const Icon = styled.span`
  display: inline-flex;
  flex-shrink: 0;
`
export const Content = styled.div`
  max-width: ${contentMaxWidth};
`
export const Title = styled.strong`
  display: block;
  color: ${tokens.color.neutral[950]};
  font-size: ${tokens.typography.fontSize.md};
  font-weight: ${tokens.typography.fontWeight.semibold};
  line-height: ${tokens.typography.lineHeight.snug};
`
export const Description = styled.div<{ $density: StatePanelDensity }>`
  margin-top: ${({ $density }) => ($density === 'compact' ? compactDescriptionOffset : tokens.spacing[1])};
  font-size: ${({ $density }) => ($density === 'compact' ? compactDescriptionFontSize : tokens.typography.fontSize.sm)};
  line-height: ${tokens.typography.lineHeight.normal};
`
export const Action = styled.div<{ $density: StatePanelDensity }>`
  display: inline-flex;
  justify-content: center;
  margin-top: ${({ $density }) => ($density === 'compact' ? 0 : tokens.spacing[1])};
`
