import { css, styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'
import type { FieldControlSize } from '../../atoms/fieldControlStyles'
import type { CompoundControlSurface } from './types'

const sizeStyles = {
  sm: css`
    min-height: ${tokens.field.height.sm};
    gap: ${tokens.spacing[2]};
    border-radius: ${tokens.radius.control};
    padding-right: ${tokens.spacing[3]};
    padding-left: ${tokens.spacing[3]};
  `,
  md: css`
    min-height: ${tokens.field.height.md};
    gap: ${tokens.spacing[2]};
    border-radius: ${tokens.radius.control};
    padding-right: ${tokens.spacing[3]};
    padding-left: ${tokens.spacing[3]};
  `,
  lg: css`
    min-height: 3rem;
    gap: ${tokens.spacing[3]};
    border-radius: ${tokens.radius.rounded};
    padding-right: ${tokens.spacing[3]};
    padding-left: ${tokens.spacing[3]};
  `,
} satisfies Record<FieldControlSize, ReturnType<typeof css>>

const surfaces = {
  muted: tokens.color.neutral[100],
  surface: tokens.color.neutral[0],
} satisfies Record<CompoundControlSurface, string>

export const Root = styled.div.withConfig({
  componentId: 'lsui-sc-compound-control',
})<{
  $disabled: boolean
  $invalid: boolean
  $size: FieldControlSize
  $surface: CompoundControlSurface
}>`
  display: flex;
  width: 100%;
  min-width: 0;
  align-items: center;
  border: 1px solid
    ${({ $invalid }) =>
      $invalid ? tokens.color.feedback.danger : tokens.color.neutral[400]};
  color: ${tokens.color.neutral[600]};
  background: ${({ $surface }) => surfaces[$surface]};
  transition:
    background-color ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive},
    border-color ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive},
    box-shadow ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive};

  ${({ $size }) => sizeStyles[$size]}

  &:hover:not([data-disabled='true']):not([data-invalid='true']) {
    border-color: ${tokens.color.neutral[500]};
  }

  &:focus-within {
    border-color: ${({ $invalid }) =>
      $invalid ? tokens.color.feedback.danger : tokens.color.neutral[500]};
    background: ${tokens.color.neutral[0]};
    box-shadow: ${tokens.shadow.focus};
  }

  &[data-disabled='true'] {
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[500]};
  }

  &&& > input,
  &&& > select,
  &&& > textarea,
  &&& > input:focus,
  &&& > input:focus-visible,
  &&& > select:focus,
  &&& > select:focus-visible,
  &&& > textarea:focus,
  &&& > textarea:focus-visible {
    border: 0;
    border-radius: 0;
    outline: 0;
    background: transparent;
    box-shadow: none;
  }
`

export const Slot = styled.span`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  color: inherit;

  > svg {
    flex-shrink: 0;
  }
`
