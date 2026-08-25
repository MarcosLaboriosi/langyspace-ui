import { styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'
import type { SectionHeaderSpacing } from './types'

const titleFlexBasis = '16rem'

export const Header = styled.div.withConfig({
  componentId: 'lsui-sc-section-header',
})<{ $spacing: SectionHeaderSpacing }>`
  display: flex;
  width: 100%;
  min-width: 0;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: ${tokens.spacing[3]};
  margin-top: ${({ $spacing }) => ($spacing === 'flush' ? 0 : tokens.spacing[8])};
  margin-bottom: ${tokens.spacing[4]};
`

export const Title = styled.h2`
  min-width: 0;
  flex: 1 1 ${titleFlexBasis};
  margin: 0;
  color: ${tokens.color.content.default};
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.bold};
  line-height: ${tokens.typography.lineHeight.snug};
  overflow-wrap: anywhere;
`

export const Aside = styled.div`
  display: inline-flex;
  min-width: 0;
  max-width: 100%;
  flex-wrap: wrap;
  align-items: center;
  gap: ${tokens.spacing[2]};
  margin-left: auto;
`

export const Meta = styled.span`
  color: ${tokens.color.content.muted};
  font-size: ${tokens.typography.fontSize.sm};
`
