import { createContext, useContext } from 'react'
import type { FieldControlSize } from '../../foundations/fields'

interface CompoundControlContextValue {
  disabled: boolean
  invalid: boolean
  size: FieldControlSize
}

export const CompoundControlContext =
  createContext<CompoundControlContextValue | null>(null)

export function useCompoundControlContext() {
  return useContext(CompoundControlContext)
}
