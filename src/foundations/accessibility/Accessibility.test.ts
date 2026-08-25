import { describe, expect, it } from 'vitest'
import { mergeIdRefs, type AccessibleName } from '.'

describe('accessibility foundations', () => {
  it('combines, normalizes and deduplicates IDREF lists', () => {
    expect(
      mergeIdRefs('consumer-help shared', undefined, 'shared field-error'),
    ).toBe('consumer-help shared field-error')
    expect(mergeIdRefs('', null, '   ')).toBeUndefined()
  })

  it('models exactly one accessible-name source', () => {
    const direct: AccessibleName = { 'aria-label': 'Fechar' }
    const referenced: AccessibleName = { 'aria-labelledby': 'dialog-title' }

    expect(direct['aria-label']).toBe('Fechar')
    expect(referenced['aria-labelledby']).toBe('dialog-title')

    // @ts-expect-error exactly one accessible-name source is required
    const missing: AccessibleName = {}
    // @ts-expect-error aria-label and aria-labelledby are mutually exclusive
    const duplicated: AccessibleName = {
      'aria-label': 'Fechar',
      'aria-labelledby': 'dialog-title',
    }

    expect(missing).toEqual({})
    expect(duplicated['aria-label']).toBe('Fechar')
  })
})
