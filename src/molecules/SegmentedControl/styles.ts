import { css, styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'
import { Pressable } from '../../primitives/Pressable'
import type { SegmentedControlShape, SegmentedControlSurface } from './types'

const compactTrackInset = '0.1875rem'
const inverseItemMinWidth = '3rem'
const inverseItemInlinePadding = '0.875rem'
const itemMinHeight = '2.25rem'

const groupSurfaces = {
  inverse: css`
    border: 1px solid ${tokens.color.inverse.borderSubtle};
    background: transparent;
  `,
  light: css`
    border: 0;
    background: ${tokens.color.surface.muted};
  `,
} satisfies Record<SegmentedControlSurface, ReturnType<typeof css>>

export const Group = styled.div.withConfig({
  componentId: 'lsui-sc-segmented-control',
})<{ $shape: SegmentedControlShape; $surface: SegmentedControlSurface }>`
  display: inline-flex;
  width: fit-content;
  max-width: 100%;
  flex-wrap: nowrap;
  gap: ${({ $surface }) => ($surface === 'inverse' ? tokens.spacing[2] : compactTrackInset)};
  border-radius: ${({ $shape }) =>
    $shape === 'pill' ? tokens.radius.pill : tokens.radius.control};
  padding: ${({ $surface }) => ($surface === 'inverse' ? tokens.spacing[1] : compactTrackInset)};
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ $surface }) => groupSurfaces[$surface]}
`

export const Item = styled(Pressable)<{
  $active: boolean
  $shape: SegmentedControlShape
  $surface: SegmentedControlSurface
}>`
  min-width: ${({ $surface }) => ($surface === 'inverse' ? inverseItemMinWidth : 'auto')};
  min-height: ${itemMinHeight};
  flex: 1 0 auto;
  border: 0;
  border-radius: ${({ $shape }) => ($shape === 'pill' ? tokens.radius.pill : tokens.radius.lg)};
  color: ${({ $active, $surface }) => {
    if ($surface === 'inverse')
      return $active
        ? tokens.color.neutral[950]
        : tokens.color.inverse.contentMuted
    return $active ? tokens.color.content.default : tokens.color.content.muted
  }};
  background: ${({ $active }) => {
    if (!$active) return 'transparent'
    return tokens.color.neutral[0]
  }};
  box-shadow: ${({ $active, $surface }) =>
    $active && $surface === 'light' ? tokens.shadow.subtle : 'none'};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${({ $active, $surface }) =>
    $surface === 'inverse' || $active
      ? tokens.typography.fontWeight.bold
      : tokens.typography.fontWeight.medium};
  padding-right: ${({ $surface }) => ($surface === 'inverse' ? inverseItemInlinePadding : tokens.spacing[4])};
  padding-left: ${({ $surface }) => ($surface === 'inverse' ? inverseItemInlinePadding : tokens.spacing[4])};
  white-space: nowrap;
  transition:
    color ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive},
    background-color ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive};

  &:focus-visible {
    outline: none;
    box-shadow: ${tokens.shadow.focus};
  }

  &:disabled {
    opacity: 0.55;
    cursor: default;
  }
`
