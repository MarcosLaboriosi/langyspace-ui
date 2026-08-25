import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'
import { TextareaInput } from '.'

describe('TextareaInput', () => {
  it('forwards native props and its ref', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(
      <TextareaInput
        aria-label="Notas"
        defaultValue="Próxima aula"
        ref={ref}
      />,
    )

    expect(screen.getByRole('textbox', { name: 'Notas' })).toBe(ref.current)
    expect(ref.current).toHaveClass('lsui-sc-textarea-input')
  })
})
