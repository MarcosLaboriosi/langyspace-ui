import { render } from '@testing-library/react'
import { createRef } from 'react'
import { renderToString } from 'react-dom/server'
import { styled } from 'styled-components'
import { describe, expect, it, vi } from 'vitest'
import {
  ActionMenu,
  Avatar,
  Button,
  OperationalList,
  SearchInput,
  TextInput,
  type OperationalListColumn,
  type OperationalListPrimaryColumn,
} from '../src'

interface RefPerson {
  id: string
  name: string
}

const refPeople = [{ id: 'person-1', name: 'Ana' }] as const
const refPrimaryColumn = {
  label: 'Pessoa',
  render: (item: RefPerson) => ({ title: item.name }),
} satisfies OperationalListPrimaryColumn<RefPerson>
const refColumns = [] satisfies readonly OperationalListColumn<RefPerson>[]

const StyledButton = styled(Button)`
  margin: 0;
`
const StyledSearchInput = styled(SearchInput)`
  margin: 0;
`
const StyledAvatar = styled(Avatar)`
  margin: 0;
`
const StyledActionMenu = styled(ActionMenu)`
  margin: 0;
`
const StyledOperationalList = styled(OperationalList<RefPerson>)`
  margin: 0;
`

describe('React 19 ref interop', () => {
  it('supports object and callback refs through direct and styled compositions', () => {
    const buttonRef = createRef<HTMLButtonElement>()
    const avatarRef = createRef<HTMLSpanElement>()
    const inputRef = createRef<HTMLInputElement>()
    const operationalListRef = createRef<HTMLDivElement>()
    const actionMenuRef = vi.fn<(node: HTMLDivElement | null) => void>()
    const searchRef = vi.fn<(node: HTMLInputElement | null) => void>()

    render(
      <>
        <StyledButton ref={buttonRef}>Salvar</StyledButton>
        <StyledAvatar ref={avatarRef} initials="LS" />
        <TextInput aria-label="Nome" ref={inputRef} />
        <StyledSearchInput aria-label="Buscar" ref={searchRef} />
        <StyledActionMenu
          items={[
            {
              id: 'open',
              label: 'Abrir cadastro',
              onSelect: () => undefined,
            },
          ]}
          ref={actionMenuRef}
          triggerLabel="Mais ações"
        />
        <StyledOperationalList
          aria-label="Fila"
          columns={refColumns}
          getItemKey={(item) => item.id}
          items={refPeople}
          primaryColumn={refPrimaryColumn}
          ref={operationalListRef}
        />
      </>,
    )

    expect(buttonRef.current?.tagName).toBe('BUTTON')
    expect(avatarRef.current?.tagName).toBe('SPAN')
    expect(inputRef.current?.tagName).toBe('INPUT')
    expect(searchRef.mock.calls[0]?.[0]?.tagName).toBe('INPUT')
    expect(actionMenuRef.mock.calls[0]?.[0]?.tagName).toBe('DIV')
    expect(operationalListRef.current?.tagName).toBe('DIV')
  })

  it('server-renders both ref declaration patterns through styled-components', () => {
    const html = renderToString(
      <>
        <StyledButton>Salvar</StyledButton>
        <StyledAvatar initials="LS" />
        <StyledSearchInput aria-label="Buscar" />
        <StyledActionMenu
          items={[
            {
              id: 'open',
              label: 'Abrir cadastro',
              onSelect: () => undefined,
            },
          ]}
          triggerLabel="Mais ações"
        />
        <StyledOperationalList
          aria-label="Fila SSR"
          columns={refColumns}
          getItemKey={(item) => item.id}
          items={refPeople}
          primaryColumn={refPrimaryColumn}
        />
      </>,
    )

    expect(html).toContain('lsui-sc-button')
    expect(html).toContain('lsui-sc-avatar')
    expect(html).toContain('lsui-sc-search-input')
    expect(html).toContain('lsui-sc-action-menu')
    expect(html).toContain('lsui-sc-operational-list')
  })
})
