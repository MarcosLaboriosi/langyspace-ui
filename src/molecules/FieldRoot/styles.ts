import { styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'

export const Root = styled.div.withConfig({
  componentId: 'lsui-sc-field-root',
})`
  display: grid;
  min-width: 0;
  gap: ${tokens.spacing[2]};
`

export const Label = styled.label`
  color: ${tokens.color.neutral[600]};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.bold};
  line-height: ${tokens.typography.lineHeight.snug};
`

export const Hint = styled.p`
  margin: 0;
  color: ${tokens.color.neutral[600]};
  font-size: 0.71875rem;
  line-height: ${tokens.typography.lineHeight.normal};
`

export const Error = styled.p`
  margin: 0;
  color: ${tokens.color.feedback.danger};
  font-size: 0.71875rem;
  font-weight: ${tokens.typography.fontWeight.medium};
  line-height: ${tokens.typography.lineHeight.normal};
`
