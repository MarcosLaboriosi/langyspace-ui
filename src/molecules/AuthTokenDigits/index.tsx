import { useEffect, useRef, useState, type ClipboardEvent } from 'react'
import * as Styled from './styles'
import { getEmptyDigits, getTokenDigits } from './utils'
import type { AuthTokenDigitsProps } from './types'

export function AuthTokenDigits({
  autoFocus = true,
  digitLabel,
  disabled = false,
  hasError = false,
  idPrefix,
  length,
  value,
  onTokenChange,
  ...props
}: AuthTokenDigitsProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const [internalDigits, setInternalDigits] = useState<string[]>(() =>
    getEmptyDigits(length),
  )
  const digits =
    value === undefined
      ? getTokenDigits(internalDigits.join(''), length)
      : getTokenDigits(value, length)

  useEffect(() => {
    if (!autoFocus || disabled) return
    const focusTimeoutId = window.setTimeout(
      () => inputRefs.current[0]?.focus(),
      80,
    )
    return () => window.clearTimeout(focusTimeoutId)
  }, [autoFocus, disabled])

  const updateDigits = (nextDigits: string[]) => {
    setInternalDigits(nextDigits)
    onTokenChange(nextDigits.join(''))
  }

  const handleDigitChange = (index: number, nextInput: string) => {
    const nextValue = nextInput.replace(/\D/g, '')

    if (nextValue.length > 1) {
      const nextDigits = [...digits]
      const inserted = nextValue.slice(0, length - index)
      Array.from(inserted).forEach((digit, digitIndex) => {
        nextDigits[index + digitIndex] = digit
      })
      updateDigits(nextDigits)
      inputRefs.current[Math.min(index + inserted.length, length) - 1]?.focus()
      return
    }

    const nextDigits = [...digits]
    const nextDigit = nextValue.slice(-1)
    nextDigits[index] = nextDigit
    updateDigits(nextDigits)
    if (nextDigit && index < length - 1) inputRefs.current[index + 1]?.focus()
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pastedDigits = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, length)
    if (!pastedDigits) return

    const nextDigits = Array.from(
      { length },
      (_, index) => pastedDigits[index] ?? '',
    )
    updateDigits(nextDigits)
    inputRefs.current[Math.min(pastedDigits.length, length) - 1]?.focus()
  }

  return (
    <Styled.Row {...props}>
      {digits.map((digit, index) => (
        <Styled.Input
          key={index}
          ref={(input) => {
            inputRefs.current[index] = input
          }}
          $hasError={hasError}
          $isFilled={Boolean(digit)}
          aria-invalid={hasError || undefined}
          aria-label={`${digitLabel} ${index + 1}`}
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          disabled={disabled}
          id={`${idPrefix}-${index}`}
          inputMode="numeric"
          maxLength={index === 0 ? length : 1}
          value={digit}
          onChange={(event) => handleDigitChange(index, event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Backspace' && !digits[index] && index > 0) {
              inputRefs.current[index - 1]?.focus()
            }
          }}
          onPaste={handlePaste}
        />
      ))}
    </Styled.Row>
  )
}

export type { AuthTokenDigitsProps } from './types'
