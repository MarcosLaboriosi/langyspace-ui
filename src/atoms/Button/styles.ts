import { styled } from 'styled-components'
import { actionRecipe } from '../../foundations/actions/recipe'
import { Pressable } from '../../primitives/Pressable'
import type { ButtonStyleProps } from './types'

export const Button = styled(Pressable).withConfig({
  componentId: 'lsui-sc-button',
})<ButtonStyleProps>`
  ${actionRecipe}

  &:disabled {
    opacity: 0.48;
    cursor: default;
  }

  &[data-loading='true'] {
    opacity: 1;
    cursor: wait;
  }
`
