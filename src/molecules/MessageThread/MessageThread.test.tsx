import { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MessageThread } from '.'

describe('MessageThread', () => {
  it('composes header, viewport and footer while preserving native section props', () => {
    const rootRef = createRef<HTMLElement>()

    render(
      <MessageThread
        ref={rootRef}
        aria-label="Conversa com Maria"
        className="consumer-thread"
        data-context="student"
        footer={<form aria-label="Composer">Composer</form>}
        header={<header>Maria</header>}
        viewportLabel="Histórico da conversa com Maria"
      >
        <div role="log">Mensagens</div>
      </MessageThread>,
    )

    expect(rootRef.current).toHaveClass(
      'lsui-sc-message-thread',
      'consumer-thread',
    )
    expect(rootRef.current).toHaveAttribute('aria-label', 'Conversa com Maria')
    expect(rootRef.current).toHaveAttribute('data-context', 'student')
    expect(screen.getByText('Maria').closest('div')).toHaveAttribute(
      'data-ui-message-thread-part',
      'header',
    )
    expect(
      screen.getByRole('region', { name: 'Histórico da conversa com Maria' }),
    ).toContainElement(screen.getByRole('log'))
    expect(
      screen.getByRole('region', { name: 'Histórico da conversa com Maria' }),
    ).toHaveAttribute('aria-live', 'polite')
    expect(
      screen.getByRole('form', { name: 'Composer' }).closest('footer'),
    ).toHaveAttribute('data-ui-message-thread-part', 'footer')
  })

  it('exposes the viewport ref and scroll event without owning scroll position', () => {
    const viewportRef = createRef<HTMLDivElement>()
    const onViewportScroll = vi.fn()

    render(
      <MessageThread
        aria-label="Conversa"
        header={<span>Header</span>}
        onViewportScroll={onViewportScroll}
        viewportLabel="Histórico"
        viewportRef={viewportRef}
      >
        Conteúdo
      </MessageThread>,
    )

    const viewport = screen.getByRole('region', { name: 'Histórico' })
    expect(viewportRef.current).toBe(viewport)
    expect(viewport).toHaveAttribute('tabindex', '0')

    viewport.scrollTop = 320
    fireEvent.scroll(viewport)

    expect(viewport.scrollTop).toBe(320)
    expect(onViewportScroll).toHaveBeenCalledTimes(1)
    expect(onViewportScroll.mock.calls[0]?.[0].type).toBe('scroll')
  })

  it('keeps the viewport scrollable while hiding the native scrollbar', () => {
    render(
      <MessageThread
        aria-label="Conversa"
        header={<span>Header</span>}
        viewportLabel="Histórico"
      >
        Conteúdo
      </MessageThread>,
    )

    const viewport = screen.getByRole('region', { name: 'Histórico' })
    const style = getComputedStyle(viewport)

    expect(style.overflowX).toBe('hidden')
    expect(style.overflowY).toBe('auto')
    expect(style.getPropertyValue('scrollbar-width')).toBe('none')

    const css = Array.from(document.styleSheets)
      .flatMap((sheet) => Array.from(sheet.cssRules))
      .map((rule) => rule.cssText)
      .join('\n')

    expect(css).toContain('::-webkit-scrollbar')
    expect(css).toMatch(/::-webkit-scrollbar[^}]*display:\s*none/i)
  })

  it('does not create an empty footer when the slot is absent', () => {
    render(
      <MessageThread
        aria-label="Conversa"
        header={<span>Header</span>}
        viewportLabel="Histórico"
      >
        Conteúdo
      </MessageThread>,
    )

    expect(document.querySelector('footer')).toBeNull()
  })
})
