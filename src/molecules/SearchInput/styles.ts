import { css, styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'
import type { FieldControlSize } from '../../atoms/fieldControlStyles'

const fontStyles = {
  lg: css`
    font-size: ${tokens.typography.fontSize.md};
  `,
  md: css`
    font-size: ${tokens.typography.fontSize.sm};
  `,
  sm: css`
    font-size: ${tokens.typography.fontSize.sm};
  `,
} satisfies Record<FieldControlSize, ReturnType<typeof css>>

export const Input = styled.input.withConfig({
  componentId: 'lsui-sc-search-input',
})<{ $size: FieldControlSize }>`
  width: 100%;
  min-width: 0;
  align-self: stretch;
  flex: 1;
  border: 0;
  border-radius: 0;
  outline: 0;
  appearance: none;
  background: transparent;
  box-shadow: none;
  color: ${tokens.color.neutral[950]};
  font-family: inherit;
  padding: 0;

  ${({ $size }) => fontStyles[$size]}

  &::-webkit-search-cancel-button {
    display: none;
  }

  &:focus,
  &:focus-visible {
    border: 0;
    outline: 0;
    background: transparent;
    box-shadow: none;
  }

  &::placeholder {
    color: ${tokens.color.neutral[500]};
  }

  &:disabled {
    color: ${tokens.color.neutral[600]};
    cursor: default;
  }
`
