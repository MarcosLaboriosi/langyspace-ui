import { styled } from 'styled-components'
import {
  fieldControlStyles,
  type FieldControlStyleProps,
} from '../fieldControlStyles'
import { tokens } from '../../foundations/tokens'

export const Select = styled.select.withConfig({
  componentId: 'lsui-sc-select-input',
})<FieldControlStyleProps>`
  ${fieldControlStyles}
  padding-right: ${tokens.spacing[8]};
`
