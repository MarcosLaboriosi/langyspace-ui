import { styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'
import { Pressable } from '../../primitives/Pressable'

export const Container = styled.section.withConfig({
  componentId: 'lsui-sc-availability-calendar',
})`
  container-type: inline-size;
  min-width: 0;
  color: ${tokens.color.content.default};
  overflow-wrap: anywhere;

  > header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: ${tokens.spacing[2]};
    margin-bottom: ${tokens.spacing[3]};
  }

  > header > h2 {
    margin: 0;
    font-size: ${tokens.typography.fontSize.lg};
  }

  > header > div,
  > p {
    font-size: ${tokens.typography.fontSize.sm};
  }

  > p {
    margin: 0 0 ${tokens.spacing[4]};
    color: ${tokens.color.content.secondary};
  }
`
export const Days = styled.div<{ $dayCount: number }>`
  display: grid;
  min-width: 0;
  gap: ${tokens.spacing[3]};

  @container (min-width: 56rem) {
    grid-template-columns: repeat(
      ${({ $dayCount }) => $dayCount},
      minmax(0, 1fr)
    );
  }
`
export const Day = styled.section`
  min-width: 0;
  padding: ${tokens.spacing[3]};
  border: 1px solid ${tokens.color.surfaceBorder.subtle};
  border-radius: ${tokens.radius.card};
  background: ${tokens.color.surface.subtle};

  > h3 {
    margin: 0 0 ${tokens.spacing[3]};
    font-size: ${tokens.typography.fontSize.sm};
    line-height: ${tokens.typography.lineHeight.normal};
  }

  > h3 > span {
    display: block;
    color: ${tokens.color.content.muted};
    font-size: ${tokens.typography.fontSize.xs};
    font-weight: ${tokens.typography.fontWeight.medium};
  }
`
export const Slots = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 7rem), 1fr));
  gap: ${tokens.spacing[2]};

  @container (min-width: 56rem) {
    grid-template-columns: minmax(0, 1fr);
  }
`
export const Slot = styled(Pressable)<{ $selected: boolean }>`
  display: flex;
  min-width: 0;
  min-height: ${tokens.control.height.lg};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${tokens.spacing[1]};
  padding: ${tokens.spacing[2]};
  border: 1px solid
    ${({ $selected }) => ($selected ? tokens.color.brand.default : tokens.color.surfaceBorder.default)};
  border-radius: ${tokens.radius.control};
  background: ${({ $selected }) => ($selected ? tokens.color.status.brand.background : tokens.color.neutral[0])};
  color: ${({ $selected }) => ($selected ? tokens.color.status.brand.foreground : tokens.color.content.default)};
  font-size: ${tokens.typography.fontSize.sm};
  line-height: ${tokens.typography.lineHeight.normal};
  text-align: center;

  > small {
    font-size: ${tokens.typography.fontSize.xs};
  }

  &:hover:not(:disabled) {
    border-color: ${tokens.color.brand.default};
  }

  &:disabled {
    border-color: ${tokens.color.surfaceBorder.subtle};
    background: ${tokens.color.neutral[100]};
    color: ${tokens.color.content.muted};
  }
`
