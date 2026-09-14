import { useId } from 'react'
import { StatePanel } from '../StatePanel'
import * as Styled from './styles'
import type { AvailabilityCalendarProps } from './types'

const defaultStatusMessages = {
  empty: 'Nenhum horário disponível',
  error: 'Não foi possível carregar os horários',
  loading: 'Carregando horários',
} as const

export function AvailabilityCalendar({
  label,
  days,
  selectedSlotIds,
  onToggleSlot,
  selectionLabel,
  helperText,
  status = 'ready',
  statusMessage,
  statusAction,
  ...props
}: AvailabilityCalendarProps) {
  const id = useId()
  const selected = new Set(selectedSlotIds)
  const effectiveStatus =
    status === 'ready' && days.length === 0 ? 'empty' : status

  return (
    <Styled.Container
      {...props}
      aria-labelledby={`${id}-heading`}
      aria-describedby={helperText ? `${id}-helper` : undefined}
      data-ui-availability-calendar="true"
    >
      <header>
        <h2 id={`${id}-heading`}>{label}</h2>
        {selectionLabel ? <div aria-live="polite">{selectionLabel}</div> : null}
      </header>
      {helperText ? <p id={`${id}-helper`}>{helperText}</p> : null}
      {effectiveStatus !== 'ready' ? (
        <StatePanel
          state={effectiveStatus}
          title={statusMessage ?? defaultStatusMessages[effectiveStatus]}
          action={statusAction}
          density="compact"
        />
      ) : (
        <Styled.Days $dayCount={days.length}>
          {days.map((day, dayIndex) => (
            <Styled.Day key={day.id} aria-labelledby={`${id}-day-${dayIndex}`}>
              <h3 id={`${id}-day-${dayIndex}`}>
                {day.label}
                <span>{day.dateLabel}</span>
              </h3>
              <Styled.Slots>
                {day.slots.map((slot) => {
                  const isSelected = selected.has(slot.id)
                  return (
                    <Styled.Slot
                      key={slot.id}
                      $selected={isSelected}
                      aria-label={`${day.label}, ${day.dateLabel}, ${slot.label}${!slot.available ? `, ${slot.unavailableReason}` : ''}`}
                      aria-pressed={isSelected}
                      disabled={!slot.available && !isSelected}
                      onClick={() => onToggleSlot(slot.id)}
                    >
                      <span>
                        {isSelected ? <span aria-hidden="true">✓ </span> : null}
                        {slot.label}
                      </span>
                      {!slot.available ? (
                        <small>{slot.unavailableReason}</small>
                      ) : null}
                    </Styled.Slot>
                  )
                })}
              </Styled.Slots>
            </Styled.Day>
          ))}
        </Styled.Days>
      )}
    </Styled.Container>
  )
}

export type {
  AvailabilityCalendarDay,
  AvailabilityCalendarProps,
  AvailabilityCalendarSlot,
  AvailabilityCalendarStatus,
} from './types'
