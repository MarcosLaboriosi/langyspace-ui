import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { IconSlot } from '.'
import * as Styled from './styles'

afterEach(() => cleanup())

describe('IconSlot', () => {
  it('renders nothing when it has no content to show', () => {
    const { container, rerender } = render(<IconSlot icon={null} />)

    expect(container).toBeEmptyDOMElement()

    rerender(<IconSlot icon={false} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('wraps the given node without touching it', () => {
    render(<IconSlot icon={<svg data-testid="glyph" />} />)

    expect(screen.getByTestId('glyph').parentElement).toHaveClass(
      'lsui-sc-icon',
    )
  })

  it('keeps explicit component ids so server and browser renders agree', () => {
    const publishedIds = Object.values(Styled).map(
      (component) => component.styledComponentId,
    )

    expect(publishedIds.length).toBeGreaterThan(0)
    publishedIds.forEach((id) => expect(id).toMatch(/^lsui-sc-/))
  })
})
