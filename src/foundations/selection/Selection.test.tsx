import { describe, expect, it } from 'vitest'
import type { AccessibleChoiceOption, ChoiceOption } from '.'

describe('selection foundations', () => {
  it('requires an accessible label for custom visual labels', () => {
    const textOption: AccessibleChoiceOption<'active'> = {
      label: 'Ativos',
      value: 'active',
    }
    const customOption: AccessibleChoiceOption<'active'> = {
      accessibleLabel: 'Ativos: 18',
      label: <span>Ativos · 18</span>,
      value: 'active',
    }

    expect(textOption.label).toBe('Ativos')
    expect(customOption.accessibleLabel).toBe('Ativos: 18')

    // @ts-expect-error a non-text label must provide its accessible label
    const inaccessible: AccessibleChoiceOption = {
      label: <span>18</span>,
      value: '18',
    }
    expect(inaccessible.value).toBe('18')

    const compatibilityOption: ChoiceOption = {
      label: <span>Legado</span>,
      value: 'legacy',
    }
    expect(compatibilityOption.value).toBe('legacy')
  })
})
