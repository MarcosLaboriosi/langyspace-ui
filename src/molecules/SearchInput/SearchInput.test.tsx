import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SearchInput } from '.'

describe('SearchInput', () => {
  it('clears the value through the consumer callback and restores focus', async () => {
    const onClear = vi.fn()
    const user = userEvent.setup()

    render(
      <SearchInput
        aria-label="Buscar aluno"
        clearLabel="Limpar busca"
        onClear={onClear}
        value="Maria"
        readOnly
      />,
    )

    const input = screen.getByRole('searchbox', { name: 'Buscar aluno' })
    await user.click(screen.getByRole('button', { name: 'Limpar busca' }))

    expect(onClear).toHaveBeenCalledTimes(1)
    expect(input).toHaveFocus()
  })
})
