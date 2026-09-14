import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AvailabilityCalendar } from '.'
import type { AvailabilityCalendarDay } from './types'

const days: AvailabilityCalendarDay[] = [
  {
    id: 'monday',
    label: 'Segunda',
    dateLabel: '14/09/2026',
    slots: [
      { id: '09', label: '09:00', available: true },
      {
        id: '10',
        label: '10:00',
        available: false,
        unavailableReason: 'Sem disponibilidade compatível',
      },
      { id: '11', label: '11:00', available: true },
    ],
  },
]
const base = {
  days,
  label: 'Escolha horários',
  selectedSlotIds: [],
  onToggleSlot: () => undefined,
}

describe('AvailabilityCalendar', () => {
  it('delegates toggles and waits for controlled state before changing selection', async () => {
    const onToggleSlot = vi.fn()
    const user = userEvent.setup()
    const { rerender } = render(
      <AvailabilityCalendar
        {...base}
        onToggleSlot={onToggleSlot}
        helperText="Selecione horários"
        selectionLabel="0 selecionados"
      />,
    )
    const first = screen.getByRole('button', {
      name: 'Segunda, 14/09/2026, 09:00',
    })
    await user.click(first)
    expect(onToggleSlot).toHaveBeenCalledWith('09')
    expect(first).toHaveAttribute('aria-pressed', 'false')
    rerender(
      <AvailabilityCalendar
        {...base}
        onToggleSlot={onToggleSlot}
        selectedSlotIds={['09', '11']}
        selectionLabel="2 selecionados"
      />,
    )
    expect(first).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('2 selecionados')).toHaveAttribute(
      'aria-live',
      'polite',
    )
    await user.click(first)
    expect(onToggleSlot).toHaveBeenCalledTimes(2)
    expect(first).toHaveAttribute('aria-pressed', 'true')
  })

  it('shows unavailable reasons and skips disabled controls in native keyboard order', async () => {
    const onToggleSlot = vi.fn()
    const user = userEvent.setup()
    render(<AvailabilityCalendar {...base} onToggleSlot={onToggleSlot} />)
    const disabled = screen.getByRole('button', {
      name: /10:00, Sem disponibilidade compatível/,
    })
    expect(disabled).toBeDisabled()
    expect(screen.getByText('Sem disponibilidade compatível')).toBeVisible()
    await user.click(disabled)
    expect(onToggleSlot).not.toHaveBeenCalled()
    await user.tab()
    const first = screen.getByRole('button', { name: /09:00/ })
    expect(first).toHaveFocus()
    await user.keyboard(' ')
    expect(onToggleSlot).toHaveBeenCalledWith('09')
    await user.tab()
    expect(screen.getByRole('button', { name: /11:00/ })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(onToggleSlot).toHaveBeenCalledWith('11')
  })

  it('keeps a selected slot removable after availability changes', async () => {
    const onToggleSlot = vi.fn()
    render(
      <AvailabilityCalendar
        {...base}
        onToggleSlot={onToggleSlot}
        selectedSlotIds={['10']}
      />,
    )
    const stale = screen.getByRole('button', {
      name: /10:00, Sem disponibilidade compatível/,
    })
    expect(stale).toBeEnabled()
    expect(stale).toHaveAttribute('aria-pressed', 'true')
    await userEvent.click(stale)
    expect(onToggleSlot).toHaveBeenCalledWith('10')
  })

  it.each(['loading', 'empty', 'error'] as const)(
    'hides stale controls while %s',
    (status) => {
      render(<AvailabilityCalendar {...base} status={status} />)
      expect(screen.queryAllByRole('button')).toHaveLength(0)
      if (status === 'error') expect(screen.getByRole('alert')).toBeVisible()
      if (status === 'loading')
        expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true')
    },
  )

  it('treats an empty day list as empty and accepts consumer status copy and retry', async () => {
    const retry = vi.fn()
    const { rerender } = render(<AvailabilityCalendar {...base} days={[]} />)
    expect(screen.getByText('Nenhum horário disponível')).toBeVisible()
    rerender(
      <AvailabilityCalendar
        {...base}
        status="error"
        statusMessage="Falha ao buscar"
        statusAction={<button onClick={retry}>Recarregar</button>}
      />,
    )
    expect(screen.getByText('Falha ao buscar')).toBeVisible()
    await userEvent.click(screen.getByRole('button', { name: 'Recarregar' }))
    expect(retry).toHaveBeenCalledOnce()
  })

  it('names the calendar and dated day regions without overriding slot identity', () => {
    render(
      <AvailabilityCalendar
        {...base}
        helperText="Escolha até três horários"
        data-testid="calendar"
      />,
    )
    expect(
      screen.getByRole('region', { name: 'Escolha horários' }),
    ).toHaveAccessibleDescription('Escolha até três horários')
    expect(
      screen.getByRole('region', { name: 'Segunda 14/09/2026' }),
    ).toBeVisible()
    expect(screen.getByTestId('calendar')).toHaveAttribute(
      'data-ui-availability-calendar',
      'true',
    )
  })
})
