#!/usr/bin/env node

import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { auditArchitecture } from './index.mjs'

const configPath = process.argv[2]

if (!configPath) {
  console.error('Usage: langyspace-ui-audit <config-file>')
  process.exitCode = 1
} else {
  const configModule = await import(
    pathToFileURL(resolve(process.cwd(), configPath)).href
  )
  const result = await auditArchitecture(configModule.default)

  result.warnings.forEach((warning) =>
    console.warn(`Langyspace UI architecture audit warning: ${warning}`),
  )

  if (result.failures.length > 0) {
    console.error('Langyspace UI architecture audit failed:')
    result.failures.forEach((failure) => console.error(`- ${failure}`))
    process.exitCode = 1
  } else {
    console.log(
      `Langyspace UI architecture audit passed: ${result.files.length} production source files.`,
    )
  }
}
