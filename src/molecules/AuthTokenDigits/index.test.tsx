import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AuthNotice, AuthTokenDigits } from '../..'

afterEach(() => cleanup())

describe('auth components', () => {
  it('keeps AuthNotice semantic, native-first and free of flow behavior', () => {
    render(
      <AuthNotice data-testid="notice" role="alert" tone="error">
        Token inválido
      </AuthNotice>,
    )

    expect(screen.getByRole('alert')).toHaveClass('lsui-sc-auth-notice')
    expect(screen.getByTestId('notice')).toHaveTextContent('Token inválido')
  })

  it('supports uncontrolled digit entry, sanitization, focus and backspace', async () => {
    const onTokenChange = vi.fn()
    const user = userEvent.setup()

    render(
      <AuthTokenDigits
        aria-label="Código de acesso"
        autoFocus={false}
        digitLabel="Dígito"
        idPrefix="login-code"
        length={4}
        onTokenChange={onTokenChange}
      />,
    )

    const digits = screen.getAllByRole('textbox')
    await user.type(digits[0], 'a1')

    expect(onTokenChange).toHaveBeenLastCalledWith('1')
    expect(digits[1]).toHaveFocus()

    await user.keyboard('{Backspace}')
    expect(digits[0]).toHaveFocus()
  })

  it('supports full paste and a controlled value without owning flow state', () => {
    const onTokenChange = vi.fn()
    const { rerender } = render(
      <AuthTokenDigits
        aria-label="Código de acesso"
        autoFocus={false}
        digitLabel="Dígito"
        idPrefix="register-code"
        length={4}
        value="12"
        onTokenChange={onTokenChange}
      />,
    )

    let digits = screen.getAllByRole('textbox') as HTMLInputElement[]
    expect(digits.map((input) => input.value)).toEqual(['1', '2', '', ''])

    fireEvent.paste(digits[2], {
      clipboardData: { getData: () => '9a876' },
    })
    expect(onTokenChange).toHaveBeenLastCalledWith('9876')

    rerender(
      <AuthTokenDigits
        aria-label="Código de acesso"
        autoFocus={false}
        digitLabel="Dígito"
        hasError
        idPrefix="register-code"
        length={4}
        value="9876"
        onTokenChange={onTokenChange}
      />,
    )
    digits = screen.getAllByRole('textbox') as HTMLInputElement[]
    expect(digits.map((input) => input.value)).toEqual(['9', '8', '7', '6'])
    expect(digits[0]).toHaveAttribute('aria-invalid', 'true')
  })
})
