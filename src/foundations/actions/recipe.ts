import { css } from 'styled-components'
import { tokens } from '../tokens'
import type {
  ActionRecipeStyleProps,
  ActionShape,
  ActionSize,
  ActionVariant,
} from './types'

const shapeRadii = {
  pill: tokens.radius.pill,
  rounded: tokens.radius.rounded,
} satisfies Record<ActionShape, string>

export const actionSizeHeights = {
  sm: tokens.control.height.sm,
  md: tokens.control.height.md,
  lg: tokens.control.height.lg,
} satisfies Record<ActionSize, string>

const sizeStyles = {
  sm: css`
    min-height: ${actionSizeHeights.sm};
    gap: ${tokens.spacing[2]};
    padding-right: ${tokens.spacing[3]};
    padding-left: ${tokens.spacing[3]};
    font-size: ${tokens.typography.fontSize.sm};
  `,
  md: css`
    min-height: ${actionSizeHeights.md};
    gap: ${tokens.spacing[2]};
    padding-right: ${tokens.spacing[5]};
    padding-left: ${tokens.spacing[5]};
    font-size: ${tokens.typography.fontSize.md};
  `,
  lg: css`
    min-height: ${actionSizeHeights.lg};
    gap: ${tokens.spacing[3]};
    padding-right: ${tokens.spacing[6]};
    padding-left: ${tokens.spacing[6]};
    font-size: ${tokens.typography.fontSize.md};
  `,
} satisfies Record<ActionSize, ReturnType<typeof css>>

const compactSizeStyles = {
  sm: css``,
  md: css`
    padding-right: ${tokens.spacing[4]};
    padding-left: ${tokens.spacing[4]};
    font-size: ${tokens.typography.fontSize.sm};
  `,
  lg: css`
    padding-right: ${tokens.spacing[5]};
    padding-left: ${tokens.spacing[5]};
  `,
} satisfies Record<ActionSize, ReturnType<typeof css>>

const variantStyles = {
  primary: css`
    border-color: ${tokens.color.neutral[950]};
    color: ${tokens.color.neutral[0]};
    background-color: ${tokens.color.neutral[950]};
    box-shadow: none;

    &:hover:not(:disabled):not([aria-disabled='true']) {
      border-color: ${tokens.color.neutral[900]};
      background-color: ${tokens.color.neutral[900]};
      box-shadow: ${tokens.shadow.raised};
      transform: translateY(-1px);
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      border-color: ${tokens.color.neutral[950]};
      background-color: ${tokens.color.neutral[950]};
      transform: translateY(0);
    }
  `,
  secondary: css`
    border-color: ${tokens.color.neutral[300]};
    color: ${tokens.color.neutral[950]};
    background-color: ${tokens.color.neutral[0]};
    box-shadow: none;

    &:hover:not(:disabled):not([aria-disabled='true']) {
      border-color: ${tokens.color.neutral[500]};
      background-color: ${tokens.color.neutral[50]};
      box-shadow: ${tokens.shadow.subtle};
      transform: translateY(-1px);
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      background-color: ${tokens.color.neutral[100]};
      transform: translateY(0);
    }
  `,
  tertiary: css`
    border-color: transparent;
    color: ${tokens.color.neutral[950]};
    background-color: transparent;
    box-shadow: none;

    &:hover:not(:disabled):not([aria-disabled='true']) {
      background-color: ${tokens.color.neutral[50]};
      transform: translateY(-1px);
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      background-color: ${tokens.color.neutral[100]};
      transform: translateY(0);
    }
  `,
  brand: css`
    border-color: ${tokens.color.brand.default};
    color: ${tokens.color.neutral[0]};
    background-color: ${tokens.color.brand.default};
    box-shadow: none;

    &:hover:not(:disabled):not([aria-disabled='true']) {
      border-color: ${tokens.color.brand.hover};
      background-color: ${tokens.color.brand.hover};
      box-shadow: ${tokens.shadow.raised};
      transform: translateY(-1px);
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      border-color: ${tokens.color.brand.hover};
      background-color: ${tokens.color.brand.hover};
      transform: translateY(0);
    }
  `,
  danger: css`
    border-color: ${tokens.color.feedback.danger};
    color: ${tokens.color.neutral[0]};
    background-color: ${tokens.color.feedback.danger};
    box-shadow: none;

    &:hover:not(:disabled):not([aria-disabled='true']) {
      border-color: ${tokens.color.feedback.dangerStrong};
      background-color: ${tokens.color.feedback.dangerStrong};
      box-shadow: ${tokens.shadow.raised};
      transform: translateY(-1px);
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      border-color: ${tokens.color.feedback.dangerStrong};
      background-color: ${tokens.color.feedback.dangerStrong};
      transform: translateY(0);
    }
  `,
  success: css`
    border-color: ${tokens.color.feedback.success};
    color: ${tokens.color.neutral[0]};
    background-color: ${tokens.color.feedback.success};
    box-shadow: none;

    &:hover:not(:disabled):not([aria-disabled='true']) {
      border-color: ${tokens.color.feedback.successStrong};
      background-color: ${tokens.color.feedback.successStrong};
      box-shadow: ${tokens.shadow.raised};
      transform: translateY(-1px);
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      border-color: ${tokens.color.feedback.successStrong};
      background-color: ${tokens.color.feedback.successStrong};
      transform: translateY(0);
    }
  `,
  inverse: css`
    border-color: transparent;
    color: ${tokens.color.neutral[0]};
    background-color: transparent;
    box-shadow: none;

    &:hover:not(:disabled):not([aria-disabled='true']) {
      border-color: ${tokens.color.neutral[0]};
      color: ${tokens.color.neutral[950]};
      background-color: ${tokens.color.neutral[0]};
      transform: translateY(-1px);
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      border-color: ${tokens.color.neutral[100]};
      color: ${tokens.color.neutral[950]};
      background-color: ${tokens.color.neutral[100]};
      transform: translateY(0);
    }
  `,
} satisfies Record<ActionVariant, ReturnType<typeof css>>

export const actionRecipe = css<ActionRecipeStyleProps>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  min-width: 0;
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
  border-style: solid;
  border-width: 1px;
  border-radius: ${({ $shape }) => shapeRadii[$shape]};
  appearance: none;
  font: inherit;
  font-weight: ${tokens.typography.fontWeight.semibold};
  line-height: ${tokens.typography.lineHeight.snug};
  overflow-wrap: anywhere;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    background-color ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive},
    border-color ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive},
    box-shadow ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive},
    color ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive},
    transform ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive};

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
  ${({ $size }) => sizeStyles[$size]}
  ${({ $density, $size }) => $density === 'compact' && compactSizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}

  &:focus-visible {
    outline: none;
    box-shadow: ${tokens.shadow.focus};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover:not(:disabled):not([aria-disabled='true']) {
      transform: none;
    }
  }
`
