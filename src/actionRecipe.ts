import { css } from 'styled-components'
import type {
  ButtonDensity,
  ButtonShape,
  ButtonSize,
  ButtonTone,
  ButtonVariant,
} from './Button/types'

export interface ActionRecipeStyleProps {
  $density: ButtonDensity
  $fullWidth: boolean
  $shape: ButtonShape
  $size: ButtonSize
  $tone: ButtonTone
  $variant: ButtonVariant
}

const shapeRadii = {
  pill: '999px',
  rounded: '0.75rem',
} satisfies Record<ButtonShape, string>

export const actionSizeHeights = {
  sm: '2rem',
  md: '2.5rem',
  lg: '3rem',
} satisfies Record<ButtonSize, string>

const sizeStyles = {
  sm: css`
    min-height: ${actionSizeHeights.sm};
    gap: 0.5rem;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    font-size: 0.875rem;
  `,
  md: css`
    min-height: ${actionSizeHeights.md};
    gap: 0.5rem;
    padding-right: 1.25rem;
    padding-left: 1.25rem;
    font-size: 1rem;
  `,
  lg: css`
    min-height: ${actionSizeHeights.lg};
    gap: 0.75rem;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    font-size: 1rem;
  `,
} satisfies Record<ButtonSize, ReturnType<typeof css>>

const compactSizeStyles = {
  sm: css``,
  md: css`
    padding-right: 1rem;
    padding-left: 1rem;
    font-size: 0.875rem;
  `,
  lg: css`
    padding-right: 1.25rem;
    padding-left: 1.25rem;
  `,
} satisfies Record<ButtonSize, ReturnType<typeof css>>

const variantStyles = {
  primary: css`
    border-color: #0a0a0a;
    color: #ffffff;
    background-color: #0a0a0a;
    box-shadow: none;

    &:hover:not(:disabled):not([aria-disabled='true']) {
      border-color: #1a1a1a;
      background-color: #1a1a1a;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
      transform: translateY(-1px);
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      border-color: #0a0a0a;
      background-color: #0a0a0a;
      transform: translateY(0);
    }
  `,
  secondary: css`
    border-color: #d9d9d6;
    color: #0a0a0a;
    background-color: #ffffff;
    box-shadow: none;

    &:hover:not(:disabled):not([aria-disabled='true']) {
      border-color: #9a9a9a;
      background-color: #fafaf9;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      transform: translateY(-1px);
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      background-color: #f1f1ef;
      transform: translateY(0);
    }
  `,
  tertiary: css`
    border-color: transparent;
    color: #0a0a0a;
    background-color: transparent;
    box-shadow: none;

    &:hover:not(:disabled):not([aria-disabled='true']) {
      background-color: #fafaf9;
      transform: translateY(-1px);
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      background-color: #f1f1ef;
      transform: translateY(0);
    }
  `,
  danger: css`
    border-color: #c62828;
    color: #ffffff;
    background-color: #c62828;
    box-shadow: none;

    &:hover:not(:disabled):not([aria-disabled='true']) {
      border-color: #991b1b;
      background-color: #991b1b;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
      transform: translateY(-1px);
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      border-color: #991b1b;
      background-color: #991b1b;
      transform: translateY(0);
    }
  `,
  success: css`
    border-color: #166534;
    color: #ffffff;
    background-color: #166534;
    box-shadow: none;

    &:hover:not(:disabled):not([aria-disabled='true']) {
      border-color: #14532d;
      background-color: #14532d;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
      transform: translateY(-1px);
    }

    &:active:not(:disabled):not([aria-disabled='true']) {
      border-color: #14532d;
      background-color: #14532d;
      transform: translateY(0);
    }
  `,
} satisfies Record<ButtonVariant, ReturnType<typeof css>>

const toneStyles = {
  neutral: css``,
  brand: css`
    &,
    &:active:not(:disabled):not([aria-disabled='true']) {
      border-color: #cc0f45;
      color: #ffffff;
      background-color: #cc0f45;
      box-shadow: none;
    }

    &:hover:not(:disabled):not([aria-disabled='true']) {
      border-color: #b01343;
      color: #ffffff;
      background-color: #b01343;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
    }
  `,
} satisfies Record<ButtonTone, ReturnType<typeof css>>

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
  font-weight: 600;
  line-height: 1.25;
  overflow-wrap: anywhere;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    background-color 150ms cubic-bezier(0.2, 0, 0, 1),
    border-color 150ms cubic-bezier(0.2, 0, 0, 1),
    box-shadow 150ms cubic-bezier(0.2, 0, 0, 1),
    color 150ms cubic-bezier(0.2, 0, 0, 1),
    transform 150ms cubic-bezier(0.2, 0, 0, 1);

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
  ${({ $size }) => sizeStyles[$size]}
  ${({ $density, $size }) => $density === 'compact' && compactSizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $tone }) => toneStyles[$tone]}

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px #ffffff,
      0 0 0 5px rgba(0, 242, 234, 0.72);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover:not(:disabled):not([aria-disabled='true']) {
      transform: none;
    }
  }
`
