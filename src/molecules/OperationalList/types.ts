import type {
  ComponentPropsWithRef,
  Key,
  MouseEventHandler,
  ReactNode,
} from 'react'
import type { AccessibleName } from '../../foundations/accessibility'

export type OperationalListAlign = 'start' | 'end'
export type OperationalListDensity = 'regular' | 'compact'
export type OperationalListImportance = 'secondary' | 'tertiary'
export type OperationalListSortDirection = 'ascending' | 'descending' | 'none'

export interface OperationalListSort {
  direction: OperationalListSortDirection
  onToggle: () => void
}

export type OperationalListNavigation =
  | {
      href: string
      label: string
      onNavigate?: MouseEventHandler<HTMLAnchorElement>
    }
  | {
      label: string
      onNavigate: () => void
    }

export interface OperationalListPrimaryContent {
  description?: ReactNode
  leading?: ReactNode
  meta?: ReactNode
  navigation?: OperationalListNavigation
  title: ReactNode
}

export interface OperationalListPrimaryColumn<Item> {
  label: string
  render: (item: Item, index: number) => OperationalListPrimaryContent
  sort?: OperationalListSort
}

export interface OperationalListColumn<Item> {
  align?: OperationalListAlign
  id: string
  importance?: OperationalListImportance
  label: string
  render: (item: Item, index: number) => ReactNode
  sort?: OperationalListSort
}

interface OperationalListActionBase {
  disabled?: boolean
  id: string
  isLoading?: boolean
  label: string
  onSelect: () => void
}

export type OperationalListItemAction =
  | (OperationalListActionBase & {
      icon?: ReactNode
      placement: 'primary'
      variant?: 'brand' | 'primary' | 'secondary'
    })
  | (OperationalListActionBase & {
      icon: ReactNode
      placement: 'quick'
    })
  | (OperationalListActionBase & {
      icon?: ReactNode
      placement?: 'overflow'
      tone?: 'neutral' | 'danger'
    })

type NativeRootProps = Omit<
  ComponentPropsWithRef<'div'>,
  'aria-label' | 'aria-labelledby' | 'children'
>

export type OperationalListProps<Item> = NativeRootProps &
  AccessibleName & {
    columns: readonly OperationalListColumn<Item>[]
    density?: OperationalListDensity
    emptyState?: ReactNode
    footer?: ReactNode
    getActions?: (
      item: Item,
      index: number,
    ) => readonly OperationalListItemAction[]
    getItemKey: (item: Item) => Key
    items: readonly Item[]
    primaryColumn: OperationalListPrimaryColumn<Item>
  }

export interface OperationalListCellStyleProps {
  $align: OperationalListAlign
  $importance?: OperationalListImportance
}

export interface OperationalListHeadStyleProps {
  $hasSorting: boolean
}

export interface OperationalListHeaderStyleProps {
  $align: OperationalListAlign
  $sortable: boolean
}
