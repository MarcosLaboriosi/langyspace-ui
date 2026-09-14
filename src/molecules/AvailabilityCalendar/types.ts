import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type AvailabilityCalendarSlot = {
  id: string
  label: string
} & (
  | { available: true; unavailableReason?: never }
  | { available: false; unavailableReason: string }
)

export interface AvailabilityCalendarDay {
  id: string
  label: string
  dateLabel: string
  slots: readonly AvailabilityCalendarSlot[]
}

export type AvailabilityCalendarStatus = 'ready' | 'loading' | 'empty' | 'error'

export interface AvailabilityCalendarProps extends Omit<
  ComponentPropsWithoutRef<'section'>,
  'onChange'
> {
  label: string
  days: readonly AvailabilityCalendarDay[]
  selectedSlotIds: readonly string[]
  onToggleSlot: (slotId: string) => void
  selectionLabel?: ReactNode
  helperText?: ReactNode
  status?: AvailabilityCalendarStatus
  statusMessage?: string
  statusAction?: ReactNode
}
