import { css } from 'styled-components'
import { tokens } from '../tokens'

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
      $invalid
        ? tokens.color.feedback.danger
        : tokens.color.surfaceBorder.default};
  border-radius: ${tokens.radius.control};
  outline: none;
  background: ${tokens.color.neutral[0]};
  color: ${tokens.color.content.default};
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
    border-color: ${tokens.color.surfaceBorder.strong};
  }

  &:focus-visible {
    border-color: ${({ $invalid }) =>
      $invalid
        ? tokens.color.feedback.danger
        : tokens.color.surfaceBorder.strong};
    box-shadow: ${tokens.shadow.focus};
  }

  &:disabled {
    background: ${tokens.color.surface.muted};
    color: ${tokens.color.content.muted};
    cursor: default;
  }

  &:read-only:not(:disabled) {
    background: ${tokens.color.surface.subtle};
  }

  &::placeholder {
    color: ${tokens.color.content.placeholder};
  }
`
