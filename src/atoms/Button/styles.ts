import { css, styled } from 'styled-components'
import {
  actionRecipe,
  actionSizeHeights,
} from '../../foundations/actions/recipe'
import { Pressable } from '../../primitives/Pressable'
import type { ButtonStyleProps } from './types'

export const Button = styled(Pressable).withConfig({
  componentId: 'lsui-sc-button',
})<ButtonStyleProps>`
  ${actionRecipe}
  ${({ $iconOnly, $size }) =>
    $iconOnly &&
    css`
      width: ${actionSizeHeights[$size]};
      max-width: none;
      flex-shrink: 0;
      padding-right: 0;
      padding-left: 0;
    `}

  &:disabled {
    opacity: 0.48;
    cursor: default;
  }

  &[data-loading='true'] {
    opacity: 1;
    cursor: wait;
  }
`
