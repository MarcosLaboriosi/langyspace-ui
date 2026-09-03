import type {
  ComponentPropsWithRef,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react'

type TextareaAttribute<
  Key extends keyof TextareaHTMLAttributes<HTMLTextAreaElement>,
> = TextareaHTMLAttributes<HTMLTextAreaElement>[Key]

export interface MessageComposerProps extends Omit<
  ComponentPropsWithRef<'form'>,
  'children' | 'onSubmit'
> {
  autoComplete?: TextareaAttribute<'autoComplete'>
  autoFocus?: boolean
  disabled?: boolean
  error?: string
  helperText?: string
  isSubmitting?: boolean
  maxLength?: number
  name?: string
  onSubmit: () => void
  onValueChange: (value: string) => void
  placeholder?: string
  rows?: number
  submitIcon: ReactNode
  submitLabel: string
  textareaLabel: string
  value: string
}
