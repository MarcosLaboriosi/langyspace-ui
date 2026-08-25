import { css, styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'
import type { AuthNoticeTone } from './types'

const toneStyles = {
  error: css`
    color: ${tokens.color.feedback.danger};
    background-color: ${tokens.color.feedback.dangerSoft};
  `,
  info: css`
    color: ${tokens.color.feedback.info};
    background-color: ${tokens.color.feedback.infoSoft};
  `,
} satisfies Record<AuthNoticeTone, ReturnType<typeof css>>

export const Notice = styled.p.withConfig({
  componentId: 'lsui-sc-auth-notice',
})<{ $tone: AuthNoticeTone }>`
  margin: 0;
  border-radius: ${tokens.radius.rounded};
  padding: ${tokens.spacing[3]} ${tokens.spacing[4]};
  font-size: ${tokens.typography.fontSize.sm};

  ${({ $tone }) => toneStyles[$tone]}

  code {
    font-family:
      ui-monospace, 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
      monospace;
  }

  a {
    color: inherit;
    font-weight: ${tokens.typography.fontWeight.semibold};
    text-decoration-line: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.18em;
  }

  a:hover,
  a:focus-visible {
    text-decoration-thickness: 2px;
  }
`
