import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { renderToString } from 'react-dom/server'
import { styled } from 'styled-components'
import { describe, expect, it, vi } from 'vitest'
import {
  OperationalList,
  type OperationalListColumn,
  type OperationalListItemAction,
  type OperationalListPrimaryColumn,
} from '.'
import * as OperationalListStyles from './styles'

interface Person {
  id: string
  name: string
  status: string
}

const people: readonly Person[] = [
  { id: 'ana-1', name: 'Ana Lima', status: 'Novo contato' },
  { id: 'bia-2', name: 'Bia Souza', status: 'Em acompanhamento' },
]

const primaryColumn = {
  label: 'Pessoa',
  render: (person: Person, index: number) => ({
    description: `Posição ${index + 1}`,
    navigation: {
      label: `Abrir cadastro de ${person.name}`,
      onNavigate: () => undefined,
    },
    title: person.name,
  }),
} satisfies OperationalListPrimaryColumn<Person>

const columns = [
  {
    id: 'status atual',
    label: 'Status',
    render: (person: Person) => person.status,
  },
] satisfies readonly OperationalListColumn<Person>[]

const icon = <svg aria-hidden="true" data-testid="action-icon" />

describe('OperationalList', () => {
  it('renders a named semantic table with stable keys, row headers and cell associations', () => {
    const getItemKey = vi.fn((person: Person) => person.id)
    const getActions = vi.fn(() => [] as const)
    const ref = createRef<HTMLDivElement>()

    render(
      <OperationalList
        aria-label="Fila de pessoas"
        columns={columns}
        data-context="leads"
        getActions={getActions}
        getItemKey={getItemKey}
        items={people}
        primaryColumn={primaryColumn}
        ref={ref}
      />,
    )

    const table = screen.getByRole('table', { name: 'Fila de pessoas' })
    const rowHeaders = within(table).getAllByRole('rowheader')
    const statusHeader = within(table).getByRole('columnheader', {
      name: 'Status',
    })
    const cells = within(table).getAllByRole('cell')

    expect(rowHeaders).toHaveLength(2)
    expect(rowHeaders[0]).toHaveAttribute('scope', 'row')
    expect(cells[0]).toHaveAttribute(
      'headers',
      `${rowHeaders[0].id} ${statusHeader.id}`,
    )
    expect(cells[1]).toHaveAttribute(
      'headers',
      `${rowHeaders[1].id} ${statusHeader.id}`,
    )
    expect(
      within(table).getByRole('button', {
        name: 'Abrir cadastro de Ana Lima',
      }),
    ).toBeInTheDocument()
    expect(table.closest('[data-ui-operational-list]')).not.toHaveAttribute(
      'aria-label',
    )
    expect(ref.current).toHaveAttribute('data-context', 'leads')
    expect(getItemKey).toHaveBeenCalledTimes(2)
    expect(getActions).toHaveBeenCalledTimes(2)
  })

  it('preserves native link navigation and command navigation', async () => {
    const onLinkNavigate = vi.fn((event: React.MouseEvent<HTMLAnchorElement>) =>
      event.preventDefault(),
    )
    const onCommandNavigate = vi.fn()
    const user = userEvent.setup()
    const mixedPrimary = {
      label: 'Pessoa',
      render: (person: Person, index: number) => ({
        navigation:
          index === 0
            ? {
                href: `/pessoas/${person.id}`,
                label: `Visitar ${person.name}`,
                onNavigate: onLinkNavigate,
              }
            : {
                label: `Editar ${person.name}`,
                onNavigate: onCommandNavigate,
              },
        title: person.name,
      }),
    } satisfies OperationalListPrimaryColumn<Person>

    render(
      <OperationalList
        aria-label="Navegação"
        columns={columns}
        getItemKey={(person) => person.id}
        items={people}
        primaryColumn={mixedPrimary}
      />,
    )

    const link = screen.getByRole('link', { name: 'Visitar Ana Lima' })
    expect(link).toHaveAttribute('href', '/pessoas/ana-1')
    await user.click(link)
    expect(onLinkNavigate).toHaveBeenCalledOnce()
    expect(onLinkNavigate.mock.calls[0]?.[0]).toHaveProperty('button', 0)

    await user.click(screen.getByRole('button', { name: 'Editar Bia Souza' }))
    expect(onCommandNavigate).toHaveBeenCalledOnce()
  })

  it('uses controlled sort semantics and keeps non-sortable headers static', async () => {
    const onPrimarySort = vi.fn()
    const onStatusSort = vi.fn()
    const user = userEvent.setup()

    render(
      <OperationalList
        aria-label="Pessoas ordenadas"
        columns={[
          {
            ...columns[0],
            sort: { direction: 'none', onToggle: onStatusSort },
          },
          {
            id: 'origin',
            label: 'Origem',
            render: () => 'Indicação',
          },
        ]}
        getItemKey={(person) => person.id}
        items={people}
        primaryColumn={{
          ...primaryColumn,
          sort: { direction: 'ascending', onToggle: onPrimarySort },
        }}
      />,
    )

    const personHeader = screen.getByRole('columnheader', { name: 'Pessoa' })
    const statusHeader = screen.getByRole('columnheader', { name: 'Status' })
    expect(personHeader).toHaveAttribute('aria-sort', 'ascending')
    expect(statusHeader).toHaveAttribute('aria-sort', 'none')
    expect(
      screen.getByRole('columnheader', { name: 'Origem' }),
    ).not.toHaveAttribute('aria-sort')

    await user.click(within(personHeader).getByRole('button'))
    await user.click(within(statusHeader).getByRole('button'))
    expect(onPrimarySort).toHaveBeenCalledOnce()
    expect(onStatusSort).toHaveBeenCalledOnce()
  })

  it('normalizes one primary, two quick actions and deterministic overflow', async () => {
    const selected: string[] = []
    const action = (
      id: string,
      placement: 'primary' | 'quick' | 'overflow',
      options: Partial<OperationalListItemAction> = {},
    ) =>
      ({
        icon: placement === 'quick' ? icon : undefined,
        id,
        label: id,
        onSelect: () => selected.push(id),
        placement,
        ...options,
      }) as OperationalListItemAction
    const user = userEvent.setup()

    render(
      <OperationalList
        aria-label="Hierarquia de ações"
        columns={columns}
        getActions={() => [
          action('primary-one', 'primary'),
          action('quick-one', 'quick'),
          action('danger-explicit', 'overflow', { tone: 'danger' }),
          action('primary-extra', 'primary'),
          action('quick-two', 'quick'),
          action('neutral-explicit', 'overflow'),
          action('quick-extra', 'quick'),
        ]}
        getItemKey={(person) => person.id}
        items={people.slice(0, 1)}
        primaryColumn={primaryColumn}
      />,
    )

    expect(
      screen.getByRole('button', { name: 'primary-one' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'quick-one' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'quick-two' })).toBeVisible()
    expect(screen.queryByRole('button', { name: 'quick-extra' })).toBeNull()

    await user.click(screen.getByRole('button', { name: 'Mais ações' }))
    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems.map((item) => item.textContent)).toEqual([
      'neutral-explicit',
      'primary-extra',
      'quick-extra',
      'danger-explicit',
    ])
    expect(screen.getAllByRole('separator')).toHaveLength(1)

    await user.click(menuItems[1])
    expect(selected).toEqual(['primary-extra'])
  })

  it('keeps one overflow menu open and closes it when its row disappears', async () => {
    const user = userEvent.setup()
    const getActions = () => [
      {
        id: 'archive',
        label: 'Arquivar',
        onSelect: () => undefined,
        placement: 'overflow' as const,
      },
    ]
    const { rerender } = render(
      <OperationalList
        aria-label="Menus por pessoa"
        columns={columns}
        getActions={getActions}
        getItemKey={(person) => person.id}
        items={people}
        primaryColumn={primaryColumn}
      />,
    )

    const triggers = screen.getAllByRole('button', { name: 'Mais ações' })
    await user.click(triggers[0])
    await waitFor(() => expect(screen.getAllByRole('menu')).toHaveLength(1))
    await user.click(triggers[1])
    await waitFor(() => expect(screen.getAllByRole('menu')).toHaveLength(1))
    expect(triggers[0]).toHaveAttribute('aria-expanded', 'false')
    expect(triggers[1]).toHaveAttribute('aria-expanded', 'true')

    rerender(
      <OperationalList
        aria-label="Menus por pessoa"
        columns={columns}
        getActions={getActions}
        getItemKey={(person) => person.id}
        items={people.slice(0, 1)}
        primaryColumn={primaryColumn}
      />,
    )
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
  })

  it('omits the actions column when no row has actions', () => {
    render(
      <OperationalList
        aria-label="Sem ações"
        columns={columns}
        getActions={() => []}
        getItemKey={(person) => person.id}
        items={people}
        primaryColumn={primaryColumn}
      />,
    )

    expect(screen.getAllByRole('columnheader')).toHaveLength(2)
    expect(screen.queryByRole('columnheader', { name: 'Ações' })).toBeNull()
    expect(
      document.querySelector('[data-ui-operational-list-actions]'),
    ).toBeNull()
  })

  it('keeps the named table and correct colSpan while empty, then composes the footer', () => {
    render(
      <OperationalList
        aria-labelledby="queue-title"
        columns={columns}
        emptyState={<button type="button">Limpar filtros</button>}
        footer={<span>0 resultados</span>}
        getItemKey={(person) => person.id}
        items={[]}
        primaryColumn={primaryColumn}
      />,
    )

    expect(screen.getByRole('table')).toHaveAttribute(
      'aria-labelledby',
      'queue-title',
    )
    expect(screen.getByRole('cell')).toHaveAttribute('colspan', '2')
    expect(
      screen.getByRole('button', { name: 'Limpar filtros' }),
    ).toBeInTheDocument()
    expect(screen.getByText('0 resultados').closest('div')).toHaveAttribute(
      'data-ui-operational-list-footer',
      'true',
    )
  })

  it('server-renders complete content and supports styled composition', () => {
    const StyledList = styled(OperationalList<Person>)`
      margin-top: 1rem;
    `
    const callbackRef = vi.fn<(node: HTMLDivElement | null) => void>()
    const html = renderToString(
      <OperationalList
        aria-label="SSR list"
        columns={columns}
        getItemKey={(person) => person.id}
        items={people}
        primaryColumn={primaryColumn}
      />,
    )

    expect(html).toContain('<table')
    expect(html).toContain('Ana Lima')
    expect(html).toContain('lsui-sc-operational-list')
    expect(OperationalListStyles.Root.styledComponentId).toBe(
      'lsui-sc-operational-list',
    )

    render(
      <StyledList
        aria-label="Composed list"
        columns={columns}
        getItemKey={(person) => person.id}
        items={people.slice(0, 1)}
        primaryColumn={primaryColumn}
        ref={callbackRef}
      />,
    )
    expect(
      screen.getByRole('table', { name: 'Composed list' }).parentElement
        ?.parentElement,
    ).toHaveStyle({ marginTop: '1rem' })
    expect(callbackRef.mock.calls[0]?.[0]).toHaveClass(
      'lsui-sc-operational-list',
    )
  })

  it('enforces the generic action and accessible-name contracts', () => {
    const assertTypeContracts = () => {
      // @ts-expect-error quick actions require an icon
      const invalidQuick: OperationalListItemAction = {
        id: 'quick',
        label: 'Quick sem ícone',
        onSelect: () => undefined,
        placement: 'quick',
      }
      const invalidPrimary: OperationalListItemAction = {
        id: 'primary',
        label: 'Primary danger',
        onSelect: () => undefined,
        placement: 'primary',
        // @ts-expect-error primary actions do not accept danger tone
        tone: 'danger',
      }

      void invalidQuick
      void invalidPrimary

      // @ts-expect-error accessible-name sources are mutually exclusive
      ;<OperationalList
        aria-label="Uma fonte"
        aria-labelledby="outra-fonte"
        columns={columns}
        getItemKey={(person) => person.id}
        items={people}
        primaryColumn={primaryColumn}
      />
    }
    void assertTypeContracts

    expect(true).toBe(true)
  })
})
