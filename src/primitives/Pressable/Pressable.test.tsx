import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import styled from 'styled-components'
import { Pressable } from '.'

describe('Pressable', () => {
  it('defaults to a native non-submitting command and forwards native props and ref', async () => {
    const onClick = vi.fn()
    const ref = createRef<HTMLButtonElement>()
    const user = userEvent.setup()

    render(
      <Pressable
        aria-label="Selecionar segunda-feira"
        data-context="availability"
        ref={ref}
        onClick={onClick}
      />,
    )

    const pressable = screen.getByRole('button', {
      name: 'Selecionar segunda-feira',
    })

    await user.click(pressable)

    expect(pressable).toHaveAttribute('type', 'button')
    expect(pressable).toHaveAttribute('data-context', 'availability')
    expect(pressable).toHaveClass('lsui-sc-pressable')
    expect(ref.current).toBe(pressable)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('preserves explicit submit and disabled behavior', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(
      <Pressable disabled type="submit" onClick={onClick}>
        Guardar
      </Pressable>,
    )

    const pressable = screen.getByRole('button', { name: 'Guardar' })

    await user.click(pressable)

    expect(pressable).toHaveAttribute('type', 'submit')
    expect(pressable).toBeDisabled()
    expect(onClick).not.toHaveBeenCalled()
  })

  it('accepts consumer composition without losing its stable component id', () => {
    const Tab = styled(Pressable)`
      min-height: 2rem;
      border-radius: 0.5rem;
    `

    render(<Tab>Vocabulário</Tab>)

    expect(screen.getByRole('button', { name: 'Vocabulário' })).toHaveClass(
      'lsui-sc-pressable',
    )
  })
})
