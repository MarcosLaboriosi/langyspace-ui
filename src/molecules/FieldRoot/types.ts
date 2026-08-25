import type { HTMLAttributes, ReactNode } from 'react'

export interface FieldRootProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  children: ReactNode
  controlId?: string
  error?: ReactNode
  hint?: ReactNode
  label: ReactNode
}
