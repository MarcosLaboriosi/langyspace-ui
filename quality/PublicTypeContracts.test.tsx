import { describe, expect, it } from 'vitest'
import type {
  AuthTokenDigitsProps,
  ChoiceOption,
  FilterPillsProps,
  SearchInputProps,
  SegmentedControlProps,
} from '../src'

describe('public type contracts', () => {
  it('uses one accessible-name source across named components', () => {
    const change = () => undefined
    const validSearch: SearchInputProps = { 'aria-label': 'Buscar' }
    const validToken: AuthTokenDigitsProps = {
      'aria-labelledby': 'token-title',
      digitLabel: 'Dígito',
      idPrefix: 'token',
      length: 4,
      onTokenChange: change,
    }

    // @ts-expect-error accessible-name sources are mutually exclusive
    const invalidSearch: SearchInputProps = {
      'aria-label': 'Buscar',
      'aria-labelledby': 'search-title',
    }
    // @ts-expect-error accessible-name sources are mutually exclusive
    const invalidToken: AuthTokenDigitsProps = {
      'aria-label': 'Código',
      'aria-labelledby': 'token-title',
      digitLabel: 'Dígito',
      idPrefix: 'token',
      length: 4,
      onTokenChange: change,
    }
    // @ts-expect-error accessible-name sources are mutually exclusive
    const invalidFilters: FilterPillsProps = {
      'aria-label': 'Filtros',
      'aria-labelledby': 'filters-title',
      onChange: change,
      options: [],
      value: 'all',
    }
    // @ts-expect-error accessible-name sources are mutually exclusive
    const invalidSegments: SegmentedControlProps = {
      'aria-label': 'Período',
      'aria-labelledby': 'period-title',
      onChange: change,
      options: [],
      value: 'month',
    }

    expect(validSearch['aria-label']).toBe('Buscar')
    expect(validToken['aria-labelledby']).toBe('token-title')
    expect(invalidSearch['aria-label']).toBe('Buscar')
    expect(invalidToken['aria-label']).toBe('Código')
    expect(invalidFilters['aria-label']).toBe('Filtros')
    expect(invalidSegments['aria-label']).toBe('Período')
  })

  it('requires accessible copy for a custom choice label', () => {
    const valid: ChoiceOption = {
      accessibleLabel: 'Ativos: 18',
      label: <span>Ativos · 18</span>,
      value: 'active',
    }

    // @ts-expect-error custom visual choice labels require accessibleLabel
    const invalid: ChoiceOption = {
      label: <span>18</span>,
      value: 'active',
    }

    expect(valid.accessibleLabel).toBe('Ativos: 18')
    expect(invalid.value).toBe('active')
  })
})
