import type { AriaAttributes } from 'react'

export interface FieldControlContextValue {
  controlId: string
  describedBy?: string
  invalid: boolean
}

export interface FieldControlNativeAttributes {
  'aria-describedby'?: string
  'aria-invalid'?: AriaAttributes['aria-invalid']
  id?: string
}
