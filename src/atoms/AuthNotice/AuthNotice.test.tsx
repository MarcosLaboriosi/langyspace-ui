import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AuthNotice } from '.'

describe('AuthNotice', () => {
  it('keeps native semantics and consumer props without flow behavior', () => {
    render(
      <AuthNotice data-testid="notice" role="alert" tone="error">
        Token inválido
      </AuthNotice>,
    )

    expect(screen.getByRole('alert')).toHaveClass('lsui-sc-auth-notice')
    expect(screen.getByTestId('notice')).toHaveTextContent('Token inválido')
  })

  it('leaves external spacing and content typography to its parent', () => {
    render(
      <AuthNotice data-testid="info" tone="info">
        Código enviado: <code>123456</code>
      </AuthNotice>,
    )

    const notice = screen.getByTestId('info')
    expect(notice).toHaveStyle({ margin: '0' })
    expect(getComputedStyle(notice).fontFamily).not.toContain('Consolas')
    expect(notice.querySelector('code')).toHaveStyle({
      fontFamily:
        "ui-monospace, 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
    })
  })
})
