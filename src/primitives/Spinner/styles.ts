import { keyframes, styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'
import type { SpinnerSize, SpinnerStyleProps } from './types'

const sizes = {
  inherit: '1em',
  sm: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
} satisfies Record<SpinnerSize, string>

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.span.withConfig({
  componentId: 'lsui-sc-spinner',
})<SpinnerStyleProps>`
  box-sizing: border-box;
  display: inline-block;
  width: ${({ $size }) => sizes[$size]};
  height: ${({ $size }) => sizes[$size]};
  flex: 0 0 auto;
  border: 2px solid currentcolor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spin} ${tokens.motion.duration.spinner} linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
