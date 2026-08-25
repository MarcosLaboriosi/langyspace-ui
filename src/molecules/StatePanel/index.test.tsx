import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Button, EmptyState, LoadingState, StatePanel } from '../..'

afterEach(() => cleanup())

describe('StatePanel', () => {
  it('applies accessibility by state', () => {
    const { rerender } = render(
      <StatePanel icon={<span>×</span>} state="empty" title="Sem dados" />,
    )

    let panel = screen.getByText('Sem dados').closest('[data-ui-state-panel]')

    expect(panel).not.toHaveAttribute('role')
    expect(panel).not.toHaveAttribute('aria-busy')

    rerender(<StatePanel state="error" title="Falha ao carregar" />)
    panel = screen.getByRole('alert')
    expect(panel).toHaveTextContent('Falha ao carregar')

    rerender(<StatePanel state="loading" title="Carregando" />)
    panel = screen.getByRole('status')
    expect(panel).toHaveAttribute('aria-busy', 'true')
    expect(panel).toHaveAttribute('aria-live', 'polite')

    rerender(<StatePanel state="partial" title="Resultado parcial" />)
    panel = screen.getByRole('status')
    expect(panel).not.toHaveAttribute('aria-busy')
    expect(panel).toHaveAttribute('aria-live', 'polite')
  })

  it('supports optional content and native container props', () => {
    render(
      <StatePanel
        action={<Button>Tentar novamente</Button>}
        className="consumer-state"
        data-context="student-list"
        density="compact"
        description="Confira sua conexão e tente outra vez."
        fill
        state="error"
        surface="dashed"
        title="Não foi possível carregar"
      />,
    )

    const panel = screen.getByRole('alert')

    expect(panel).toHaveClass('lsui-sc-state-panel', 'consumer-state')
    expect(panel).toHaveAttribute('data-context', 'student-list')
    expect(panel).toHaveAttribute('data-state', 'error')
    expect(panel).toHaveStyle({
      borderColor: '#d8d4cb',
      borderRadius: '0.875rem',
      color: '#6b6b6b',
    })
    expect(
      screen.getByText('Confira sua conexão e tente outra vez.'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Tentar novamente' }),
    ).toBeInTheDocument()
  })

  it('keeps wrappers small and loading status owned by the container', () => {
    const { rerender } = render(
      <EmptyState description="A lista está vazia." title="Nenhum aluno" />,
    )

    expect(
      screen.getByText('Nenhum aluno').closest('[data-state]'),
    ).toHaveAttribute('data-state', 'empty')

    rerender(<LoadingState title="Carregando alunos" />)

    const panel = screen.getByRole('status')
    const spinner = panel.querySelector('.lsui-sc-spinner')

    expect(panel).toHaveAttribute('data-ui-loading-state', 'true')
    expect(panel).toHaveAttribute('aria-busy', 'true')
    expect(spinner).toHaveAttribute('aria-hidden', 'true')
  })
})
