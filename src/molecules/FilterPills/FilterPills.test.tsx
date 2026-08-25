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
})
