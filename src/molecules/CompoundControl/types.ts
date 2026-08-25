import type { HTMLAttributes, ReactNode } from 'react'
import type { FieldControlSize } from '../../atoms/fieldControlStyles'

export type CompoundControlSurface = 'surface' | 'muted'

export interface CompoundControlProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  disabled?: boolean
  invalid?: boolean
  leading?: ReactNode
  size?: FieldControlSize
  surface?: CompoundControlSurface
  trailing?: ReactNode
}
