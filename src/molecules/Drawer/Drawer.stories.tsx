import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../../atoms/Button'
import { TextInput } from '../../atoms/TextInput'
import { FieldRoot } from '../FieldRoot'
import { Drawer } from '.'

function ControlledDrawer({ size = 'md' }: { size?: 'lg' | 'md' | 'sm' }) {
  const [open, setOpen] = useState(true)

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Abrir drawer
      </Button>
      <Drawer
        closeLabel="Fechar painel"
        description="Conteúdo longo, footer com múltiplas ações e comportamento responsivo."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button>Salvar alterações</Button>
          </>
        }
        onClose={() => setOpen(false)}
        open={open}
        size={size}
        title="Painel operacional com título extenso para validar contenção"
      >
        <FieldRoot controlId="drawer-field" label="Nome da pessoa">
          <TextInput defaultValue="Maria Fernanda de Albuquerque Nogueira Vasconcelos" />
        </FieldRoot>
        {Array.from({ length: 8 }, (_, index) => (
          <section key={index} style={{ marginTop: '1rem' }}>
            <strong>Bloco operacional {index + 1}</strong>
            <p>
              Conteúdo operacional extremamente longo para provar quebra,
              contenção e leitura sem depender de uma rota de produção.
            </p>
          </section>
        ))}
      </Drawer>
    </>
  )
}

const meta = {
  args: {
    children: 'Conteúdo',
    closeLabel: 'Fechar',
    onClose: () => undefined,
    open: true,
    title: 'Drawer',
  },
  component: Drawer,
  parameters: { layout: 'fullscreen' },
  title: 'Molecules/Overlays/Drawer',
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  tags: ['layout-boundary', 'visual-review'],
  render: () => <ControlledDrawer />,
}

export const Small: Story = {
  render: () => <ControlledDrawer size="sm" />,
}

export const Large: Story = {
  tags: ['visual-review'],
  render: () => <ControlledDrawer size="lg" />,
}
