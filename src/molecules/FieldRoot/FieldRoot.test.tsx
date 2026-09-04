import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SelectInput, TextareaInput, TextInput } from '../..'
import { FieldRoot } from '.'

describe('FieldRoot', () => {
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

  it('preserves consumer and field IDREFs without duplicates', () => {
    render(
      <>
        <p id="consumer-help">Ajuda do produto</p>
        <FieldRoot
          controlId="student-name"
          error="Obrigatório"
          hint="Use o nome completo"
          label="Nome"
        >
          <TextInput aria-describedby="consumer-help student-name-hint" />
        </FieldRoot>
      </>,
    )

    expect(screen.getByRole('textbox', { name: 'Nome' })).toHaveAttribute(
      'aria-describedby',
      'consumer-help student-name-hint student-name-error',
    )
  })

  it('renders the eyebrow label variant without changing its accessible name', () => {
    render(
      <FieldRoot label="Código promocional" labelVariant="eyebrow">
        <TextInput />
      </FieldRoot>,
    )

    const input = screen.getByRole('textbox', { name: 'Código promocional' })
    const label = screen.getByText('Código promocional')
    const styles = window.getComputedStyle(label)

    expect(input).toHaveAccessibleName('Código promocional')
    expect(styles.fontWeight).toBe('600')
    expect(styles.letterSpacing).toBe('0.08em')
    expect(styles.textTransform).toBe('uppercase')
  })
})
