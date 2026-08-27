import { type FieldPath, type FieldValues, useFormContext } from 'react-hook-form'
import { FieldRoot } from '../FieldRoot'
import { TextInput } from '../../atoms/TextInput'
import type { ControlledFieldProps } from './types'

const resolveFormError = (
  errors: unknown,
  fieldName: FieldPath<FieldValues>,
): string | undefined => {
  const path = String(fieldName)
  if (!errors || typeof errors !== 'object') return undefined

  const cursor: unknown = path.split('.').reduce((acc, key) => {
    if (!acc || typeof acc !== 'object') return undefined
    return (acc as Record<string, unknown>)[key]
  }, errors as Record<string, unknown> | undefined)

  if (!cursor || typeof cursor !== 'object') return undefined
  const message = (cursor as { message?: unknown }).message

  return typeof message === 'string' ? message : undefined
}

export function ControlledField<TFieldValues extends FieldValues = FieldValues>(
  props: ControlledFieldProps<TFieldValues>,
) {
  const { formState: { errors }, register } = useFormContext<TFieldValues>()
  const { controlId, hint, label, name, rules, error: externalError, ...inputProps } = props
  const fieldId = controlId ?? String(name)
  const resolvedError = externalError ?? resolveFormError(errors, name)

  return (
    <FieldRoot controlId={fieldId} error={resolvedError} hint={hint} label={label}>
      <TextInput
        id={fieldId}
        {...inputProps}
        {...register(name, rules)}
        aria-invalid={Boolean(resolvedError)}
      />
    </FieldRoot>
  )
}

export type { ControlledFieldProps } from './types'
