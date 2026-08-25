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
})
