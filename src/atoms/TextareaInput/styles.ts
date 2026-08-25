import { styled } from 'styled-components'
import {
  fieldControlStyles,
  type FieldControlStyleProps,
} from '../../foundations/fields'
import { tokens } from '../../foundations/tokens'

export const Textarea = styled.textarea.withConfig({
  componentId: 'lsui-sc-textarea-input',
})<FieldControlStyleProps>`
  ${fieldControlStyles}
  min-height: 6rem;
  padding-top: ${tokens.spacing[3]};
  padding-bottom: ${tokens.spacing[3]};
  line-height: ${tokens.typography.lineHeight.normal};
  resize: vertical;
`
