import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  CompoundControl,
  FieldRoot,
  SearchInput,
  SelectInput,
  TextareaInput,
  TextInput,
} from '../..'

afterEach(() => cleanup())

describe('field components', () => {
  it('connects label, hint and error to native controls without a form adapter', () => {
    render(
      <>
        <FieldRoot error="Obrigatório" hint="Use o nome completo" label="Nome">
          <TextInput />
        </FieldRoot>
        <FieldRoot controlId="level" label="Nível">
          <SelectInput>
            <option>B1</option>
          </SelectInput>
        </FieldRoot>
        <FieldRoot controlId="notes" label="Notas">
          <TextareaInput />
        </FieldRoot>
      </>,
    )

    const name = screen.getByRole('textbox', { name: 'Nome' })
    expect(name).toHaveAttribute('aria-invalid', 'true')
    expect(name.getAttribute('aria-describedby')).toMatch(/-hint .*?-error/)
    expect(screen.getByRole('alert')).toHaveTextContent('Obrigatório')
    expect(screen.getByRole('combobox', { name: 'Nível' })).toHaveAttribute(
      'id',
      'level',
    )
    expect(screen.getByRole('textbox', { name: 'Notas' })).toHaveAttribute(
      'id',
      'notes',
    )
  })

  it('keeps a compound control as the single visual surface', () => {
    render(
      <CompoundControl invalid leading={<svg />} trailing={<span>kg</span>}>
        <input aria-label="Peso" />
      </CompoundControl>,
    )

    const compound = screen.getByRole('textbox', { name: 'Peso' }).parentElement
    expect(compound).toHaveClass('lsui-sc-compound-control')
    expect(compound).toHaveAttribute('data-invalid', 'true')
    expect(compound?.querySelectorAll('svg')).toHaveLength(1)
  })

  it('clears search and returns focus to the input', async () => {
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
