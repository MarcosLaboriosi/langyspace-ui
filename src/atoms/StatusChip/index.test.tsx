import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { StatusChip } from '../..'
import type { StatusChipTone } from './types'

afterEach(() => cleanup())

describe('StatusChip', () => {
  it('renders every semantic tone with native span props', () => {
    const tones: StatusChipTone[] = [
      'neutral',
      'info',
      'success',
      'warning',
      'danger',
      'brand',
    ]

    render(
      <>
        {tones.map((tone) => (
          <StatusChip data-testid={tone} key={tone} tone={tone}>
            {tone}
          </StatusChip>
        ))}
      </>,
    )

    tones.forEach((tone) => {
      expect(screen.getByTestId(tone)).toHaveClass('lsui-sc-status-chip')
      expect(screen.getByTestId(tone)).toHaveTextContent(tone)
    })
  })

  it('keeps indicator and leading icon decorative', () => {
    render(
      <StatusChip
        iconStart={<svg data-testid="icon" />}
        indicator
        size="sm"
        tone="success"
      >
        Confirmado
      </StatusChip>,
    )

    const chip = screen
      .getByText('Confirmado')
      .closest<HTMLSpanElement>('.lsui-sc-status-chip')

    expect(chip).not.toBeNull()
    expect(chip?.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2)
    expect(screen.getByTestId('icon').parentElement).toHaveAttribute(
      'aria-hidden',
      'true',
    )
    expect(screen.getByText('Confirmado')).toHaveAttribute(
      'title',
      'Confirmado',
    )
  })

  it('does not expose cosmetic color aliases', () => {
    const renderTypeOnlyExamples = false as boolean

    if (renderTypeOnlyExamples) {
      // @ts-expect-error cores locais devem ser mapeadas para significado no callsite
      ;<StatusChip tone="pink">Status</StatusChip>
      // @ts-expect-error color não é um segundo eixo visual
      ;<StatusChip color="red">Status</StatusChip>
    }

    expect(true).toBe(true)
  })
})
