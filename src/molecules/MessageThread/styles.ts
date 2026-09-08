import { styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'

export const Panel = styled.section.withConfig({
  componentId: 'lsui-sc-message-thread',
})`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  flex: 1 1 auto;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid ${tokens.color.surfaceBorder.subtle};
  border-radius: ${tokens.radius.card};
  background: ${tokens.color.neutral[0]};
`

export const Header = styled.div`
  min-width: 0;
  flex: 0 0 auto;
  padding: ${tokens.spacing[3]} ${tokens.spacing[4]};
  border-bottom: 1px solid ${tokens.color.surfaceBorder.subtle};
`

export const Viewport = styled.div`
  min-width: 0;
  min-height: 0;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${tokens.spacing[5]};
  overscroll-behavior-y: contain;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
`

export const Footer = styled.footer`
  min-width: 0;
  flex: 0 0 auto;
  padding: ${tokens.spacing[4]} ${tokens.spacing[5]};
  border-top: 1px solid ${tokens.color.surfaceBorder.subtle};
  background: ${tokens.color.surface.subtle};
`
