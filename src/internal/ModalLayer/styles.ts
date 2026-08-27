import { css, styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'
import type { OverlayKind, OverlaySize } from './types'

const dialogWidths = {
  lg: '42.5rem',
  md: '31rem',
  sm: '24rem',
} satisfies Record<OverlaySize, string>

const drawerWidths = {
  lg: '44rem',
  md: '36rem',
  sm: '24rem',
} satisfies Record<OverlaySize, string>

export const Backdrop = styled.div.withConfig({
  componentId: 'lsui-sc-modal-backdrop',
})<{ $kind: OverlayKind }>`
  position: fixed;
  z-index: 800;
  inset: 0;
  display: grid;
  align-items: ${({ $kind }) => ($kind === 'dialog' ? 'center' : 'stretch')};
  justify-items: ${({ $kind }) => ($kind === 'dialog' ? 'center' : 'end')};
  padding: ${({ $kind }) => ($kind === 'dialog' ? tokens.spacing[5] : '0')};
  background: ${tokens.color.overlay.default};
  backdrop-filter: blur(2px);

  @media (max-width: 640px) {
    align-items: end;
    justify-items: stretch;
    padding: 0;
  }
`

export const Panel = styled.div.withConfig({
  componentId: 'lsui-sc-modal-panel',
})<{ $kind: OverlayKind; $size: OverlaySize }>`
  position: relative;
  display: grid;
  width: min(
    ${({ $kind, $size }) => ($kind === 'dialog' ? dialogWidths[$size] : drawerWidths[$size])},
    100%
  );
  min-width: 0;
  max-height: ${({ $kind }) => ($kind === 'dialog' ? 'calc(100dvh - 2.5rem)' : '100dvh')};
  grid-template-rows: auto minmax(0, 1fr) auto;
  border: 1px solid ${tokens.color.surfaceBorder.default};
  background: ${tokens.color.neutral[0]};
  box-shadow: ${({ $kind }) => ($kind === 'dialog' ? tokens.shadow.popover : tokens.shadow.drawer)};
  outline: none;

  ${({ $kind }) =>
    $kind === 'dialog'
      ? css`
          border-radius: ${tokens.radius.card};
        `
      : css`
          height: 100dvh;
          border-radius: ${tokens.radius.card} 0 0 ${tokens.radius.card};
        `}

  &:focus-visible {
    box-shadow: ${tokens.shadow.focus};
  }

  @media (max-width: 640px) {
    width: 100%;

    ${({ $kind }) =>
      $kind === 'drawer'
        ? css`
            height: 100dvh;
            max-height: 100dvh;
            border-right: 0;
            border-left: 0;
            border-radius: 0;
          `
        : css`
            max-height: calc(100dvh - ${tokens.spacing[4]});
            border-radius: ${tokens.radius.card} ${tokens.radius.card} 0 0;
          `}
  }
`

export const Header = styled.header`
  display: flex;
  min-width: 0;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${tokens.spacing[4]};
  border-bottom: 1px solid ${tokens.color.surfaceBorder.subtle};
  padding: ${tokens.spacing[5]};

  @media (max-width: 640px) {
    padding-top: calc(${tokens.spacing[5]} + env(safe-area-inset-top));
  }
`

export const Heading = styled.div`
  min-width: 0;
`

export const Title = styled.h2`
  margin: 0;
  color: ${tokens.color.content.default};
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.bold};
  line-height: ${tokens.typography.lineHeight.snug};
  overflow-wrap: anywhere;
`

export const Description = styled.p`
  margin: ${tokens.spacing[1]} 0 0;
  color: ${tokens.color.content.muted};
  font-size: ${tokens.typography.fontSize.sm};
  line-height: ${tokens.typography.lineHeight.normal};
  overflow-wrap: anywhere;
`

export const Body = styled.div`
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
  padding: ${tokens.spacing[5]};
  overscroll-behavior: contain;
`

export const Footer = styled.footer`
  display: flex;
  min-width: 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: ${tokens.spacing[2]};
  border-top: 1px solid ${tokens.color.surfaceBorder.subtle};
  padding: ${tokens.spacing[4]} ${tokens.spacing[5]};

  @media (max-width: 640px) {
    align-items: stretch;
    flex-direction: column;
    padding-bottom: calc(${tokens.spacing[4]} + env(safe-area-inset-bottom));

    > * {
      width: 100%;
    }
  }
`
