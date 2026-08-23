import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Icon } from '.'
import * as Styled from './styles'

afterEach(() => cleanup())

describe('Icon', () => {
  it('renders nothing when it has no content to show', () => {
    const { container, rerender } = render(<Icon icon={null} />)

    expect(container).toBeEmptyDOMElement()

    rerender(<Icon icon={false} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('wraps the given node without touching it', () => {
    render(<Icon icon={<svg data-testid="glyph" />} />)

    expect(screen.getByTestId('glyph').parentElement).toHaveClass(
      'lsui-sc-icon',
    )
  })

  it('replaces the node with a hidden spinner while loading', () => {
    const { container } = render(
      <Icon icon={<svg data-testid="glyph" />} isLoading />,
    )

    expect(screen.queryByTestId('glyph')).not.toBeInTheDocument()
    expect(container.querySelector('.lsui-sc-spinner')).toHaveAttribute(
      'aria-hidden',
      'true',
    )
  })

  it('spins even when no icon was declared', () => {
    const { container } = render(<Icon icon={undefined} isLoading />)

    expect(container.querySelector('.lsui-sc-spinner')).toBeInTheDocument()
  })

  it('keeps explicit component ids so server and browser renders agree', () => {
    const publishedIds = Object.values(Styled).map(
      (component) => component.styledComponentId,
    )

    expect(publishedIds.length).toBeGreaterThan(0)
    publishedIds.forEach((id) => expect(id).toMatch(/^lsui-sc-/))
  })
})
