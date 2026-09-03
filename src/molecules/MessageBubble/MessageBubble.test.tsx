import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'
import { MessageBubble } from '.'

describe('MessageBubble', () => {
  it('renders semantic message content, time, delivery state and native props', () => {
    const ref = createRef<HTMLElement>()
    render(
      <MessageBubble
        className="consumer-message"
        data-context="lesson"
        dateTime="2026-09-03T10:30:00.000Z"
        ref={ref}
        side="outgoing"
        status="sending"
        statusLabel="Enviando"
        timestamp="10:30"
      >
        Posso enviar a atividade depois da aula?
      </MessageBubble>,
    )

    const message = screen
      .getByText('Posso enviar a atividade depois da aula?')
      .closest('article')

    expect(message).toBe(ref.current)
    expect(message).toHaveClass('lsui-sc-message-bubble', 'consumer-message')
    expect(message).toHaveAttribute('data-context', 'lesson')
    expect(message).toHaveAttribute('data-side', 'outgoing')
    expect(message).toHaveAttribute('data-status', 'sending')
    expect(screen.getByText('Enviando')).toBeInTheDocument()
    expect(screen.getByText('10:30')).toHaveAttribute(
      'datetime',
      '2026-09-03T10:30:00.000Z',
    )
  })

  it('supports incoming and failed messages without depending only on color', () => {
    const { rerender } = render(
      <MessageBubble timestamp="10:31">Tudo bem.</MessageBubble>,
    )

    expect(screen.getByText('Tudo bem.').closest('article')).toHaveAttribute(
      'data-side',
      'incoming',
    )
    expect(screen.queryByText('Falha ao enviar')).not.toBeInTheDocument()

    rerender(
      <MessageBubble
        side="outgoing"
        status="failed"
        statusLabel="Falha ao enviar"
        timestamp="10:32"
      >
        Tento novamente depois.
      </MessageBubble>,
    )

    expect(screen.getByText('Falha ao enviar')).toBeVisible()
    expect(
      screen.getByText('Tento novamente depois.').parentElement,
    ).toHaveStyle({ overflowWrap: 'anywhere' })
  })
})
