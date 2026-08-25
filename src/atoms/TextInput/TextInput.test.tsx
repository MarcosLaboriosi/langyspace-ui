import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'
import { TextInput } from '.'

describe('TextInput', () => {
  it('forwards native props and its ref', () => {
    const ref = createRef<HTMLInputElement>()
    render(<TextInput aria-label="Nome" defaultValue="Maria" ref={ref} />)

    expect(screen.getByRole('textbox', { name: 'Nome' })).toBe(ref.current)
    expect(ref.current).toHaveClass('lsui-sc-text-input')
  })
})
