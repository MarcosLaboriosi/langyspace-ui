import { forwardRef, useId, type FormEvent } from 'react'
import { IconButton } from '../../atoms/IconButton'
import * as Styled from './styles'
import type { MessageComposerProps } from './types'

const defaultMaxLength = 1000

export const MessageComposer = forwardRef<
  HTMLFormElement,
  MessageComposerProps
>(function MessageComposer(
  {
    autoComplete = 'off',
    autoFocus = false,
    disabled = false,
    error,
    helperText,
    isSubmitting = false,
    maxLength = defaultMaxLength,
    name,
    onSubmit,
    onValueChange,
    placeholder,
    rows = 2,
    submitIcon,
    submitLabel,
    textareaLabel,
    value,
    ...formProps
  },
  ref,
) {
  const supportId = useId()
  const errorId = `${supportId}-error`
  const helperId = `${supportId}-helper`
  const counterId = `${supportId}-counter`
  const overLimit = value.length > maxLength
  const blocked =
    disabled || isSubmitting || overLimit || value.trim().length === 0
  const describedBy = [
    error ? errorId : null,
    helperText ? helperId : null,
    counterId,
  ]
    .filter(Boolean)
    .join(' ')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!blocked) onSubmit()
  }

  return (
    <Styled.Form
      {...formProps}
      ref={ref}
      aria-busy={isSubmitting || undefined}
      data-ui-message-composer="true"
      onSubmit={handleSubmit}
    >
      <Styled.InputRow>
        <Styled.Input
          aria-describedby={describedBy}
          aria-invalid={Boolean(error) || overLimit || undefined}
          aria-label={textareaLabel}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          disabled={disabled || isSubmitting}
          maxLength={maxLength}
          name={name}
          onChange={(event) => onValueChange(event.target.value)}
          placeholder={placeholder}
          rows={rows}
          value={value}
        />
        <IconButton
          aria-label={submitLabel}
          disabled={blocked}
          isLoading={isSubmitting}
          shape="rounded"
          size="lg"
          type="submit"
          variant="brand"
        >
          {submitIcon}
        </IconButton>
      </Styled.InputRow>
      {error ? (
        <Styled.Error id={errorId} role="alert">
          {error}
        </Styled.Error>
      ) : null}
      <Styled.Support>
        {helperText ? (
          <Styled.Helper id={helperId}>{helperText}</Styled.Helper>
        ) : null}
        <Styled.Counter $invalid={overLimit} id={counterId}>
          {value.length}/{maxLength}
        </Styled.Counter>
      </Styled.Support>
    </Styled.Form>
  )
})

export type { MessageComposerProps } from './types'
