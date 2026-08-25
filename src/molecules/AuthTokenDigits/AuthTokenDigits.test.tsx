import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { AuthTokenDigits } from '.'

describe('AuthTokenDigits', () => {
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

  it('distributes continuous typing through a controlled value', async () => {
    const onTokenChange = vi.fn()
    const user = userEvent.setup()

    function ControlledToken() {
      const [value, setValue] = useState('')

      return (
        <AuthTokenDigits
          aria-label="Código de acesso"
          autoFocus={false}
          digitLabel="Dígito"
          idPrefix="continuous-code"
          length={6}
          value={value}
          onTokenChange={(token) => {
            setValue(token)
            onTokenChange(token)
          }}
        />
      )
    }

    render(<ControlledToken />)
    await user.type(screen.getByLabelText('Dígito 1'), '123456')

    expect(onTokenChange).toHaveBeenLastCalledWith('123456')
  })

  it('supports directional, first and last keyboard focus', async () => {
    const user = userEvent.setup()

    render(
      <AuthTokenDigits
        aria-label="Código de acesso"
        autoFocus={false}
        digitLabel="Dígito"
        idPrefix="keyboard-code"
        length={4}
        onTokenChange={() => undefined}
      />,
    )

    const digits = screen.getAllByRole('textbox')
    await user.click(digits[1])
    await user.keyboard('{ArrowLeft}')
    expect(digits[0]).toHaveFocus()
    await user.keyboard('{ArrowRight}')
    expect(digits[1]).toHaveFocus()
    await user.keyboard('{End}')
    expect(digits[3]).toHaveFocus()
    await user.keyboard('{Home}')
    expect(digits[0]).toHaveFocus()
  })

  it('does not resurrect truncated uncontrolled digits after length changes', async () => {
    const user = userEvent.setup()
    const props = {
      'aria-label': 'Código de acesso',
      autoFocus: false,
      digitLabel: 'Dígito',
      idPrefix: 'resized-code',
      onTokenChange: () => undefined,
    } as const
    const { rerender } = render(<AuthTokenDigits {...props} length={6} />)

    await user.type(screen.getByLabelText('Dígito 1'), '123456')
    rerender(<AuthTokenDigits {...props} length={4} />)
    expect(screen.getAllByRole('textbox')).toHaveLength(4)

    rerender(<AuthTokenDigits {...props} length={6} />)
    expect(
      screen
        .getAllByRole('textbox')
        .map((input) => (input as HTMLInputElement).value),
    ).toEqual(['1', '2', '3', '4', '', ''])
  })

  it('autofocuses only when enabled by the consumer', () => {
    vi.useFakeTimers()

    try {
      const props = {
        'aria-label': 'Código de acesso',
        digitLabel: 'Dígito',
        idPrefix: 'autofocus-code',
        length: 4,
        onTokenChange: () => undefined,
      } as const
      const { rerender } = render(
        <AuthTokenDigits {...props} autoFocus disabled />,
      )

      act(() => vi.advanceTimersByTime(80))
      expect(screen.getByLabelText('Dígito 1')).not.toHaveFocus()

      rerender(<AuthTokenDigits {...props} autoFocus />)
      act(() => vi.advanceTimersByTime(80))
      expect(screen.getByLabelText('Dígito 1')).toHaveFocus()
    } finally {
      vi.useRealTimers()
    }
  })
})
