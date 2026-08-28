import { css, styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'
import { Pressable } from '../../primitives/Pressable'
import type {
  OperationalListCellStyleProps,
  OperationalListHeadStyleProps,
  OperationalListHeaderStyleProps,
} from './types'

const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  border: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`

const densityPadding = css`
  padding: var(--lsui-operational-list-cell-y)
    var(--lsui-operational-list-cell-x);
`

const interactiveTitle = css`
  min-width: 0;
  color: ${tokens.color.content.default};
  font: inherit;
  font-weight: ${tokens.typography.fontWeight.semibold};
  line-height: ${tokens.typography.lineHeight.snug};
  text-align: left;
  text-decoration: none;
  overflow-wrap: anywhere;

  &:hover {
    color: ${tokens.color.brand.default};
    text-decoration: underline;
    text-underline-offset: 0.18em;
  }

  &:focus-visible {
    border-radius: ${tokens.radius.control};
    outline: 3px solid ${tokens.color.focus};
    outline-offset: 2px;
  }
`

export const Root = styled.div.withConfig({
  componentId: 'lsui-sc-operational-list',
})`
  --lsui-operational-list-cell-x: ${tokens.spacing[4]};
  --lsui-operational-list-cell-y: ${tokens.spacing[4]};
  --lsui-operational-list-action-gap: ${tokens.spacing[2]};

  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  color: ${tokens.color.content.default};
  container-type: inline-size;

  &[data-density='compact'] {
    --lsui-operational-list-cell-x: ${tokens.spacing[3]};
    --lsui-operational-list-cell-y: ${tokens.spacing[3]};
    --lsui-operational-list-action-gap: calc(
      ${tokens.spacing[1]} + ${tokens.spacing[1]} / 2
    );
  }
`

export const Surface = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  border: 1px solid ${tokens.color.surfaceBorder.subtle};
  border-radius: ${tokens.radius.card};
  background: ${tokens.color.neutral[0]};
  overflow: hidden;

  @container (max-width: 71.99rem) {
    border: 0;
    border-radius: 0;
    background: transparent;
    overflow: visible;
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: auto;
  color: inherit;
  font-size: ${tokens.typography.fontSize.sm};

  @container (max-width: 71.99rem) {
    display: block;

    > tbody {
      display: grid;
      min-width: 0;
      gap: ${tokens.spacing[3]};
    }
  }
`

export const TableHead = styled.thead<OperationalListHeadStyleProps>`
  background: ${tokens.color.surface.muted};

  @container (max-width: 71.99rem) {
    ${({ $hasSorting }) => !$hasSorting && visuallyHidden}

    display: block;
    margin-bottom: ${tokens.spacing[3]};
    border: 1px solid ${tokens.color.surfaceBorder.subtle};
    border-radius: ${tokens.radius.rounded};
    background: ${tokens.color.neutral[0]};
  }
`

export const HeaderRow = styled.tr`
  border-bottom: 1px solid ${tokens.color.surfaceBorder.subtle};

  @container (max-width: 71.99rem) {
    display: flex;
    min-width: 0;
    flex-wrap: wrap;
    gap: ${tokens.spacing[1]};
    padding: ${tokens.spacing[2]};
    border: 0;
  }
`

export const ColumnHeader = styled.th<OperationalListHeaderStyleProps>`
  ${densityPadding}
  color: ${tokens.color.content.muted};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.semibold};
  line-height: ${tokens.typography.lineHeight.snug};
  text-align: ${({ $align }) => ($align === 'end' ? 'right' : 'left')};
  white-space: nowrap;

  @container (max-width: 71.99rem) {
    ${({ $sortable }) => !$sortable && visuallyHidden}
    padding: 0;
  }
`

export const ActionsHeader = styled.th`
  ${densityPadding}
  width: 1%;
  color: ${tokens.color.content.muted};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.semibold};
  line-height: ${tokens.typography.lineHeight.snug};
  text-align: right;
  white-space: nowrap;

  @container (max-width: 71.99rem) {
    ${visuallyHidden}
  }
`

export const SortButton = styled(Pressable)`
  display: inline-flex;
  min-width: 0;
  min-height: 2rem;
  align-items: center;
  justify-content: inherit;
  gap: ${tokens.spacing[1]};
  padding: ${tokens.spacing[1]} ${tokens.spacing[2]};
  border: 0;
  border-radius: ${tokens.radius.control};
  background: transparent;
  color: inherit;
  font: inherit;
  font-weight: inherit;

  &:hover {
    color: ${tokens.color.content.default};
    background: ${tokens.color.neutral[100]};
  }
`

export const SortGlyph = styled.span`
  display: inline-flex;
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  font-size: ${tokens.typography.fontSize.xs};
  line-height: 1;
`

export const Row = styled.tr`
  border-bottom: 1px solid ${tokens.color.surfaceBorder.subtle};

  &:last-child {
    border-bottom: 0;
  }

  &:hover,
  &:focus-within {
    background: ${tokens.color.surface.subtle};
  }

  @container (max-width: 71.99rem) {
    box-sizing: border-box;
    display: grid;
    min-width: 0;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border: 1px solid ${tokens.color.surfaceBorder.subtle};
    border-radius: ${tokens.radius.card};
    background: ${tokens.color.neutral[0]};
    box-shadow: ${tokens.shadow.subtle};
    overflow: visible;
  }

  @container (max-width: 47.99rem) {
    grid-template-columns: minmax(0, 1fr);
  }
`

export const EmptyRow = styled.tr`
  @container (max-width: 71.99rem) {
    display: block;
    min-width: 0;
  }
`

export const PrimaryCell = styled.th`
  ${densityPadding}
  min-width: 13rem;
  vertical-align: middle;
  text-align: left;

  @container (max-width: 71.99rem) {
    box-sizing: border-box;
    display: block;
    min-width: 0;
    grid-column: 1 / -1;
    border-bottom: 1px solid ${tokens.color.surfaceBorder.subtle};
  }
`

export const PrimaryLayout = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: ${tokens.spacing[3]};
`

export const Leading = styled.span`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
`

export const PrimaryBody = styled.span`
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${tokens.spacing[1]};
`

export const PrimaryTitle = styled.span`
  min-width: 0;
  color: ${tokens.color.content.default};
  font-weight: ${tokens.typography.fontWeight.semibold};
  line-height: ${tokens.typography.lineHeight.snug};
  overflow-wrap: anywhere;
`

export const PrimaryLink = styled.a`
  ${interactiveTitle}
`

export const PrimaryButton = styled(Pressable)`
  ${interactiveTitle}
  padding: 0;
  border: 0;
  background: transparent;
`

export const PrimaryDescription = styled.span`
  min-width: 0;
  color: ${tokens.color.content.secondary};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.medium};
  line-height: ${tokens.typography.lineHeight.normal};
  overflow-wrap: anywhere;
`

export const PrimaryMeta = styled.span`
  min-width: 0;
  color: ${tokens.color.content.muted};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.medium};
  line-height: ${tokens.typography.lineHeight.normal};
  overflow-wrap: anywhere;
`

export const NavigationHint = styled.span`
  display: none;
  flex: 0 0 auto;
  color: ${tokens.color.content.muted};
  font-size: ${tokens.typography.fontSize.lg};
  line-height: 1;

  @container (max-width: 71.99rem) {
    display: inline-flex;
  }
`

export const DataCell = styled.td<OperationalListCellStyleProps>`
  ${densityPadding}
  min-width: 0;
  color: ${tokens.color.content.secondary};
  line-height: ${tokens.typography.lineHeight.normal};
  text-align: ${({ $align }) => ($align === 'end' ? 'right' : 'left')};
  vertical-align: middle;
  overflow-wrap: anywhere;

  @container (max-width: 71.99rem) {
    box-sizing: border-box;
    display: block;
    min-width: 0;
    text-align: left;

    ${({ $importance }) =>
      $importance === 'secondary' &&
      css`
        grid-column: span 2;
      `}
  }

  @container (max-width: 47.99rem) {
    grid-column: 1;
  }
`

export const CompactLabel = styled.span`
  display: none;
  margin-bottom: ${tokens.spacing[1]};
  color: ${tokens.color.content.muted};
  font-size: ${tokens.typography.fontSize['2xs']};
  font-weight: ${tokens.typography.fontWeight.bold};
  line-height: ${tokens.typography.lineHeight.snug};
  letter-spacing: 0.04em;
  text-transform: uppercase;

  @container (max-width: 71.99rem) {
    display: block;
  }
`

export const CellValue = styled.div`
  min-width: 0;
`

export const ActionsCell = styled.td`
  ${densityPadding}
  width: 1%;
  vertical-align: middle;

  @container (max-width: 71.99rem) {
    box-sizing: border-box;
    display: block;
    width: auto;
    min-width: 0;
    grid-column: 1 / -1;
    border-top: 1px solid ${tokens.color.surfaceBorder.subtle};
  }
`

export const ActionsLayout = styled.div`
  display: flex;
  min-width: max-content;
  align-items: center;
  justify-content: flex-end;
  gap: var(--lsui-operational-list-action-gap);

  @container (max-width: 71.99rem) {
    min-width: 0;
    flex-wrap: wrap;
  }

  @container (max-width: 47.99rem) {
    align-items: stretch;
  }
`

export const PrimaryActionSlot = styled.div`
  display: inline-flex;
  min-width: 0;

  @container (max-width: 47.99rem) {
    width: 100%;

    > * {
      width: 100%;
    }
  }
`

export const QuickActions = styled.div`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: var(--lsui-operational-list-action-gap);

  @container (max-width: 47.99rem) {
    margin-left: auto;
  }
`

export const EmptyCell = styled.td`
  padding: ${tokens.spacing[8]} ${tokens.spacing[4]};
  color: ${tokens.color.content.muted};
  text-align: center;

  @container (max-width: 71.99rem) {
    box-sizing: border-box;
    display: block;
    width: 100%;
    border: 1px solid ${tokens.color.surfaceBorder.subtle};
    border-radius: ${tokens.radius.card};
    background: ${tokens.color.neutral[0]};
  }
`

export const Footer = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin-top: ${tokens.spacing[3]};
`
