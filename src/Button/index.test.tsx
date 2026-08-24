import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import styled from 'styled-components'
import { Button } from '..'
import * as ButtonStyles from './styles'

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
    expect(button).toHaveAttribute('data-density', 'regular')
    expect(button).toHaveClass('lsui-sc-button', 'consumer-button')
    expect(button).toHaveStyle({ backgroundColor: '#0a0a0a' })
    expect(ref.current).toBe(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('offers a compact density without changing the canonical height', () => {
    render(
      <Button density="compact" size="md" variant="secondary">
        Remarcar aula
      </Button>,
    )

    expect(
      screen.getByRole('button', { name: 'Remarcar aula' }),
    ).toHaveAttribute('data-density', 'compact')
  })

  it('renders each approved variant and size with its own appearance', () => {
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
        <Button variant="danger">Destrutivo</Button>
        <Button variant="success">Conclusão positiva</Button>
        <Button tone="brand">Institucional</Button>
      </>,
    )

    expect(screen.getByRole('button', { name: 'Principal' })).toHaveStyle({
      backgroundColor: '#0a0a0a',
      minHeight: '2rem',
    })
    expect(screen.getByRole('button', { name: 'Secundário' })).toHaveStyle({
      backgroundColor: '#ffffff',
      minHeight: '2.5rem',
    })
    expect(screen.getByRole('button', { name: 'Terciário' })).toHaveStyle({
      backgroundColor: 'rgba(0, 0, 0, 0)',
      minHeight: '3rem',
    })
    expect(screen.getByRole('button', { name: 'Destrutivo' })).toHaveStyle({
      backgroundColor: '#c62828',
    })
    expect(
      screen.getByRole('button', { name: 'Conclusão positiva' }),
    ).toHaveStyle({ backgroundColor: '#166534' })
    expect(screen.getByRole('button', { name: 'Institucional' })).toHaveStyle({
      backgroundColor: '#cc0f45',
    })
  })

  it('restricts the brand tone to the primary hierarchy', () => {
    render(
      <>
        <Button tone="brand">Matrícula</Button>
        {/* @ts-expect-error brand é permitido apenas em primary */}
        <Button tone="brand" variant="secondary">
          Cancelar
        </Button>
      </>,
    )

    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  it('accepts one icon on each edge and renders neither by default', () => {
    const { rerender } = render(<Button>Guardar</Button>)

    expect(
      screen.getByRole('button', { name: 'Guardar' }).querySelector('span'),
    ).toBeNull()

    rerender(
      <Button
        iconEnd={<svg data-testid="end" />}
        iconStart={<svg data-testid="start" />}
      >
        Guardar
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Guardar' })

    expect(button.firstElementChild).toContainElement(
      screen.getByTestId('start'),
    )
    expect(button.lastElementChild).toContainElement(screen.getByTestId('end'))
  })

  it('keeps its label, replaces the icon and blocks interaction while loading', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(
      <Button
        iconStart={<span data-testid="consumer-icon" />}
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
    expect(button.querySelector('.lsui-sc-spinner')).toHaveAttribute(
      'aria-hidden',
      'true',
    )
    expect(screen.queryByTestId('consumer-icon')).not.toBeInTheDocument()
    expect(onClick).not.toHaveBeenCalled()
  })

  it('spins on the starting edge only when that edge has an icon', () => {
    const { rerender } = render(
      <Button iconEnd={<svg data-testid="end" />} isLoading>
        <span data-testid="label">Salvar</span>
      </Button>,
    )

    let button = screen.getByRole('button', { name: 'Salvar' })
    const spinner = () => button.querySelector<HTMLElement>('.lsui-sc-spinner')

    expect(button.firstElementChild).toBe(screen.getByTestId('label'))
    expect(button.lastElementChild).toContainElement(spinner())
    expect(screen.queryByTestId('end')).not.toBeInTheDocument()

    rerender(
      <Button
        iconEnd={<svg data-testid="end" />}
        iconStart={<svg data-testid="start" />}
        isLoading
      >
        <span data-testid="label">Salvar</span>
      </Button>,
    )

    button = screen.getByRole('button', { name: 'Salvar' })

    expect(button.querySelectorAll('.lsui-sc-spinner')).toHaveLength(1)
    expect(button.firstElementChild).toContainElement(spinner())
    expect(screen.queryByTestId('start')).not.toBeInTheDocument()
    expect(button.lastElementChild).toContainElement(screen.getByTestId('end'))
  })

  it('lets loading override the busy and disabled values the consumer sent', () => {
    const { rerender } = render(
      <Button aria-busy="false" disabled={false} type="submit">
        Enviar
      </Button>,
    )

    let button = screen.getByRole('button', { name: 'Enviar' })

    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toHaveAttribute('aria-busy', 'false')
    expect(button).not.toBeDisabled()

    rerender(
      <Button aria-busy="false" disabled={false} isLoading type="submit">
        Enviar
      </Button>,
    )

    button = screen.getByRole('button', { name: 'Enviar' })

    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toBeDisabled()
  })

  it('fills its container only when fullWidth is explicit', () => {
    const { rerender } = render(<Button>Continuar</Button>)

    expect(screen.getByRole('button', { name: 'Continuar' })).not.toHaveStyle({
      width: '100%',
    })

    rerender(<Button fullWidth>Continuar</Button>)

    const fullWidthButton = screen.getByRole('button', { name: 'Continuar' })

    expect(fullWidthButton).toHaveStyle({ width: '100%' })
  })

  it('offers a rounded shape next to the default pill', () => {
    const { rerender } = render(<Button>Continuar</Button>)

    expect(screen.getByRole('button', { name: 'Continuar' })).toHaveStyle({
      borderRadius: '999px',
    })

    rerender(<Button shape="rounded">Continuar</Button>)

    expect(screen.getByRole('button', { name: 'Continuar' })).toHaveStyle({
      borderRadius: '0.75rem',
    })
  })

  it('turns into a square that holds the icon when iconOnly', () => {
    render(
      <Button aria-label="Tocar áudio" iconOnly>
        <svg data-testid="glyph" />
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Tocar áudio' })

    expect(button).toHaveStyle({
      minHeight: '2.5rem',
      width: '2.5rem',
      borderRadius: '999px',
      paddingLeft: '0px',
      paddingRight: '0px',
    })
    expect(screen.getByTestId('glyph').parentElement).toHaveClass(
      'lsui-sc-icon',
    )
  })

  it('keeps the iconOnly square inside a container narrower than it', () => {
    render(
      <div style={{ display: 'flex', width: '20px' }}>
        <Button aria-label="Voltar" iconOnly>
          <svg />
        </Button>
      </div>,
    )

    expect(screen.getByRole('button', { name: 'Voltar' })).toHaveStyle({
      width: '2.5rem',
      minHeight: '2.5rem',
      maxWidth: 'none',
      flexShrink: '0',
    })
  })

  it('swaps the only icon for the spinner while an iconOnly button loads', () => {
    const { container } = render(
      <Button aria-label="Tocar áudio" iconOnly isLoading>
        <svg data-testid="glyph" />
      </Button>,
    )

    expect(screen.queryByTestId('glyph')).not.toBeInTheDocument()
    expect(container.querySelectorAll('.lsui-sc-spinner')).toHaveLength(1)
  })

  it('demands an accessible name and refuses icon slots when iconOnly', () => {
    render(
      <>
        {/* @ts-expect-error iconOnly sem nome acessível */}
        <Button iconOnly>
          <svg />
        </Button>
        <Button aria-labelledby="rotulo" iconOnly>
          <svg />
        </Button>
        {/* @ts-expect-error iconOnly já usa children como ícone */}
        <Button aria-label="Tocar" iconOnly iconStart={<svg />}>
          <svg />
        </Button>
      </>,
    )

    expect(screen.getAllByRole('button')).toHaveLength(3)
  })

  it('keeps explicit component ids so server and browser renders agree', () => {
    render(<Button size="lg">Publicar</Button>)

    expect(screen.getByRole('button', { name: 'Publicar' })).toHaveClass(
      'lsui-sc-button',
    )

    const publishedIds = Object.values(ButtonStyles).map(
      (component) => component.styledComponentId,
    )

    expect(publishedIds.length).toBeGreaterThan(0)
    publishedIds.forEach((id) => expect(id).toMatch(/^lsui-sc-/))
  })

  it('supports local styled(Button) composition through forwarded className', () => {
    const CheckoutButton = styled(Button)`
      width: 12rem;
      margin-top: 1rem;
    `

    render(<CheckoutButton>Finalizar compra</CheckoutButton>)

    expect(
      screen.getByRole('button', { name: 'Finalizar compra' }),
    ).toHaveStyle({ marginTop: '1rem', width: '12rem' })
  })
})
