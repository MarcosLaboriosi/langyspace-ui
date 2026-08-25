import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LoadingState } from '.'

describe('LoadingState', () => {
  it('keeps busy semantics on the container and its spinner decorative', () => {
    render(<LoadingState title="Carregando alunos" />)

    const panel = screen.getByRole('status')
    expect(panel).toHaveAttribute('data-ui-loading-state', 'true')
    expect(panel).toHaveAttribute('aria-busy', 'true')
    expect(panel.querySelector('.lsui-sc-spinner')).toHaveAttribute(
      'aria-hidden',
      'true',
    )
  })
})
