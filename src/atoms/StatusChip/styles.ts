import { css, styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'
import type { StatusChipSize, StatusChipTone } from './types'

const sizeStyles = {
  md: css`
    font-size: ${tokens.typography.fontSize.xs};
  `,
  sm: css`
    font-size: ${tokens.typography.fontSize['2xs']};
  `,
} satisfies Record<StatusChipSize, ReturnType<typeof css>>

export const Chip = styled.span.withConfig({
  componentId: 'lsui-sc-status-chip',
})<{
  $size: StatusChipSize
  $tone: StatusChipTone
}>`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  gap: 0.375rem;
  padding: ${tokens.spacing[1]} 0.625rem;
  border-radius: ${tokens.radius.pill};
  color: ${({ $tone }) => tokens.color.status[$tone].foreground};
  background: ${({ $tone }) => tokens.color.status[$tone].background};
  font-weight: ${tokens.typography.fontWeight.semibold};
  line-height: ${tokens.typography.lineHeight.snug};
  white-space: nowrap;

  ${({ $size }) => sizeStyles[$size]}

  svg {
    flex-shrink: 0;
  }
`

export const Icon = styled.span`
  display: inline-flex;
  flex-shrink: 0;
`

export const Label = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Indicator = styled.span<{ $tone: StatusChipTone }>`
  width: 0.375rem;
  height: 0.375rem;
  flex-shrink: 0;
  border-radius: ${tokens.radius.pill};
  background: ${({ $tone }) => tokens.color.status[$tone].indicator};
`
