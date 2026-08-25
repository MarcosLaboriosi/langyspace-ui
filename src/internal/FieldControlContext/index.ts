import { createContext, useContext } from 'react'
import type {
  FieldControlContextValue,
  FieldControlNativeAttributes,
} from './types'

export const FieldControlContext =
  createContext<FieldControlContextValue | null>(null)

export function useFieldControlAttributes(
  attributes: FieldControlNativeAttributes,
): FieldControlNativeAttributes {
  const context = useContext(FieldControlContext)

  if (!context) return attributes

  return {
    ...attributes,
    'aria-describedby': attributes['aria-describedby'] ?? context.describedBy,
    'aria-invalid':
      (attributes['aria-invalid'] ?? context.invalid) || undefined,
    id: attributes.id ?? context.controlId,
  }
}
