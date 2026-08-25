import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { FilterPills, SegmentedControl } from '../..'

afterEach(() => cleanup())

const options = [
  { label: 'Todos', value: 'all' },
  { label: 'Ativos', value: 'active' },
] as const

describe('selection controls', () => {
  it('exposes FilterPills as a named pressed-button group with counts', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(
      <FilterPills
        aria-label="Filtrar alunos"
        counts={{ active: 4 }}
        onChange={onChange}
        options={options}
        size="sm"
        value="all"
      />,
    )

    expect(screen.getByRole('group', { name: 'Filtrar alunos' })).toHaveClass(
      'lsui-sc-filter-pills',
    )
    expect(screen.getByRole('button', { name: 'Todos' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await user.click(screen.getByRole('button', { name: 'Ativos: 4' }))
    expect(onChange).toHaveBeenCalledWith('active')
  })

  it('keeps SegmentedControl exclusive across light and inverse surfaces', async () => {
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

    const selected = screen.getByRole('button', { name: 'Ativos' })
    expect(selected).toHaveAttribute('aria-pressed', 'true')
    expect(
      screen
        .getAllByRole('button')
        .filter((button) => button.getAttribute('aria-pressed') === 'true'),
    ).toHaveLength(1)
    await user.click(screen.getByRole('button', { name: 'Todos' }))
    expect(onChange).toHaveBeenCalledWith('all')
  })
})
