import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Dialog } from '../Dialog'
import { Drawer } from '.'

describe('Drawer', () => {
  it('keeps only the top nested layer interactive and preserves the document lock', async () => {
    const closeDrawer = vi.fn()
    const closeDialog = vi.fn()
    const user = userEvent.setup()
    const { rerender } = render(
      <>
        <Drawer
          closeLabel="Fechar cobrança"
          onClose={closeDrawer}
          open
          title="Cobrança"
        >
          <button type="button">Ação da cobrança</button>
        </Drawer>
        <Dialog
          closeLabel="Fechar confirmação"
          onClose={closeDialog}
          open
          title="Confirmar baixa"
        >
          <button type="button">Cancelar baixa</button>
        </Dialog>
      </>,
    )

    const backdrops = document.querySelectorAll<HTMLElement>(
      '[data-ui-modal-backdrop="true"]',
    )
    await waitFor(() => expect(backdrops[0].inert).toBe(true))
    expect(backdrops[1].inert).toBe(false)

    await user.keyboard('{Escape}')
    expect(closeDialog).toHaveBeenCalledTimes(1)
    expect(closeDrawer).not.toHaveBeenCalled()

    rerender(
      <Drawer
        closeLabel="Fechar cobrança"
        onClose={closeDrawer}
        open
        title="Cobrança"
      >
        <button type="button">Ação da cobrança</button>
      </Drawer>,
    )

    await waitFor(() => {
      expect(
        document.querySelector<HTMLElement>('[data-ui-modal-backdrop="true"]')
          ?.inert,
      ).toBe(false)
    })
    expect(document.body.style.overflow).toBe('hidden')

    await user.keyboard('{Escape}')
    expect(closeDrawer).toHaveBeenCalledTimes(1)
  })

  it('exposes canonical kind, size and native panel hooks', () => {
    render(
      <Drawer
        closeLabel="Fechar painel"
        onClose={() => undefined}
        open
        panelProps={{ 'data-work-item-id': 'charge-1' }}
        size="lg"
        title="Painel"
      >
        Conteúdo
      </Drawer>,
    )

    const drawer = screen.getByRole('dialog', { name: 'Painel' })
    expect(drawer).toHaveAttribute('data-ui-modal-layer', 'drawer')
    expect(drawer).toHaveAttribute('data-size', 'lg')
    expect(drawer).toHaveAttribute('data-work-item-id', 'charge-1')
  })
})
