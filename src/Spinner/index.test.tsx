import '@testing-library/jest-dom/vitest'
import { cleanup, render } from '@testing-library/react'
import { createRef } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Spinner } from '.'
import * as Styled from './styles'

afterEach(() => cleanup())

describe('Spinner', () => {
  it('is a decorative current-color indicator with an inherited default size', () => {
    const { container } = render(<Spinner data-context="saving" />)
    const spinner = container.firstElementChild

    expect(spinner).toHaveClass('lsui-sc-spinner')
    expect(spinner).toHaveAttribute('aria-hidden', 'true')
    expect(spinner).toHaveAttribute('data-context', 'saving')
    expect(spinner).toHaveStyle({ height: '1em', width: '1em' })
  })

  it('offers only the canonical size scale and forwards its ref', () => {
    const ref = createRef<HTMLSpanElement>()
    const { container } = render(<Spinner ref={ref} size="lg" />)

    expect(container.firstElementChild).toHaveStyle({
      height: '1.5rem',
      width: '1.5rem',
    })
    expect(ref.current).toBe(container.firstElementChild)
  })

  it('publishes stable styles including the reduced-motion fallback', () => {
    render(<Spinner />)

    expect(Styled.Spinner.styledComponentId).toBe('lsui-sc-spinner')
    expect(document.head.textContent).toContain(
      '@media (prefers-reduced-motion: reduce)',
    )
    expect(document.head.textContent).toContain('animation:none')
  })
})
