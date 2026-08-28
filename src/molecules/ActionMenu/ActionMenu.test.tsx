import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { renderToString } from 'react-dom/server'
import { styled } from 'styled-components'
import { describe, expect, it, vi } from 'vitest'
import { ActionMenu, type ActionMenuItem } from '.'
import { getActionMenuPosition } from './position'
import * as ActionMenuStyles from './styles'

const glyph = <svg data-testid="item-icon" />

const createItems = (
  onSelect: (id: string) => void = () => undefined,
): readonly ActionMenuItem[] => [
  {
    icon: glyph,
    id: 'open',
    label: 'Abrir cadastro',
    onSelect: () => onSelect('open'),
  },
  {
    disabled: true,
    id: 'disabled',
    label: 'Ação indisponível',
    onSelect: () => onSelect('disabled'),
  },
  {
    id: 'archive',
    label: 'Arquivar registro',
    onSelect: () => onSelect('archive'),
    tone: 'danger',
  },
  {
    isLoading: true,
    id: 'loading',
    label: 'Atualizando registro',
    onSelect: () => onSelect('loading'),
  },
]

describe('ActionMenu', () => {
  it('opens uncontrolled, groups danger last and selects once before returning focus', async () => {
    const sequence: string[] = []
    const user = userEvent.setup()
    render(
      <ActionMenu
        items={createItems((id) => sequence.push(`select:${id}`))}
        triggerLabel="Mais ações"
        onOpenChange={(open) => sequence.push(open ? 'open' : 'close')}
      />,
    )

    const trigger = screen.getByRole('button', { name: 'Mais ações' })
    await user.click(trigger)

    const menu = screen.getByRole('menu', { name: 'Mais ações' })
    const items = screen.getAllByRole('menuitem')
    await waitFor(() => expect(items[0]).toHaveFocus())
    expect(trigger).toHaveAttribute('aria-controls', menu.id)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(items.map((item) => item.textContent)).toEqual([
      'Abrir cadastro',
      'Ação indisponível',
      'Atualizando registro',
      'Arquivar registro',
    ])
    expect(screen.getAllByRole('separator')).toHaveLength(1)
    expect(
      screen.getByRole('menuitem', { name: 'Atualizando registro' }),
    ).toHaveAttribute('aria-busy', 'true')

    await user.click(items[0])

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    expect(sequence).toEqual(['open', 'close', 'select:open'])
  })

  it('opens from arrows and roves through enabled items with wrapping, Home and End', async () => {
    const user = userEvent.setup()
    render(<ActionMenu items={createItems()} triggerLabel="Ações do aluno" />)

    const trigger = screen.getByRole('button', {
      name: 'Ações do aluno',
    })
    trigger.focus()
    await user.keyboard('{ArrowUp}')

    const openItem = screen.getByRole('menuitem', { name: 'Abrir cadastro' })
    const archiveItem = screen.getByRole('menuitem', {
      name: 'Arquivar registro',
    })
    await waitFor(() => expect(archiveItem).toHaveFocus())

    await user.keyboard('{ArrowDown}')
    expect(openItem).toHaveFocus()
    await user.keyboard('{ArrowUp}')
    expect(archiveItem).toHaveFocus()
    await user.keyboard('{Home}')
    expect(openItem).toHaveFocus()
    await user.keyboard('{End}')
    expect(archiveItem).toHaveFocus()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()

    await user.keyboard('{ArrowDown}')
    await waitFor(() =>
      expect(
        screen.getByRole('menuitem', { name: 'Abrir cadastro' }),
      ).toHaveFocus(),
    )
  })

  it('keeps all-unavailable states perceptible and omits the trigger only for zero items', async () => {
    const user = userEvent.setup()
    const ref = createRef<HTMLDivElement>()
    const { rerender } = render(
      <ActionMenu
        data-context="queue"
        items={[
          {
            disabled: true,
            id: 'disabled',
            label: 'Sem permissão',
            onSelect: () => undefined,
          },
          {
            isLoading: true,
            id: 'loading',
            label: 'Processando',
            onSelect: () => undefined,
          },
        ]}
        ref={ref}
        triggerLabel="Mais opções"
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Mais opções' }))
    const menu = screen.getByRole('menu', { name: 'Mais opções' })
    await waitFor(() => expect(menu).toHaveFocus())
    expect(screen.getAllByRole('menuitem')).toHaveLength(2)
    expect(menu.querySelectorAll('.lsui-sc-spinner')).toHaveLength(1)
    expect(ref.current).toHaveAttribute('data-context', 'queue')

    rerender(
      <ActionMenu
        data-context="queue"
        items={[]}
        ref={ref}
        triggerLabel="Mais opções"
      />,
    )
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(ref.current).toHaveClass('lsui-sc-action-menu')
  })

  it('moves Tab relative to the trigger and preserves an outside pointer target', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">Anterior</button>
        <ActionMenu items={createItems()} triggerLabel="Menu contextual" />
        <button hidden type="button">
          Oculto
        </button>
        <button type="button">Próximo</button>
      </>,
    )

    const previous = screen.getByRole('button', { name: 'Anterior' })
    const trigger = screen.getByRole('button', { name: 'Menu contextual' })
    const next = screen.getByRole('button', { name: 'Próximo' })

    await user.click(trigger)
    await waitFor(() =>
      expect(
        screen.getByRole('menuitem', { name: 'Abrir cadastro' }),
      ).toHaveFocus(),
    )
    await user.tab()
    expect(next).toHaveFocus()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    await user.click(trigger)
    await waitFor(() =>
      expect(
        screen.getByRole('menuitem', { name: 'Abrir cadastro' }),
      ).toHaveFocus(),
    )
    await user.tab({ shift: true })
    expect(previous).toHaveFocus()

    await user.click(trigger)
    await waitFor(() => expect(screen.getByRole('menu')).toBeVisible())
    await user.click(next)
    expect(next).toHaveFocus()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('blurs the trigger when Tab has no adjacent target', async () => {
    const user = userEvent.setup()
    render(<ActionMenu items={createItems()} triggerLabel="Menu isolado" />)

    const trigger = screen.getByRole('button', { name: 'Menu isolado' })
    await user.click(trigger)
    await waitFor(() =>
      expect(
        screen.getByRole('menuitem', { name: 'Abrir cadastro' }),
      ).toHaveFocus(),
    )
    await user.tab()

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(trigger).not.toHaveFocus()
  })

  it('keeps internal scroll open and closes on viewport change with conditional focus restore', async () => {
    const user = userEvent.setup()
    render(<ActionMenu items={createItems()} triggerLabel="Menu da viewport" />)

    const trigger = screen.getByRole('button', { name: 'Menu da viewport' })
    await user.click(trigger)
    const menu = screen.getByRole('menu')
    await waitFor(() =>
      expect(
        screen.getByRole('menuitem', { name: 'Abrir cadastro' }),
      ).toHaveFocus(),
    )

    fireEvent.scroll(menu)
    expect(screen.getByRole('menu')).toBeInTheDocument()

    fireEvent.resize(window)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('obeys controlled state instead of closing itself', async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()
    const { rerender } = render(
      <ActionMenu
        items={createItems()}
        onOpenChange={onOpenChange}
        open
        triggerLabel="Menu controlado"
      />,
    )

    const trigger = screen.getByRole('button', { name: 'Menu controlado' })
    await waitFor(() => expect(screen.getByRole('menu')).toBeVisible())
    trigger.focus()
    await user.keyboard('{ArrowUp}')
    expect(
      screen.getByRole('menuitem', { name: 'Arquivar registro' }),
    ).toHaveFocus()
    await user.click(trigger)
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    expect(screen.getByRole('menu')).toBeInTheDocument()

    rerender(
      <ActionMenu
        items={createItems()}
        onOpenChange={onOpenChange}
        open={false}
        triggerLabel="Menu controlado"
      />,
    )
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('server-renders safely and supports styled composition', () => {
    const StyledActionMenu = styled(ActionMenu)`
      margin-left: 1rem;
    `
    const html = renderToString(
      <ActionMenu
        defaultOpen
        items={createItems()}
        triggerLabel="Menu no servidor"
      />,
    )

    expect(html).toContain('lsui-sc-action-menu')
    expect(html).toContain('Menu no servidor')
    expect(html).not.toContain('data-ui-action-menu')

    render(
      <StyledActionMenu items={createItems()} triggerLabel="Menu composto" />,
    )
    expect(
      screen.getByRole('button', { name: 'Menu composto' }).parentElement,
    ).toHaveStyle({
      marginLeft: '1rem',
    })
    expect(ActionMenuStyles.Root.styledComponentId).toBe('lsui-sc-action-menu')
  })

  it('uses the compact item recipe, top placement and callback refs', async () => {
    const callbackRef = vi.fn<(node: HTMLDivElement | null) => void>()
    const rectSpy = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function getRect(this: HTMLElement) {
        if (this.matches('[data-ui-action-menu="true"]')) {
          return {
            bottom: 260,
            height: 220,
            left: 0,
            right: 240,
            top: 40,
            width: 240,
            x: 0,
            y: 40,
            toJSON: () => undefined,
          }
        }

        return {
          bottom: 790,
          height: 32,
          left: 24,
          right: 56,
          top: 758,
          width: 32,
          x: 24,
          y: 758,
          toJSON: () => undefined,
        }
      })

    render(
      <ActionMenu
        align="start"
        defaultOpen
        items={createItems()}
        ref={callbackRef}
        size="sm"
        triggerLabel="Menu compacto"
      />,
    )

    const menu = await screen.findByRole('menu')
    await waitFor(() => expect(menu).toHaveAttribute('data-placement', 'top'))
    expect(
      screen.getByRole('menuitem', { name: 'Abrir cadastro' }),
    ).toHaveStyle({ minHeight: '2.5rem' })
    expect(menu).toHaveStyle({ transformOrigin: 'left bottom' })
    expect(callbackRef.mock.calls[0]?.[0]).toHaveClass('lsui-sc-action-menu')

    rectSpy.mockRestore()
  })

  it('installs global listeners only while open and cleans them on unmount', async () => {
    const addListener = vi.spyOn(document, 'addEventListener')
    const removeListener = vi.spyOn(document, 'removeEventListener')
    const { unmount } = render(
      <ActionMenu
        defaultOpen
        items={createItems()}
        triggerLabel="Menu com listeners"
      />,
    )

    await screen.findByRole('menu')
    expect(addListener).toHaveBeenCalledWith(
      'pointerdown',
      expect.any(Function),
      true,
    )
    expect(addListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      true,
    )

    unmount()
    expect(removeListener).toHaveBeenCalledWith(
      'pointerdown',
      expect.any(Function),
      true,
    )
    expect(removeListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      true,
    )

    addListener.mockRestore()
    removeListener.mockRestore()
  })
})

describe('getActionMenuPosition', () => {
  const rect = (
    values: Partial<{
      bottom: number
      height: number
      left: number
      right: number
      top: number
      width: number
    }> = {},
  ) => ({
    bottom: 40,
    height: 32,
    left: 8,
    right: 40,
    top: 8,
    width: 32,
    ...values,
  })

  it('aligns, clamps, flips and limits height inside the viewport', () => {
    expect(
      getActionMenuPosition({
        align: 'start',
        menu: rect({ height: 200, width: 220 }),
        trigger: rect({ bottom: 72, left: 24, right: 56, top: 40 }),
        viewportHeight: 600,
        viewportWidth: 800,
      }),
    ).toEqual({ left: 24, maxHeight: 514, placement: 'bottom', top: 78 })

    expect(
      getActionMenuPosition({
        align: 'end',
        menu: rect({ height: 260, width: 320 }),
        trigger: rect({ bottom: 592, left: 760, right: 792, top: 560 }),
        viewportHeight: 600,
        viewportWidth: 800,
      }),
    ).toEqual({ left: 472, maxHeight: 546, placement: 'top', top: 294 })

    expect(
      getActionMenuPosition({
        align: 'end',
        menu: rect({ height: 500, width: 500 }),
        trigger: rect({ bottom: 232, left: 8, right: 40, top: 200 }),
        viewportHeight: 300,
        viewportWidth: 390,
      }),
    ).toEqual({ left: 8, maxHeight: 186, placement: 'top', top: 8 })
  })
})
