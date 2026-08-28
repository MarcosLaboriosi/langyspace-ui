import { resolve } from 'node:path'
import { defineAuditConfig } from '../audit/index.mjs'

export default defineAuditConfig({
  root: resolve(import.meta.dirname, '..'),
  sourceRoots: ['src'],
  nativeButtonOwners: [
    {
      owner: 'UI foundations',
      path: 'src/primitives/Pressable/styles.ts',
      reason: 'Pressable owns the native styled button',
      expiresAt: '2027-08-25',
    },
  ],
  spinnerOwners: [
    {
      owner: 'UI foundations',
      path: 'src/primitives/Spinner/styles.ts',
      reason: 'Spinner owns wait rotation',
      expiresAt: '2027-08-25',
    },
  ],
  allowedDomainMotion: [
    {
      owner: 'Operational lists',
      path: 'src/molecules/ActionMenu/styles.ts',
      reason: 'non-modal popover entrance with reduced-motion override',
      expiresAt: '2027-08-28',
    },
    {
      owner: 'Identity',
      path: 'src/molecules/AuthTokenDigits/styles.ts',
      reason: 'invalid token feedback',
      expiresAt: '2027-08-25',
    },
  ],
  canonicalComponents: ['ActionLink', 'Button', 'IconButton'],
  auditPrivateStyles: true,
  requireExceptionExpiry: true,
  layerDependencies: {
    atoms: ['atoms', 'foundations', 'internal', 'primitives'],
    foundations: ['foundations'],
    internal: ['foundations', 'internal', 'primitives'],
    molecules: ['atoms', 'foundations', 'internal', 'molecules', 'primitives'],
    primitives: ['foundations', 'primitives'],
  },
  additionalRules: [
    {
      id: 'LSUI012',
      message:
        'free cosmetic prop; expose a semantic variant or keep the recipe private',
      pattern:
        /^\s+(?:color|height|padding|radius|spacing)\??\s*:\s*(?:number|string)\b/m,
      remediation:
        'replace it with a closed semantic variant or keep the component local',
    },
  ],
})
