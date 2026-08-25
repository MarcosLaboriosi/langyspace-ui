import * as Styled from './styles'
import type { StatePanelProps } from './types'

const accessibility = {
  empty: {},
  error: { role: 'alert' },
  loading: { 'aria-busy': true, 'aria-live': 'polite', role: 'status' },
  partial: { 'aria-live': 'polite', role: 'status' },
} as const

export function StatePanel({
  action,
  density = 'regular',
  description,
  fill = false,
  icon,
  state,
  surface = 'outlined',
  title,
  ...props
}: StatePanelProps) {
  return (
    <Styled.Container
      {...props}
      {...accessibility[state]}
      $density={density}
      $fill={fill}
      $surface={surface}
      data-state={state}
      data-ui-state-panel="true"
    >
      {icon ? <Styled.Icon aria-hidden="true">{icon}</Styled.Icon> : null}
      <Styled.Content>
        <Styled.Title>{title}</Styled.Title>
        {description ? (
          <Styled.Description $density={density}>
            {description}
          </Styled.Description>
        ) : null}
      </Styled.Content>
      {action ? (
        <Styled.Action $density={density}>{action}</Styled.Action>
      ) : null}
    </Styled.Container>
  )
}

export type {
  StatePanelDensity,
  StatePanelProps,
  StatePanelState,
  StatePanelSurface,
} from './types'
