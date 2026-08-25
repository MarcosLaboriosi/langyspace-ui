export type AuditExpiry = `${number}-${number}-${number}`

export interface AuditException {
  expiresAt?: AuditExpiry
  owner: string
  path: string
  reason: string
}

export interface DescendantActionException extends AuditException {
  selector: string
}

export interface AdditionalAuditRule {
  id?: string
  message: string
  pattern: RegExp
  remediation?: string
}

export interface AuditConfig {
  additionalRules?: AdditionalAuditRule[]
  allowedDescendantActionOverrides?: DescendantActionException[]
  allowedDirectButtonImports?: AuditException[]
  allowedDomainMotion?: AuditException[]
  auditDescendantActions?: boolean
  auditPrivateStyles?: boolean
  canonicalComponents?: string[]
  layerDependencies?: Record<string, string[]>
  nativeButtonOwners?: AuditException[]
  requireExceptionExpiry?: boolean
  root: string
  sourceRoots?: string[]
  spinnerOwners?: AuditException[]
  today?: AuditExpiry
}

export interface AuditDiagnostic {
  line: number
  message: string
  path: string
  remediation: string
  ruleId: string
}

export interface AuditResult {
  diagnostics: AuditDiagnostic[]
  failures: string[]
  files: string[]
  warnings: string[]
}

export declare function defineAuditConfig<const Config extends AuditConfig>(
  config: Config,
): Config

export declare function auditArchitecture(
  config: AuditConfig,
): Promise<AuditResult>
