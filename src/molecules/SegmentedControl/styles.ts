import { css, styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'
import { Pressable } from '../../primitives/Pressable'
import type { SegmentedControlShape, SegmentedControlSurface } from './types'

const groupSurfaces = {
  inverse: css`
    border: 1px solid rgba(255, 255, 255, 0.18);
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
  flex-wrap: wrap;
  gap: ${({ $surface }) => ($surface === 'inverse' ? tokens.spacing[2] : '0.1875rem')};
  border-radius: ${({ $shape }) =>
    $shape === 'pill' ? tokens.radius.pill : tokens.radius.control};
  padding: ${({ $surface }) => ($surface === 'inverse' ? tokens.spacing[1] : '0.1875rem')};

  ${({ $surface }) => groupSurfaces[$surface]}
`

export const Item = styled(Pressable)<{
  $active: boolean
  $shape: SegmentedControlShape
  $surface: SegmentedControlSurface
}>`
  min-width: ${({ $surface }) => ($surface === 'inverse' ? '3rem' : 'auto')};
  min-height: 2.25rem;
  flex: 1;
  border: 0;
  border-radius: ${({ $shape }) => ($shape === 'pill' ? tokens.radius.pill : tokens.radius.lg)};
  color: ${({ $active, $surface }) => {
    if ($surface === 'inverse')
      return $active ? tokens.color.neutral[950] : 'rgba(255, 255, 255, 0.72)'
    return $active ? tokens.color.content.default : tokens.color.content.muted
  }};
  background: ${({ $active, $surface }) => {
    if (!$active) return 'transparent'
    return $surface === 'inverse'
      ? tokens.color.neutral[0]
      : tokens.color.neutral[0]
  }};
  box-shadow: ${({ $active, $surface }) =>
    $active && $surface === 'light' ? tokens.shadow.subtle : 'none'};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${({ $active, $surface }) =>
    $surface === 'inverse' || $active
      ? tokens.typography.fontWeight.bold
      : tokens.typography.fontWeight.medium};
  padding-right: ${({ $surface }) => ($surface === 'inverse' ? '0.875rem' : tokens.spacing[4])};
  padding-left: ${({ $surface }) => ($surface === 'inverse' ? '0.875rem' : tokens.spacing[4])};
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
