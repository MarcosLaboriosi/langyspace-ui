import { useId, useState, type Key } from 'react'
import { Button } from '../../atoms/Button'
import { IconButton } from '../../atoms/IconButton'
import { ActionMenu } from '../ActionMenu'
import { normalizeOperationalListActions } from './normalizeActions'
import * as Styled from './styles'
import type {
  OperationalListNavigation,
  OperationalListProps,
  OperationalListSort,
} from './types'

function SortGlyph({ direction }: Pick<OperationalListSort, 'direction'>) {
  return (
    <Styled.SortGlyph aria-hidden="true">
      {direction === 'ascending' ? '↑' : direction === 'descending' ? '↓' : '↕'}
    </Styled.SortGlyph>
  )
}

function PrimaryNavigation({
  navigation,
  title,
}: {
  navigation: OperationalListNavigation
  title: React.ReactNode
}) {
  if ('href' in navigation) {
    return (
      <Styled.PrimaryLink
        aria-label={navigation.label}
        href={navigation.href}
        onClick={navigation.onNavigate}
      >
        {title}
      </Styled.PrimaryLink>
    )
  }

  return (
    <Styled.PrimaryButton
      aria-label={navigation.label}
      onClick={navigation.onNavigate}
    >
      {title}
    </Styled.PrimaryButton>
  )
}

export function OperationalList<Item>({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  columns,
  density = 'regular',
  emptyState,
  footer,
  getActions,
  getItemKey,
  items,
  primaryColumn,
  ref,
  ...nativeProps
}: OperationalListProps<Item>) {
  const [openMenuKey, setOpenMenuKey] = useState<Key | null>(null)
  const reactId = useId().replaceAll(':', '')
  const idPrefix = `lsui-operational-list-${reactId}`
  const primaryHeaderId = `${idPrefix}-column-primary`
  const actionsHeaderId = `${idPrefix}-column-actions`
  const actionSize = density === 'compact' ? 'sm' : 'md'
  const hasSorting = Boolean(
    primaryColumn.sort || columns.some((column) => column.sort),
  )
  const rows = items.map((item, index) => {
    const key = getItemKey(item)
    const encodedKey = encodeURIComponent(String(key))
    const actions = normalizeOperationalListActions(
      getActions?.(item, index) ?? [],
    )

    return {
      actions,
      cells: columns.map((column) => ({
        column,
        content: column.render(item, index),
        headerId: `${idPrefix}-column-${encodeURIComponent(column.id)}`,
      })),
      key,
      primary: primaryColumn.render(item, index),
      rowHeaderId: `${idPrefix}-row-${encodedKey}`,
    }
  })
  const hasAnyActions = rows.some(
    (row) =>
      row.actions.primary ||
      row.actions.quick.length > 0 ||
      row.actions.overflow.length > 0,
  )
  const openMenuStillExists = rows.some(
    (row) => row.key === openMenuKey && row.actions.overflow.length > 0,
  )
  const columnCount = 1 + columns.length + (hasAnyActions ? 1 : 0)

  if (openMenuKey !== null && !openMenuStillExists) {
    setOpenMenuKey(null)
  }

  const renderHeader = (
    label: string,
    sort: OperationalListSort | undefined,
  ) =>
    sort ? (
      <Styled.SortButton onClick={sort.onToggle}>
        <span>{label}</span>
        <SortGlyph direction={sort.direction} />
      </Styled.SortButton>
    ) : (
      label
    )

  return (
    <Styled.Root
      {...nativeProps}
      data-density={density}
      data-ui-operational-list="true"
      ref={ref}
    >
      <Styled.Surface data-ui-operational-list-surface="true">
        <Styled.Table
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          data-has-sorting={hasSorting ? 'true' : 'false'}
          data-ui-operational-list-table="true"
        >
          <Styled.TableHead $hasSorting={hasSorting}>
            <Styled.HeaderRow>
              <Styled.ColumnHeader
                $align="start"
                $sortable={Boolean(primaryColumn.sort)}
                aria-sort={primaryColumn.sort?.direction}
                data-sortable={primaryColumn.sort ? 'true' : undefined}
                id={primaryHeaderId}
                scope="col"
              >
                {renderHeader(primaryColumn.label, primaryColumn.sort)}
              </Styled.ColumnHeader>
              {columns.map((column) => (
                <Styled.ColumnHeader
                  $align={column.align ?? 'start'}
                  $sortable={Boolean(column.sort)}
                  aria-sort={column.sort?.direction}
                  data-column-id={column.id}
                  data-sortable={column.sort ? 'true' : undefined}
                  id={`${idPrefix}-column-${encodeURIComponent(column.id)}`}
                  key={column.id}
                  scope="col"
                >
                  {renderHeader(column.label, column.sort)}
                </Styled.ColumnHeader>
              ))}
              {hasAnyActions ? (
                <Styled.ActionsHeader id={actionsHeaderId} scope="col">
                  Ações
                </Styled.ActionsHeader>
              ) : null}
            </Styled.HeaderRow>
          </Styled.TableHead>
          <tbody>
            {rows.length === 0 ? (
              <Styled.EmptyRow>
                <Styled.EmptyCell colSpan={columnCount}>
                  {emptyState ?? null}
                </Styled.EmptyCell>
              </Styled.EmptyRow>
            ) : (
              rows.map((row) => {
                const primary = row.primary
                const hasRowActions = Boolean(
                  row.actions.primary ||
                  row.actions.quick.length > 0 ||
                  row.actions.overflow.length > 0,
                )

                return (
                  <Styled.Row
                    data-item-key={String(row.key)}
                    data-ui-operational-list-row="true"
                    key={row.key}
                  >
                    <Styled.PrimaryCell
                      data-ui-operational-list-primary="true"
                      id={row.rowHeaderId}
                      scope="row"
                    >
                      <Styled.PrimaryLayout>
                        {primary.leading ? (
                          <Styled.Leading>{primary.leading}</Styled.Leading>
                        ) : null}
                        <Styled.PrimaryBody>
                          {primary.navigation ? (
                            <PrimaryNavigation
                              navigation={primary.navigation}
                              title={primary.title}
                            />
                          ) : (
                            <Styled.PrimaryTitle>
                              {primary.title}
                            </Styled.PrimaryTitle>
                          )}
                          {primary.description ? (
                            <Styled.PrimaryDescription>
                              {primary.description}
                            </Styled.PrimaryDescription>
                          ) : null}
                          {primary.meta ? (
                            <Styled.PrimaryMeta>
                              {primary.meta}
                            </Styled.PrimaryMeta>
                          ) : null}
                        </Styled.PrimaryBody>
                        {primary.navigation ? (
                          <Styled.NavigationHint aria-hidden="true">
                            ›
                          </Styled.NavigationHint>
                        ) : null}
                      </Styled.PrimaryLayout>
                    </Styled.PrimaryCell>
                    {row.cells.map(({ column, content, headerId }) => (
                      <Styled.DataCell
                        $align={column.align ?? 'start'}
                        $importance={column.importance}
                        data-align={column.align ?? 'start'}
                        data-column-id={column.id}
                        data-column-importance={column.importance}
                        data-ui-operational-list-cell="true"
                        headers={`${row.rowHeaderId} ${headerId}`}
                        key={column.id}
                      >
                        <Styled.CompactLabel aria-hidden="true">
                          {column.label}
                        </Styled.CompactLabel>
                        <Styled.CellValue>{content}</Styled.CellValue>
                      </Styled.DataCell>
                    ))}
                    {hasAnyActions ? (
                      <Styled.ActionsCell
                        data-has-actions={hasRowActions ? 'true' : 'false'}
                        data-ui-operational-list-actions="true"
                        headers={`${row.rowHeaderId} ${actionsHeaderId}`}
                      >
                        {hasRowActions ? (
                          <Styled.ActionsLayout>
                            {row.actions.primary ? (
                              <Styled.PrimaryActionSlot data-action-placement="primary">
                                <Button
                                  density={density}
                                  disabled={row.actions.primary.disabled}
                                  iconStart={row.actions.primary.icon}
                                  isLoading={row.actions.primary.isLoading}
                                  size={actionSize}
                                  variant={
                                    row.actions.primary.variant ?? 'primary'
                                  }
                                  onClick={row.actions.primary.onSelect}
                                >
                                  {row.actions.primary.label}
                                </Button>
                              </Styled.PrimaryActionSlot>
                            ) : null}
                            {row.actions.quick.length > 0 ? (
                              <Styled.QuickActions data-action-placement="quick">
                                {row.actions.quick.map((action) => (
                                  <IconButton
                                    aria-label={action.label}
                                    disabled={action.disabled}
                                    isLoading={action.isLoading}
                                    key={action.id}
                                    size={actionSize}
                                    variant="neutral"
                                    onClick={action.onSelect}
                                  >
                                    {action.icon}
                                  </IconButton>
                                ))}
                              </Styled.QuickActions>
                            ) : null}
                            {row.actions.overflow.length > 0 ? (
                              <div data-action-placement="overflow">
                                <ActionMenu
                                  items={row.actions.overflow}
                                  open={openMenuKey === row.key}
                                  size={actionSize}
                                  triggerLabel="Mais ações"
                                  onOpenChange={(open) =>
                                    setOpenMenuKey(open ? row.key : null)
                                  }
                                />
                              </div>
                            ) : null}
                          </Styled.ActionsLayout>
                        ) : null}
                      </Styled.ActionsCell>
                    ) : null}
                  </Styled.Row>
                )
              })
            )}
          </tbody>
        </Styled.Table>
      </Styled.Surface>
      {footer ? (
        <Styled.Footer data-ui-operational-list-footer="true">
          {footer}
        </Styled.Footer>
      ) : null}
    </Styled.Root>
  )
}

export type {
  OperationalListAlign,
  OperationalListColumn,
  OperationalListDensity,
  OperationalListImportance,
  OperationalListItemAction,
  OperationalListNavigation,
  OperationalListPrimaryColumn,
  OperationalListPrimaryContent,
  OperationalListProps,
  OperationalListSort,
  OperationalListSortDirection,
} from './types'
