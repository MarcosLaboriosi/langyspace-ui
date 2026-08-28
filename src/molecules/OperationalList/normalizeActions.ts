import type { ActionMenuItem } from '../ActionMenu/types'
import type { OperationalListItemAction } from './types'

type PrimaryAction = Extract<
  OperationalListItemAction,
  { placement: 'primary' }
>
type QuickAction = Extract<OperationalListItemAction, { placement: 'quick' }>
type OverflowAction = Exclude<
  OperationalListItemAction,
  PrimaryAction | QuickAction
>

export interface NormalizedOperationalListActions {
  overflow: readonly ActionMenuItem[]
  primary?: PrimaryAction
  quick: readonly QuickAction[]
}

const toNeutralOverflow = (
  action: PrimaryAction | QuickAction,
): ActionMenuItem => ({
  disabled: action.disabled,
  icon: action.icon,
  id: action.id,
  isLoading: action.isLoading,
  label: action.label,
  onSelect: action.onSelect,
  tone: 'neutral',
})

export function normalizeOperationalListActions(
  actions: readonly OperationalListItemAction[],
): NormalizedOperationalListActions {
  const primaryActions = actions.filter(
    (action): action is PrimaryAction => action.placement === 'primary',
  )
  const quickActions = actions.filter(
    (action): action is QuickAction => action.placement === 'quick',
  )
  const explicitOverflow = actions.filter(
    (action): action is OverflowAction =>
      action.placement === 'overflow' || action.placement === undefined,
  )
  const overflow: ActionMenuItem[] = [
    ...explicitOverflow.map((action) => ({
      disabled: action.disabled,
      icon: action.icon,
      id: action.id,
      isLoading: action.isLoading,
      label: action.label,
      onSelect: action.onSelect,
      tone: action.tone ?? 'neutral',
    })),
    ...primaryActions.slice(1).map(toNeutralOverflow),
    ...quickActions.slice(2).map(toNeutralOverflow),
  ]

  return {
    overflow: [
      ...overflow.filter((action) => action.tone !== 'danger'),
      ...overflow.filter((action) => action.tone === 'danger'),
    ],
    primary: primaryActions[0],
    quick: quickActions.slice(0, 2),
  }
}
