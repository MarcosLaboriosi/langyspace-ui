import type { ActionMenuAlign, ActionMenuPlacement } from './types'

type RectLike = Pick<
  DOMRectReadOnly,
  'bottom' | 'height' | 'left' | 'right' | 'top' | 'width'
>

export interface ActionMenuPositionInput {
  align: ActionMenuAlign
  menu: RectLike
  trigger: RectLike
  viewportHeight: number
  viewportWidth: number
}

export interface ActionMenuPosition {
  left: number
  maxHeight: number
  placement: ActionMenuPlacement
  top: number
}

const viewportGap = 8
const triggerGap = 6

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum)

export function getActionMenuPosition({
  align,
  menu,
  trigger,
  viewportHeight,
  viewportWidth,
}: ActionMenuPositionInput): ActionMenuPosition {
  const availableWidth = Math.max(0, viewportWidth - viewportGap * 2)
  const menuWidth = Math.min(menu.width, availableWidth)
  const preferredLeft =
    align === 'start' ? trigger.left : trigger.right - menuWidth
  const maximumLeft = Math.max(
    viewportGap,
    viewportWidth - menuWidth - viewportGap,
  )
  const left = clamp(preferredLeft, viewportGap, maximumLeft)
  const availableBelow = Math.max(
    0,
    viewportHeight - trigger.bottom - triggerGap - viewportGap,
  )
  const availableAbove = Math.max(0, trigger.top - triggerGap - viewportGap)
  const placement: ActionMenuPlacement =
    menu.height > availableBelow && availableAbove > availableBelow
      ? 'top'
      : 'bottom'
  const maxHeight = placement === 'top' ? availableAbove : availableBelow
  const renderedHeight = Math.min(menu.height, maxHeight)
  const top =
    placement === 'top'
      ? Math.max(viewportGap, trigger.top - triggerGap - renderedHeight)
      : Math.min(trigger.bottom + triggerGap, viewportHeight - viewportGap)

  return { left, maxHeight, placement, top }
}
