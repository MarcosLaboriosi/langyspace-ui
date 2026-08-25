import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CompoundControl } from '.'

describe('CompoundControl', () => {
  it('owns one visual surface with explicit adornment semantics', () => {
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
})
