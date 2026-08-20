import { styled } from 'styled-components'
import { Button } from '../src'

export const DarkTertiaryButton = styled(Button)`
  color: #ffffff;

  &:hover:not(:disabled) {
    color: #0a0a0a;
    background-color: #ffffff;
  }
`
