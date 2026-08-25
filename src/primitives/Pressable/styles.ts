import { styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'

export const Pressable = styled.button.withConfig({
  componentId: 'lsui-sc-pressable',
})`
  box-sizing: border-box;
  margin: 0;
  appearance: none;
  font: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline: 3px solid ${tokens.color.focus};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: default;
  }
`
