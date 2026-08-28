import { css, keyframes, styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'
import { Pressable } from '../../primitives/Pressable'
import type {
  ActionMenuItemStyleProps,
  ActionMenuMenuStyleProps,
} from './types'

const enter = keyframes`
  from {
    opacity: 0;
    transform: translateY(var(--lsui-action-menu-enter-y));
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const toneStyles = {
  danger: css`
    color: ${tokens.color.feedback.dangerStrong};

    &:hover:not(:disabled),
    &:focus-visible {
      color: ${tokens.color.feedback.dangerStrong};
      background: ${tokens.color.feedback.dangerSoft};
    }
  `,
  neutral: css`
    color: ${tokens.color.content.default};

    &:hover:not(:disabled),
    &:focus-visible {
      background: ${tokens.color.neutral[100]};
    }
  `,
} satisfies Record<ActionMenuItemStyleProps['$tone'], ReturnType<typeof css>>

export const Root = styled.div.withConfig({
  componentId: 'lsui-sc-action-menu',
})`
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  max-width: 100%;
`

export const Menu = styled.div<ActionMenuMenuStyleProps>`
  --lsui-action-menu-enter-y: ${({ $placement }) =>
    $placement === 'top' ? tokens.spacing[1] : `-${tokens.spacing[1]}`};

  box-sizing: border-box;
  position: fixed;
  z-index: 1200;
  display: flex;
  width: max-content;
  min-width: 13rem;
  max-width: calc(100vw - ${tokens.spacing[4]});
  flex-direction: column;
  padding: calc(${tokens.spacing[1]} + ${tokens.spacing[1]} / 2);
  border: 1px solid ${tokens.color.surfaceBorder.subtle};
  border-radius: ${tokens.radius.rounded};
  background: ${tokens.color.neutral[0]};
  box-shadow: ${tokens.shadow.popover};
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  animation: ${enter} ${tokens.motion.duration.interactive}
    ${tokens.motion.easing.interactive};
  transform-origin: ${({ $align, $placement }) =>
    `${$align === 'start' ? 'left' : 'right'} ${$placement === 'top' ? 'bottom' : 'top'}`};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const MenuItem = styled(Pressable)<ActionMenuItemStyleProps>`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  min-width: 0;
  min-height: ${({ $size }) =>
    $size === 'sm' ? tokens.control.height.md : tokens.field.height.md};
  align-items: center;
  gap: ${tokens.spacing[2]};
  padding: ${tokens.spacing[2]} ${tokens.spacing[3]};
  border: 0;
  border-radius: ${tokens.radius.control};
  background: transparent;
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  line-height: ${tokens.typography.lineHeight.snug};
  text-align: left;
  overflow-wrap: anywhere;

  ${({ $tone }) => toneStyles[$tone]}

  &:focus-visible {
    outline: 3px solid ${tokens.color.focus};
    outline-offset: -3px;
  }

  &:disabled {
    opacity: 0.48;
  }

  &[data-loading='true'] {
    opacity: 1;
    cursor: wait;
  }
`

export const ItemLabel = styled.span`
  min-width: 0;
  flex: 1 1 auto;
`

export const Separator = styled.div`
  height: 1px;
  flex: 0 0 auto;
  margin: ${tokens.spacing[1]} ${tokens.spacing[2]};
  background: ${tokens.color.surfaceBorder.subtle};
`
