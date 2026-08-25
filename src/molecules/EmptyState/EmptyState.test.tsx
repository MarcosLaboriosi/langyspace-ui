import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { EmptyState } from '.'

describe('EmptyState', () => {
  it('delegates the empty state contract to StatePanel', () => {
    render(
      <EmptyState description="A lista está vazia." title="Nenhum aluno" />,
    )

    expect(
      screen.getByText('Nenhum aluno').closest('[data-state]'),
    ).toHaveAttribute('data-state', 'empty')
  })
})
