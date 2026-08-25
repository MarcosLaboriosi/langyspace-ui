import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from '../../atoms/Button'
import { SectionHeader } from '.'

describe('SectionHeader', () => {
  it('keeps heading hierarchy, metadata and actions explicit', () => {
    render(
      <SectionHeader
        actions={<Button size="sm">Ver detalhes</Button>}
        className="consumer-section"
        data-context="billing"
        headingLevel={3}
        meta="4 itens"
        spacing="flush"
        title="Fila operacional"
      />,
    )

    const title = screen.getByRole('heading', {
      level: 3,
      name: 'Fila operacional',
    })
    const root = title.closest('.lsui-sc-section-header')

    expect(root).toHaveClass('consumer-section')
    expect(root).toHaveAttribute('data-context', 'billing')
    expect(root).toHaveStyle({ marginTop: '0', width: '100%' })
    expect(screen.getByText('4 itens')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Ver detalhes' }),
    ).toBeInTheDocument()
  })

  it('defaults to a level-two heading without an empty aside', () => {
    render(<SectionHeader title="Agenda de hoje" />)

    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Agenda de hoje',
    })
    const root = title.closest('.lsui-sc-section-header')

    expect(root).toHaveStyle({ marginBottom: '1rem', marginTop: '2rem' })
    expect(root?.children).toHaveLength(1)
  })
})
