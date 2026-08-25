import { css } from 'styled-components'
import { tokens } from '../foundations/tokens'

export type FieldControlSize = 'sm' | 'md' | 'lg'

export interface FieldControlStyleProps {
  $invalid: boolean
  $size: FieldControlSize
}

const heights = {
  lg: tokens.field.height.lg,
  md: tokens.field.height.md,
  sm: tokens.field.height.sm,
} satisfies Record<FieldControlSize, string>

export const fieldControlStyles = css<FieldControlStyleProps>`
  width: 100%;
  min-width: 0;
  min-height: ${({ $size }) => heights[$size]};
  border: 1px solid
    ${({ $invalid }) =>
      $invalid ? tokens.color.feedback.danger : tokens.color.neutral[400]};
  border-radius: ${tokens.radius.control};
  outline: none;
  background: ${tokens.color.neutral[0]};
  color: ${tokens.color.neutral[950]};
  font: inherit;
  font-size: ${tokens.typography.fontSize.sm};
  padding-right: ${tokens.spacing[3]};
  padding-left: ${tokens.spacing[3]};
  transition:
    color ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive},
    background-color ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive},
    border-color ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive},
    box-shadow ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive};

  &:hover:not(:disabled):not([aria-invalid='true']) {
    border-color: ${tokens.color.neutral[500]};
  }

  &:focus-visible {
    border-color: ${({ $invalid }) =>
      $invalid ? tokens.color.feedback.danger : tokens.color.neutral[500]};
    box-shadow: ${tokens.shadow.focus};
  }

  &:disabled {
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.neutral[600]};
    cursor: default;
  }

  &:read-only:not(:disabled) {
    background: ${tokens.color.neutral[50]};
  }

  &::placeholder {
    color: ${tokens.color.neutral[500]};
  }
`
