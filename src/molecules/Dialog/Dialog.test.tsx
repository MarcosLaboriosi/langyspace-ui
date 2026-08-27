import { createRef, useState } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderToString } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '../../atoms/Button'
import { Dialog } from '.'

function DialogHarness({
  onClose = () => undefined,
}: {
  onClose?: () => void
}) {
  const [open, setOpen] = useState(false)
  const close = () => {
    onClose()
    setOpen(false)
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Abrir decisão
      </button>
      <Dialog
        closeLabel="Fechar decisão"
        description="Revise os dados antes de continuar."
        footer={<Button onClick={close}>Confirmar</Button>}
        onClose={close}
        open={open}
        title="Confirmar decisão"
      >
        <button data-overlay-initial-focus="true" type="button">
          Cancelar
        </button>
        <button type="button">Continuar</button>
      </Dialog>
    </>
  )
}

describe('Dialog', () => {
  it('names the layer, traps focus and restores the trigger after Escape', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<DialogHarness onClose={onClose} />)

    const trigger = screen.getByRole('button', { name: 'Abrir decisão' })
    await user.click(trigger)

    const dialog = screen.getByRole('dialog', { name: 'Confirmar decisão' })
    const initial = screen.getByRole('button', { name: 'Cancelar' })
    await waitFor(() => expect(initial).toHaveFocus())
    expect(dialog).toHaveAccessibleDescription(
      'Revise os dados antes de continuar.',
    )
    expect(document.body.style.overflow).toBe('hidden')

    screen.getByRole('button', { name: 'Confirmar' }).focus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Fechar decisão' })).toHaveFocus()

    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
    await waitFor(() => expect(trigger).toHaveFocus())
    expect(document.body.style.overflow).toBe('')
  })

  it('closes only from a complete backdrop gesture', async () => {
    const onClose = vi.fn()
    render(
      <Dialog closeLabel="Fechar" onClose={onClose} open title="Editar lead">
        Conteúdo
      </Dialog>,
    )

    const backdrop = document.querySelector<HTMLElement>(
      '[data-ui-modal-backdrop="true"]',
    )!
    const dialog = screen.getByRole('dialog', { name: 'Editar lead' })

    fireEvent.pointerDown(dialog)
    fireEvent.pointerUp(backdrop)
    expect(onClose).not.toHaveBeenCalled()

    fireEvent.pointerDown(backdrop)
    fireEvent.pointerUp(backdrop)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('keeps blocked layers focused and non-dismissible', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Dialog
        closeLabel="Fechar processamento"
        dismissal="blocked"
        onClose={onClose}
        open
        title="Processando"
      >
        Aguarde a confirmação.
      </Dialog>,
    )

    const dialog = screen.getByRole('dialog', { name: 'Processando' })
    await waitFor(() => expect(dialog).toHaveFocus())
    expect(
      screen.getByRole('button', { name: 'Fechar processamento' }),
    ).toBeDisabled()

    await user.keyboard('{Escape}')
    const backdrop = document.querySelector<HTMLElement>(
      '[data-ui-modal-backdrop="true"]',
    )!
    fireEvent.pointerDown(backdrop)
    fireEvent.pointerUp(backdrop)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('supports explicit focus refs and renders safely without a DOM', () => {
    const initialFocusRef = createRef<HTMLButtonElement>()
    const html = renderToString(
      <Dialog
        closeLabel="Fechar"
        initialFocusRef={initialFocusRef}
        onClose={() => undefined}
        open
        title="SSR"
      >
        Conteúdo
      </Dialog>,
    )

    expect(html).toBe('')
  })
})
