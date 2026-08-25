export type AccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby': string }

export type CompatibleAccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: string }
  | { 'aria-label'?: string; 'aria-labelledby': string }

export function mergeIdRefs(
  ...values: Array<string | null | undefined>
): string | undefined {
  const ids = values.flatMap((value) => value?.trim().split(/\s+/) ?? [])
  const merged = [...new Set(ids.filter(Boolean))].join(' ')

  return merged || undefined
}
