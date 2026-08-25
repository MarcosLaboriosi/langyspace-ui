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
    },
  ],
  spinnerOwners: [
    {
      owner: 'UI foundations',
      path: 'src/primitives/Spinner/styles.ts',
      reason: 'Spinner owns wait rotation',
    },
  ],
  allowedDomainMotion: [
    {
      owner: 'Identity',
      path: 'src/molecules/AuthTokenDigits/styles.ts',
      reason: 'invalid token feedback',
    },
  ],
  canonicalComponents: ['ActionLink', 'Button', 'IconButton'],
  auditPrivateStyles: true,
  layerDependencies: {
    atoms: ['atoms', 'foundations', 'internal', 'primitives'],
    foundations: ['foundations'],
    internal: ['foundations', 'internal', 'primitives'],
    molecules: ['atoms', 'foundations', 'internal', 'molecules', 'primitives'],
    primitives: ['foundations', 'primitives'],
  },
  additionalRules: [
    {
      message:
        'free cosmetic prop; expose a semantic variant or keep the recipe private',
      pattern:
        /^\s+(?:color|height|padding|radius|spacing)\??\s*:\s*(?:number|string)\b/m,
    },
  ],
})
