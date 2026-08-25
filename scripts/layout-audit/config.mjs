export const auditConfig = {
  boundaryWidths: [768, 1280, 1440, 1536, 1551, 1552],
  globalWidths: [390, 1281, 2048],
  height: 1100,
  motions: ['normal', 'reduced'],
  screenshotWidths: new Set([390, 1281, 2048]),
  timeoutMs: Number(process.env.LAYOUT_AUDIT_TIMEOUT_MS ?? 300_000),
  tolerance: 2,
}

export function widthsForStory(tags) {
  const widths = tags.includes('layout-boundary')
    ? [...auditConfig.globalWidths, ...auditConfig.boundaryWidths]
    : auditConfig.globalWidths

  return [...new Set(widths)].sort((left, right) => left - right)
}
