import { css, styled } from 'styled-components'
import type { ButtonSize, ButtonStyleProps, ButtonVariant } from './types'

const sizeHeights = {
  sm: '2rem',
  md: '2.5rem',
  lg: '3rem',
} satisfies Record<ButtonSize, string>

const sizeStyles = {
  sm: css`
    min-height: ${sizeHeights.sm};
    gap: 0.5rem;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    font-size: 0.875rem;
  `,
  md: css`
    min-height: ${sizeHeights.md};
    gap: 0.5rem;
    padding-right: 1.25rem;
    padding-left: 1.25rem;
    font-size: 1rem;
  `,
  lg: css`
    min-height: ${sizeHeights.lg};
    gap: 0.75rem;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    font-size: 1rem;
  `,
} satisfies Record<ButtonSize, ReturnType<typeof css>>

const variantStyles = {
  primary: css`
    border-color: #0a0a0a;
    color: #ffffff;
    background-color: #0a0a0a;
    box-shadow: none;

    &:hover:not(:disabled) {
      border-color: #1a1a1a;
      background-color: #1a1a1a;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
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

    &:hover:not(:disabled) {
      border-color: #9a9a9a;
      background-color: #fafaf9;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      background-color: #f1f1ef;
      transform: translateY(0);
    }
  `,
  tertiary: css`
    border-color: transparent;
    color: #0a0a0a;
    background-color: transparent;
    box-shadow: none;

    &:hover:not(:disabled) {
      background-color: #fafaf9;
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      background-color: #f1f1ef;
      transform: translateY(0);
    }
  `,
} satisfies Record<ButtonVariant, ReturnType<typeof css>>

export const Button = styled.button.withConfig({
  componentId: 'lsui-sc-button',
})<ButtonStyleProps>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  min-width: 0;
  padding-top: 0;
  padding-bottom: 0;
  border-style: solid;
  border-width: 1px;
  border-radius: 999px;
  font: inherit;
  font-weight: 600;
  line-height: 1.25;
  overflow-wrap: anywhere;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
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
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $iconOnly, $size }) =>
    $iconOnly &&
    css`
      width: ${sizeHeights[$size]};
      padding-right: 0;
      padding-left: 0;
    `}

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px #ffffff,
      0 0 0 5px rgba(0, 242, 234, 0.72);
  }

  &:disabled {
    opacity: 0.48;
    cursor: default;
  }

  &[data-loading='true'] {
    opacity: 1;
    cursor: wait;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover:not(:disabled) {
      transform: none;
    }
  }
`
