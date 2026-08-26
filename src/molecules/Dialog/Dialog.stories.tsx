import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, waitFor, within } from 'storybook/test'
import { Button } from '../../atoms/Button'
import { StatePanel } from '../StatePanel'
import { Dialog } from '.'

function ControlledDialog({
  blocked = false,
  long = false,
}: {
  blocked?: boolean
  long?: boolean
}) {
  const [open, setOpen] = useState(true)

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Abrir diálogo
      </Button>
      <Dialog
        closeLabel="Fechar confirmação"
        description={
          long
            ? 'Descrição operacional extensa para validar contenção, leitura e hierarquia sem depender de uma rota de produção.'
            : 'Revise antes de continuar.'
        }
        dismissal={blocked ? 'blocked' : 'escape-and-backdrop'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger">
              Confirmar ação potencialmente destrutiva
            </Button>
          </>
        }
        onClose={() => setOpen(false)}
        open={open}
        title={
          long
            ? 'Confirmar uma decisão operacional com título extremamente longo para validar contenção'
            : 'Confirmar decisão'
        }
      >
        <StatePanel
          description="A confirmação deve manter a pessoa no contexto correto."
          state="partial"
          title="Revise antes de continuar"
        />
      </Dialog>
    </>
  )
}

const meta = {
  args: {
    children: 'Conteúdo',
    closeLabel: 'Fechar',
    onClose: () => undefined,
    open: true,
    title: 'Dialog',
  },
  component: Dialog,
  parameters: { layout: 'fullscreen' },
  title: 'Molecules/Overlays/Dialog',
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  tags: ['visual-review'],
  render: () => <ControlledDialog />,
}

export const InteractiveDismissal: Story = {
  render: () => <ControlledDialog />,
  play: async ({ canvasElement, userEvent }) => {
    const body = within(canvasElement.ownerDocument.body)
    await expect(
      body.getByRole('dialog', { name: 'Confirmar decisão' }),
    ).toBeVisible()
    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(body.queryByRole('dialog')).not.toBeInTheDocument(),
    )
    await userEvent.click(body.getByRole('button', { name: 'Abrir diálogo' }))
    await expect(
      body.getByRole('dialog', { name: 'Confirmar decisão' }),
    ).toBeVisible()
  },
}

export const Blocked: Story = {
  render: () => <ControlledDialog blocked />,
}

export const Stress: Story = {
  tags: ['layout-boundary', 'visual-review'],
  render: () => <ControlledDialog long />,
}
