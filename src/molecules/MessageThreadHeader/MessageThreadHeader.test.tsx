import { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MessageThreadHeader } from '.'

describe('MessageThreadHeader', () => {
  it('renders participant identity and both action slots without displacing semantics', () => {
    const ref = createRef<HTMLElement>()

    render(
      <MessageThreadHeader
        ref={ref}
        aria-label="Participante da conversa"
        className="consumer-header"
        imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
        initials="MA"
        leadingAction={<button type="button">Voltar</button>}
        subtitle="Mensagens ficam registradas na Langy.space."
        title="Maria Almeida"
        trailingAction={<button type="button">Mais opções</button>}
      />,
    )

    expect(ref.current).toHaveClass(
      'lsui-sc-message-thread-header',
      'consumer-header',
    )
    expect(ref.current).toHaveAttribute(
      'aria-label',
      'Participante da conversa',
    )
    expect(
      screen.getByRole('heading', { level: 2, name: 'Maria Almeida' }),
    ).toHaveAttribute('title', 'Maria Almeida')
    expect(
      screen.getByText('Mensagens ficam registradas na Langy.space.'),
    ).toHaveAttribute('title', 'Mensagens ficam registradas na Langy.space.')
    expect(
      screen.getByRole('button', { name: 'Voltar' }).parentElement,
    ).toHaveAttribute('data-ui-message-thread-header-part', 'leading-action')
    expect(
      screen.getByRole('button', { name: 'Mais opções' }).parentElement,
    ).toHaveAttribute('data-ui-message-thread-header-part', 'trailing-action')
    expect(document.querySelector('img')).toHaveAttribute('alt', '')
  })

  it('keeps deterministic initials when the image is absent or fails', () => {
    const { rerender } = render(
      <MessageThreadHeader initials="P" title="Professora" />,
    )

    expect(screen.getByText('P')).toBeInTheDocument()
    expect(document.querySelector('img')).toBeNull()

    rerender(
      <MessageThreadHeader
        imageUrl="https://example.invalid/photo.jpg"
        initials="MF"
        title="Maria Fernanda"
      />,
    )
    fireEvent.error(document.querySelector('img')!)

    expect(document.querySelector('img')).toBeNull()
    expect(screen.getByText('MF')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Maria Fernanda' }),
    ).toBeInTheDocument()
  })

  it('preserves the complete accessible name for an extreme unbroken title', () => {
    const title =
      'ProfessoraComUmNomeExtremamenteLongoSemEspacosParaTestarTruncamento'

    render(<MessageThreadHeader initials="PC" title={title} />)

    expect(
      screen.getByRole('heading', { level: 2, name: title }),
    ).toHaveAttribute('title', title)
  })
})
