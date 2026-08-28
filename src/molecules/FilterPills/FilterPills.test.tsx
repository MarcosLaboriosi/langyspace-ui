import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { FilterPills } from '.'

const options = [
  { label: 'Todos', value: 'all' },
  { label: 'Ativos', value: 'active' },
] as const

describe('FilterPills', () => {
  it('exposes FilterPills as a named pressed-button group with counts', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(
      <FilterPills
        aria-label="Filtrar alunos"
        counts={{ active: 4, all: 175 }}
        onChange={onChange}
        options={options}
        size="sm"
        value="all"
      />,
    )

    expect(screen.getByRole('group', { name: 'Filtrar alunos' })).toHaveClass(
      'lsui-sc-filter-pills',
    )
    const selectedFilter = screen.getByRole('button', { name: 'Todos: 175' })
    expect(selectedFilter).toHaveAttribute('aria-pressed', 'true')
    expect(selectedFilter).toHaveStyle({
      alignItems: 'center',
      display: 'inline-flex',
      gap: '0.5rem',
    })
    await user.click(screen.getByRole('button', { name: 'Ativos: 4' }))
    expect(onChange).toHaveBeenCalledWith('active')
  })

  it('uses explicit accessible copy for a custom visual label', () => {
    render(
      <FilterPills
        aria-label="Filtrar alunos"
        counts={{ active: 4 }}
        onChange={() => undefined}
        options={[
          {
            accessibleLabel: 'Alunos ativos',
            label: (
              <span>
                Ativos <strong>4</strong>
              </span>
            ),
            value: 'active',
          },
        ]}
        value="active"
      />,
    )

    expect(
      screen.getByRole('button', { name: 'Alunos ativos: 4' }),
    ).toHaveAttribute('aria-pressed', 'true')
  })

  it('keeps the named size scale monotonic', () => {
    render(
      <>
        <FilterPills
          aria-label="Filtro pequeno"
          onChange={() => undefined}
          options={options}
          size="sm"
          value="all"
        />
        <FilterPills
          aria-label="Filtro médio"
          onChange={() => undefined}
          options={options}
          size="md"
          value="all"
        />
      </>,
    )

    expect(
      screen.getByRole('group', { name: 'Filtro pequeno' }).firstElementChild,
    ).toHaveStyle({ fontSize: '0.75rem', minHeight: '2rem' })
    expect(
      screen.getByRole('group', { name: 'Filtro médio' }).firstElementChild,
    ).toHaveStyle({ fontSize: '0.875rem', minHeight: '2.5rem' })
  })
})
