import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import styled from 'styled-components'
import { IconButton } from '../..'
import * as IconButtonStyles from './styles'

describe('IconButton', () => {
  it('requires a name, defaults to a neutral native button and forwards props and ref', async () => {
    const onClick = vi.fn()
    const ref = createRef<HTMLButtonElement>()
    const user = userEvent.setup()

    render(
      <IconButton
        aria-label="Fechar"
        data-context="drawer"
        onClick={onClick}
        ref={ref}
      >
        <svg data-testid="glyph" />
      </IconButton>,
    )

    const button = screen.getByRole('button', { name: 'Fechar' })
    await user.click(button)

    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('data-context', 'drawer')
    expect(button).toHaveClass('lsui-sc-icon-button')
    expect(button).toHaveStyle({
      backgroundColor: '#ffffff',
      borderRadius: '999px',
      minHeight: '2.5rem',
      width: '2.5rem',
    })
    expect(screen.getByTestId('glyph').parentElement).toHaveClass(
      'lsui-sc-icon',
    )
    expect(ref.current).toBe(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('supports every semantic variant, canonical size and approved shape', () => {
    render(
      <>
        <IconButton aria-label="Neutro" size="sm" variant="neutral">
          <svg />
        </IconButton>
        <IconButton aria-label="Discreto" shape="rounded" variant="subtle">
          <svg />
        </IconButton>
        <IconButton aria-label="Marca" size="lg" variant="brand">
          <svg />
        </IconButton>
        <IconButton aria-label="Sucesso" variant="success">
          <svg />
        </IconButton>
        <IconButton aria-label="Perigo" variant="danger">
          <svg />
        </IconButton>
        <IconButton aria-label="Inverso" variant="inverse">
          <svg />
        </IconButton>
      </>,
    )

    expect(screen.getByRole('button', { name: 'Neutro' })).toHaveStyle({
      minHeight: '2rem',
      width: '2rem',
    })
    expect(screen.getByRole('button', { name: 'Discreto' })).toHaveStyle({
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderRadius: '0.75rem',
    })
    expect(screen.getByRole('button', { name: 'Marca' })).toHaveStyle({
      backgroundColor: '#cc0f45',
      minHeight: '3rem',
      width: '3rem',
    })
    expect(screen.getByRole('button', { name: 'Sucesso' })).toHaveStyle({
      backgroundColor: '#166534',
    })
    expect(screen.getByRole('button', { name: 'Perigo' })).toHaveStyle({
      backgroundColor: 'rgba(0, 0, 0, 0)',
      color: '#c62828',
    })
    expect(screen.getByRole('button', { name: 'Inverso' })).toHaveStyle({
      borderColor: 'rgba(255, 255, 255, 0.2)',
      color: '#ffffff',
    })
  })

  it('replaces its glyph with one spinner and blocks interaction while loading', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(
      <IconButton aria-label="Guardar" isLoading onClick={onClick}>
        <svg data-testid="glyph" />
      </IconButton>,
    )

    const button = screen.getByRole('button', { name: 'Guardar' })
    await user.click(button)

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toHaveAttribute('data-loading', 'true')
    expect(screen.queryByTestId('glyph')).not.toBeInTheDocument()
    expect(button.querySelectorAll('.lsui-sc-spinner')).toHaveLength(1)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('accepts aria-labelledby and rejects missing or ambiguous accessible names', () => {
    const renderTypeOnlyExamples = false as boolean

    render(
      <>
        <span id="external-label">Abrir menu</span>
        <IconButton aria-labelledby="external-label">
          <svg />
        </IconButton>
      </>,
    )

    if (renderTypeOnlyExamples) {
      // @ts-expect-error todo IconButton exige nome acessível
      ;<IconButton>
        <svg />
      </IconButton>
      // @ts-expect-error use aria-label ou aria-labelledby, nunca ambos
      ;<IconButton aria-label="Abrir" aria-labelledby="external-label">
        <svg />
      </IconButton>
      // @ts-expect-error IconButton recebe um glyph, não slots laterais
      ;<IconButton aria-label="Abrir" iconEnd={<svg />}>
        <svg />
      </IconButton>
      // @ts-expect-error cor pertence aos variants semânticos
      ;<IconButton aria-label="Abrir" color="red">
        <svg />
      </IconButton>
    }

    expect(screen.getByRole('button', { name: 'Abrir menu' })).toBeVisible()
  })

  it('keeps a stable component id and supports styled composition', () => {
    const ToolbarButton = styled(IconButton)`
      margin-left: 1rem;
    `

    render(
      <ToolbarButton aria-label="Mais ações">
        <svg />
      </ToolbarButton>,
    )

    expect(screen.getByRole('button', { name: 'Mais ações' })).toHaveStyle({
      marginLeft: '1rem',
    })
    expect(IconButtonStyles.IconButton.styledComponentId).toBe(
      'lsui-sc-icon-button',
    )
  })
})
