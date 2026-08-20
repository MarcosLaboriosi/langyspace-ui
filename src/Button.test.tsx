import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Button } from './index'

afterEach(() => cleanup())

describe('Button', () => {
  it('defaults to a native non-submitting primary command and forwards its ref', async () => {
    const onClick = vi.fn()
    const ref = createRef<HTMLButtonElement>()
    const user = userEvent.setup()

    render(
      <Button
        ref={ref}
        className="consumer-button"
        data-context="checkout"
        onClick={onClick}
      >
        Continuar
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Continuar' })

    await user.click(button)

    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('data-context', 'checkout')
    expect(button).toHaveAttribute('data-size', 'md')
    expect(button).toHaveAttribute('data-variant', 'primary')
    expect(button).toHaveClass('lsui-button', 'consumer-button')
    expect(ref.current).toBe(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('exposes only the approved semantic variants and sizes as bounded attributes', () => {
    render(
      <>
        <Button size="sm" variant="primary">
          Principal
        </Button>
        <Button size="md" variant="secondary">
          Secundário
        </Button>
        <Button size="lg" variant="tertiary">
          Terciário
        </Button>
      </>,
    )

    expect(screen.getByRole('button', { name: 'Principal' })).toHaveAttribute(
      'data-size',
      'sm',
    )
    expect(screen.getByRole('button', { name: 'Secundário' })).toHaveAttribute(
      'data-variant',
      'secondary',
    )
    expect(screen.getByRole('button', { name: 'Terciário' })).toHaveAttribute(
      'data-size',
      'lg',
    )
    expect(screen.getByRole('button', { name: 'Terciário' })).toHaveAttribute(
      'data-variant',
      'tertiary',
    )
  })

  it('places one optional icon at the requested edge', () => {
    const { rerender } = render(
      <Button icon={<svg data-testid="icon" />} iconPosition="start">
        Guardar
      </Button>,
    )

    let button = screen.getByRole('button', { name: 'Guardar' })

    expect(button).toHaveAttribute('data-icon-position', 'start')
    expect(button.firstElementChild).toContainElement(
      screen.getByTestId('icon'),
    )

    rerender(
      <Button icon={<svg data-testid="icon-end" />} iconPosition="end">
        Guardar
      </Button>,
    )

    button = screen.getByRole('button', { name: 'Guardar' })

    expect(button).toHaveAttribute('data-icon-position', 'end')
    expect(button.lastElementChild).toContainElement(
      screen.getByTestId('icon-end'),
    )
  })

  it('keeps its label, replaces the icon and blocks interaction while loading', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(
      <Button
        icon={<span data-testid="consumer-icon" />}
        iconPosition="start"
        isLoading
        onClick={onClick}
      >
        Salvar alterações
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Salvar alterações' })

    await user.click(button)

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toHaveAttribute('data-loading', 'true')
    expect(button).toHaveTextContent('Salvar alterações')
    expect(button.querySelector('.lsui-button__spinner')).toBeInTheDocument()
    expect(screen.queryByTestId('consumer-icon')).not.toBeInTheDocument()
    expect(onClick).not.toHaveBeenCalled()
  })

  it('composes explicit disabled, busy, submit and full-width native contracts', () => {
    render(
      <Button
        aria-busy="false"
        disabled
        fullWidth
        type="submit"
        variant="secondary"
      >
        Enviar
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Enviar' })

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'false')
    expect(button).toHaveAttribute('data-full-width', 'true')
    expect(button).toHaveAttribute('type', 'submit')
  })
})
