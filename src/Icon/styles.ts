import { keyframes, styled } from 'styled-components'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const Icon = styled.span.withConfig({
  componentId: 'lsui-sc-icon',
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;

  > svg {
    display: block;
  }
`

export const Spinner = styled.span.withConfig({
  componentId: 'lsui-sc-spinner',
})`
  box-sizing: border-box;
  width: 1em;
  height: 1em;
  border: 2px solid currentcolor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
