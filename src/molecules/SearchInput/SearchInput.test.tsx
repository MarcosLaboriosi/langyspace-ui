import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SearchInput } from '.'
import type { SearchInputClearAction, SearchInputProps } from './types'

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

  it('requires consumer copy when a clear action exists', () => {
    const withoutClear: SearchInputClearAction = {}
    const withClear: SearchInputClearAction = {
      clearLabel: 'Limpar busca',
      onClear: () => undefined,
    }

    // @ts-expect-error onClear requires explicit product copy
    const missingCopy: SearchInputClearAction = {
      onClear: () => undefined,
    }

    expect(withoutClear.onClear).toBeUndefined()
    expect(withClear.clearLabel).toBe('Limpar busca')
    expect(missingCopy.onClear).toBeTypeOf('function')

    const legacyCompatibleProps: SearchInputProps = {
      'aria-label': 'Buscar',
      onClear: () => undefined,
    }
    expect(legacyCompatibleProps.onClear).toBeTypeOf('function')
  })
})
