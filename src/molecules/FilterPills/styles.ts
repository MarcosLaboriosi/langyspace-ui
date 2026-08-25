import { css, styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'
import { Pressable } from '../../primitives/Pressable'
import type { FilterPillsOverflow, FilterPillsSize } from './types'

const sizeStyles = {
  md: css`
    min-height: ${tokens.control.height.md};
    gap: ${tokens.spacing[2]};
    padding-right: ${tokens.spacing[4]};
    padding-left: ${tokens.spacing[4]};
    font-size: ${tokens.typography.fontSize.sm};
    font-weight: ${tokens.typography.fontWeight.bold};
  `,
  sm: css`
    min-height: ${tokens.control.height.sm};
    padding-right: ${tokens.spacing[3]};
    padding-left: ${tokens.spacing[3]};
    font-size: ${tokens.typography.fontSize.xs};
    font-weight: ${tokens.typography.fontWeight.medium};
  `,
} satisfies Record<FilterPillsSize, ReturnType<typeof css>>

export const Group = styled.div.withConfig({
  componentId: 'lsui-sc-filter-pills',
})<{ $overflow: FilterPillsOverflow }>`
  display: flex;
  width: 100%;
  min-width: 0;
  flex-wrap: ${({ $overflow }) => ($overflow === 'wrap' ? 'wrap' : 'nowrap')};
  gap: ${tokens.spacing[2]};
  overflow-x: ${({ $overflow }) => ($overflow === 'scroll' ? 'auto' : 'visible')};
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Item = styled(Pressable)<{
  $active: boolean
  $size: FilterPillsSize
}>`
  flex: 0 0 auto;
  border: 1px solid
    ${({ $active }) =>
      $active
        ? tokens.color.content.default
        : tokens.color.surfaceBorder.default};
  border-radius: ${tokens.radius.pill};
  color: ${({ $active }) =>
    $active ? tokens.color.neutral[0] : tokens.color.content.secondary};
  background: ${({ $active }) =>
    $active ? tokens.color.content.default : tokens.color.neutral[0]};
  white-space: nowrap;
  transition:
    color ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive},
    background-color ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive},
    border-color ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive};

  ${({ $size }) => sizeStyles[$size]}

  &:hover:not(:disabled) {
    border-color: ${tokens.color.surfaceBorder.strong};
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${tokens.shadow.focus};
  }

  &:disabled {
    opacity: 0.55;
    cursor: default;
  }
`

export const Count = styled.span`
  min-width: 1.375rem;
  border-radius: ${tokens.radius.pill};
  background: ${tokens.color.inverse.surfaceSubtle};
  color: inherit;
  font-size: ${tokens.typography.fontSize['2xs']};
  line-height: 1;
  padding: ${tokens.spacing[1]} 0.4375rem;
  text-align: center;
`
