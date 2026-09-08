export const auditConfig = {
  boundaryWidths: [768, 1280, 1440, 1536, 1551, 1552],
  globalWidths: [390, 1281, 2048],
  height: 1100,
  messageThreadWidths: [390, 900, 901, 1281, 2048],
  motions: ['normal', 'reduced'],
  screenshotWidths: new Set([390, 1281, 2048]),
  timeoutMs: Number(process.env.LAYOUT_AUDIT_TIMEOUT_MS ?? 300_000),
  tolerance: 2,
}

export function widthsForStory(tags) {
  const widths = tags.includes('messaging-boundary')
    ? auditConfig.messageThreadWidths
    : tags.includes('layout-boundary')
      ? [...auditConfig.globalWidths, ...auditConfig.boundaryWidths]
      : auditConfig.globalWidths

  return [...new Set(widths)].sort((left, right) => left - right)
}

export function heightsForStory(tags) {
  return tags.includes('short-viewport')
    ? [568, auditConfig.height]
    : [auditConfig.height]
}
