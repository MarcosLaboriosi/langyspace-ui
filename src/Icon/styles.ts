import { styled } from 'styled-components'

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
