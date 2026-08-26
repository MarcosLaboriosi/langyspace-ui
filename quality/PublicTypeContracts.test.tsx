import { describe, expect, it } from 'vitest'
import type {
  AuthTokenDigitsProps,
  AuthTokenLength,
  ChoiceOption,
  DialogDismissal,
  DrawerSize,
  SearchInputClearAction,
  SearchInputProps,
} from '../src'
import type { AccessibleName } from '../src/foundations/accessibility'
import type { AccessibleChoiceOption } from '../src/foundations/selection'

describe('public type contracts', () => {
  it('publishes strict additive contracts for new compositions', () => {
    const directName: AccessibleName = { 'aria-label': 'Buscar' }
    const referencedName: AccessibleName = {
      'aria-labelledby': 'search-title',
    }
    const tokenLength: AuthTokenLength = 6
    const dialogDismissal: DialogDismissal = 'escape-and-backdrop'
    const drawerSize: DrawerSize = 'lg'
    const clearAction: SearchInputClearAction = {
      clearLabel: 'Limpar busca',
      onClear: () => undefined,
    }
    const customChoice: AccessibleChoiceOption = {
      accessibleLabel: 'Ativos: 18',
      label: <span>Ativos · 18</span>,
      value: 'active',
    }

    // @ts-expect-error accessible-name sources are mutually exclusive
    const duplicatedName: AccessibleName = {
      'aria-label': 'Buscar',
      'aria-labelledby': 'search-title',
    }
    // @ts-expect-error only verified token lengths belong to the strict contract
    const unsupportedLength: AuthTokenLength = 5
    // @ts-expect-error onClear requires explicit product copy in the strict contract
    const missingClearCopy: SearchInputClearAction = {
      onClear: () => undefined,
    }
    // @ts-expect-error custom visual labels require accessible copy in the strict contract
    const inaccessibleChoice: AccessibleChoiceOption = {
      label: <span>18</span>,
      value: 'active',
    }

    expect(directName['aria-label']).toBe('Buscar')
    expect(referencedName['aria-labelledby']).toBe('search-title')
    expect(tokenLength).toBe(6)
    expect(dialogDismissal).toBe('escape-and-backdrop')
    expect(drawerSize).toBe('lg')
    expect(clearAction.clearLabel).toBe('Limpar busca')
    expect(customChoice.accessibleLabel).toBe('Ativos: 18')
    expect(duplicatedName['aria-label']).toBe('Buscar')
    expect(unsupportedLength).toBe(5)
    expect(missingClearCopy.onClear).toBeTypeOf('function')
    expect(inaccessibleChoice.value).toBe('active')
  })

  it('keeps v1 props source-compatible until a versioned major migration', () => {
    const legacySearch: SearchInputProps = {
      'aria-label': 'Buscar',
      'aria-labelledby': 'search-title',
      onClear: () => undefined,
    }
    const legacyToken: AuthTokenDigitsProps = {
      'aria-label': 'Código',
      digitLabel: 'Dígito',
      idPrefix: 'token',
      length: 5,
      onTokenChange: () => undefined,
    }
    const legacyChoice: ChoiceOption = {
      label: <span>18</span>,
      value: 'active',
    }

    expect(legacySearch.onClear).toBeTypeOf('function')
    expect(legacyToken.length).toBe(5)
    expect(legacyChoice.value).toBe('active')
  })
})
