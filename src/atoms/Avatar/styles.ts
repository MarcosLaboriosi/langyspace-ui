import { css, styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'
import type { AvatarSize, AvatarTone } from './types'

const sizeStyles = {
  xs: css`
    width: 1.5rem;
    height: 1.5rem;
    font-size: ${tokens.typography.fontSize['2xs']};
  `,
  sm: css`
    width: 2rem;
    height: 2rem;
    font-size: ${tokens.typography.fontSize.xs};
  `,
  md: css`
    width: 2.5rem;
    height: 2.5rem;
    font-size: ${tokens.typography.fontSize.sm};
  `,
  lg: css`
    width: 3.5rem;
    height: 3.5rem;
    font-size: ${tokens.typography.fontSize.lg};
  `,
  xl: css`
    width: 4rem;
    height: 4rem;
    font-size: ${tokens.typography.fontSize.xl};
  `,
} satisfies Record<AvatarSize, ReturnType<typeof css>>

const toneStyles = {
  neutral: css`
    border-color: ${tokens.color.surfaceBorder.default};
    color: ${tokens.color.content.default};
    background: ${tokens.color.surface.muted};
  `,
  brand: css`
    border-color: transparent;
    color: ${tokens.color.status.brand.foreground};
    background: ${tokens.color.status.brand.background};
  `,
  inverse: css`
    border-color: transparent;
    color: ${tokens.color.neutral[0]};
    background: ${tokens.color.neutral[950]};
  `,
} satisfies Record<AvatarTone, ReturnType<typeof css>>

export const Avatar = styled.span.withConfig({
  componentId: 'lsui-sc-avatar',
})<{
  $size: AvatarSize
  $tone: AvatarTone
}>`
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
  border-radius: ${tokens.radius.pill};
  font-weight: ${tokens.typography.fontWeight.bold};
  line-height: 1;
  white-space: nowrap;

  ${({ $size }) => sizeStyles[$size]}
  ${({ $tone }) => toneStyles[$tone]}
`

export const Image = styled.img`
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`
