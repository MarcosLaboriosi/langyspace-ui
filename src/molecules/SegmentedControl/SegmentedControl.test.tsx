import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SegmentedControl } from '.'

const options = [
  { label: 'Todos', value: 'all' },
  { label: 'Ativos', value: 'active' },
] as const

describe('SegmentedControl', () => {
  it('keeps one exclusive choice across visual surfaces', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(
      <SegmentedControl
        aria-label="Período"
        onChange={onChange}
        options={options}
        shape="pill"
        surface="inverse"
        value="active"
      />,
    )

    expect(screen.getByRole('button', { name: 'Ativos' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(
      screen
        .getAllByRole('button')
        .filter((button) => button.getAttribute('aria-pressed') === 'true'),
    ).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: 'Todos' }))
    expect(onChange).toHaveBeenCalledWith('all')
  })

  it('keeps exclusive choices in one horizontally scrollable track', () => {
    render(
      <SegmentedControl
        aria-label="Período detalhado"
        onChange={() => undefined}
        options={options}
        value="all"
      />,
    )

    expect(
      screen.getByRole('group', { name: 'Período detalhado' }),
    ).toHaveStyle({
      flexWrap: 'nowrap',
      overflowX: 'auto',
    })
  })
})
