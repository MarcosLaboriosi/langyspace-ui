import { useId } from 'react'
import { FieldControlContext } from '../../internal/FieldControlContext'
import * as Styled from './styles'
import type { FieldRootProps } from './types'

const hasContent = (
  content: FieldRootProps['error'] | FieldRootProps['hint'],
) =>
  content !== undefined &&
  content !== null &&
  content !== false &&
  content !== ''

export function FieldRoot({
  children,
  controlId: requestedControlId,
  error,
  hint,
  label,
  labelVariant = 'default',
  ...rootProps
}: FieldRootProps) {
  const generatedId = useId().replaceAll(':', '')
  const controlId = requestedControlId ?? `field-${generatedId}`
  const hintId = `${controlId}-hint`
  const errorId = `${controlId}-error`
  const hasHint = hasContent(hint)
  const hasError = hasContent(error)
  const describedBy = [hasHint ? hintId : null, hasError ? errorId : null]
    .filter(Boolean)
    .join(' ')

  return (
    <FieldControlContext.Provider
      value={{
        controlId,
        describedBy: describedBy || undefined,
        invalid: hasError,
      }}
    >
      <Styled.Root {...rootProps} data-invalid={hasError || undefined}>
        <Styled.Label $variant={labelVariant} htmlFor={controlId}>
          {label}
        </Styled.Label>
        {children}
        {hasHint ? <Styled.Hint id={hintId}>{hint}</Styled.Hint> : null}
        {hasError ? (
          <Styled.Error id={errorId} role="alert">
            {error}
          </Styled.Error>
        ) : null}
      </Styled.Root>
    </FieldControlContext.Provider>
  )
}

export type { FieldLabelVariant, FieldRootProps } from './types'
