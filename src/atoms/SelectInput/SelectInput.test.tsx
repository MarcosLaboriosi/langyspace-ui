import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'
import { SelectInput } from '.'

describe('SelectInput', () => {
  it('forwards native props and its ref', () => {
    const ref = createRef<HTMLSelectElement>()
    render(
      <SelectInput aria-label="Nível" defaultValue="b1" ref={ref}>
        <option value="b1">B1</option>
      </SelectInput>,
    )

    expect(screen.getByRole('combobox', { name: 'Nível' })).toBe(ref.current)
    expect(ref.current).toHaveClass('lsui-sc-select-input')
  })
})
