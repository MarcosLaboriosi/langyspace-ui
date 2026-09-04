import { css, styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'
import type { FieldLabelVariant } from './types'

export const Root = styled.div.withConfig({
  componentId: 'lsui-sc-field-root',
})`
  display: grid;
  min-width: 0;
  gap: ${tokens.spacing[2]};
`

const labelVariants = {
  default: css`
    color: ${tokens.color.content.secondary};
    font-weight: ${tokens.typography.fontWeight.bold};
    line-height: ${tokens.typography.lineHeight.snug};
  `,
  eyebrow: css`
    margin-bottom: ${tokens.spacing[1]};
    color: ${tokens.color.content.muted};
    font-weight: ${tokens.typography.fontWeight.semibold};
    letter-spacing: 0.08em;
    line-height: ${tokens.typography.lineHeight.normal};
    text-transform: uppercase;
  `,
}

export const Label = styled.label<{ $variant: FieldLabelVariant }>`
  font-size: ${tokens.typography.fontSize.xs};
  ${({ $variant }) => labelVariants[$variant]}
`

export const Hint = styled.p`
  margin: 0;
  color: ${tokens.color.content.muted};
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
