import { StatePanel } from '../StatePanel'
import type { EmptyStateProps } from './types'

export function EmptyState(props: EmptyStateProps) {
  return <StatePanel {...props} state="empty" />
}

export type { EmptyStateProps } from './types'
