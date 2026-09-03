import { styled } from 'styled-components'
import { TextareaInput } from '../../atoms/TextareaInput'
import { tokens } from '../../foundations/tokens'

export const Form = styled.form.withConfig({
  componentId: 'lsui-sc-message-composer',
})`
  display: flex;
  width: 100%;
  min-width: 0;
  flex-direction: column;
  gap: ${tokens.spacing[2]};
`

export const InputRow = styled.div`
  display: flex;
  width: 100%;
  min-width: 0;
  align-items: flex-end;
  gap: ${tokens.spacing[2]};
`

export const Input = styled(TextareaInput)`
  min-width: 0;
  min-height: ${tokens.field.height.lg};
  max-height: 9rem;
  flex: 1 1 auto;
  resize: vertical;
`

export const Support = styled.div`
  display: flex;
  min-width: 0;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${tokens.spacing[1]} ${tokens.spacing[3]};
  color: ${tokens.color.content.muted};
  font-size: ${tokens.typography.fontSize.xs};
  line-height: ${tokens.typography.lineHeight.normal};
`

export const Helper = styled.span`
  min-width: 0;
  flex: 1 1 12rem;
  overflow-wrap: anywhere;
`

export const Counter = styled.span<{ $invalid: boolean }>`
  margin-left: auto;
  color: ${({ $invalid }) =>
    $invalid ? tokens.color.feedback.dangerStrong : 'inherit'};
  font-weight: ${({ $invalid }) =>
    $invalid
      ? tokens.typography.fontWeight.semibold
      : tokens.typography.fontWeight.medium};
  white-space: nowrap;
`

export const Error = styled.p`
  margin: 0;
  color: ${tokens.color.feedback.dangerStrong};
  font-size: ${tokens.typography.fontSize.sm};
  line-height: ${tokens.typography.lineHeight.normal};
  overflow-wrap: anywhere;
`
