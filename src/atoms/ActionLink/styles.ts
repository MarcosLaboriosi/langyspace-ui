import { styled } from 'styled-components'
import { actionRecipe } from '../../foundations/actions/recipe'
import type { ActionLinkStyleProps } from './types'

export const ActionLink = styled.a.withConfig({
  componentId: 'lsui-sc-action-link',
})<ActionLinkStyleProps>`
  ${actionRecipe}
`
