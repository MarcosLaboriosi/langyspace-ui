import { Spinner } from '../../primitives/Spinner'
import { StatePanel } from '../StatePanel'
import type { LoadingStateProps } from './types'

export function LoadingState(props: LoadingStateProps) {
  return (
    <StatePanel
      {...props}
      data-ui-loading-state="true"
      icon={<Spinner size="lg" />}
      state="loading"
    />
  )
}

export type { LoadingStateProps } from './types'
