import { styled } from 'styled-components'
import {
  fieldControlStyles,
  type FieldControlStyleProps,
} from '../fieldControlStyles'

export const Input = styled.input.withConfig({
  componentId: 'lsui-sc-text-input',
})<FieldControlStyleProps>`
  ${fieldControlStyles}
`
