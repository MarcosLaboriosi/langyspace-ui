import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor, within } from 'storybook/test'
import { ActionMenu, type ActionMenuItem } from '.'

function StoryIcon({ kind = 'circle' }: { kind?: 'circle' | 'square' }) {
  return (
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16">
      {kind === 'circle' ? (
        <circle cx="8" cy="8" fill="currentColor" r="5" />
      ) : (
        <rect fill="currentColor" height="10" rx="2" width="10" x="3" y="3" />
      )}
    </svg>
  )
}

const defaultItems: readonly ActionMenuItem[] = [
  {
    icon: <StoryIcon />,
    id: 'open',
    label: 'Abrir cadastro',
    onSelect: () => undefined,
  },
  {
    icon: <StoryIcon kind="square" />,
    id: 'schedule',
    label: 'Agendar retorno',
    onSelect: () => undefined,
  },
  {
    icon: <StoryIcon />,
    id: 'archive',
    label: 'Arquivar registro',
    onSelect: () => undefined,
    tone: 'danger',
  },
]

const keyboardItems: readonly ActionMenuItem[] = [
  defaultItems[0],
  {
    disabled: true,
    id: 'disabled',
    label: 'Ação indisponível',
    onSelect: () => undefined,
  },
  defaultItems[1],
  defaultItems[2],
]

const meta = {
  args: {
    items: defaultItems,
    triggerLabel: 'Mais ações',
  },
  component: ActionMenu,
  parameters: { layout: 'fullscreen' },
  title: 'Molecules/Actions/ActionMenu',
} satisfies Meta<typeof ActionMenu>

export default meta
type Story = StoryObj<typeof meta>

const centered = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '2rem',
} as const

export const Default: Story = {
  tags: ['visual-review'],
  render: (args) => (
    <div style={centered}>
      <ActionMenu {...args} defaultOpen />
    </div>
  ),
}

export const TonesAndDisabled: Story = {
  tags: ['visual-review'],
  render: (args) => (
    <div style={centered}>
      <ActionMenu
        {...args}
        defaultOpen
        items={keyboardItems}
        triggerLabel="Ações com estados"
      />
    </div>
  ),
}

export const InteractiveKeyboard: Story = {
  render: (args) => (
    <div style={centered}>
      <ActionMenu {...args} items={keyboardItems} />
    </div>
  ),
  play: async ({ canvasElement, userEvent }) => {
    const body = within(canvasElement.ownerDocument.body)
    const trigger = body.getByRole('button', { name: 'Mais ações' })
    trigger.focus()
    await userEvent.keyboard('{ArrowDown}')

    const first = body.getByRole('menuitem', { name: 'Abrir cadastro' })
    const second = body.getByRole('menuitem', { name: 'Agendar retorno' })
    const last = body.getByRole('menuitem', { name: 'Arquivar registro' })
    await waitFor(() => expect(first).toHaveFocus())
    await userEvent.keyboard('{ArrowDown}')
    await expect(second).toHaveFocus()
    await userEvent.keyboard('{End}')
    await expect(last).toHaveFocus()
    await userEvent.keyboard('{Escape}')
    await expect(trigger).toHaveFocus()
    await expect(body.queryByRole('menu')).not.toBeInTheDocument()
  },
}

export const NarrowViewportFlip: Story = {
  tags: ['layout-boundary', 'visual-review'],
  render: (args) => (
    <div
      style={{
        alignItems: 'flex-end',
        display: 'flex',
        justifyContent: 'flex-end',
        minHeight: '100vh',
        padding: '1rem',
      }}
    >
      <ActionMenu
        {...args}
        align="end"
        defaultOpen
        triggerLabel="Ações no limite"
      />
    </div>
  ),
}

export const Loading: Story = {
  tags: ['visual-review'],
  render: (args) => (
    <div style={centered}>
      <ActionMenu
        {...args}
        defaultOpen
        items={[
          {
            isLoading: true,
            id: 'loading',
            label: 'Atualizando cadastro',
            onSelect: () => undefined,
          },
          {
            disabled: true,
            id: 'disabled',
            label: 'Ação temporariamente indisponível',
            onSelect: () => undefined,
          },
        ]}
        triggerLabel="Ações em processamento"
      />
    </div>
  ),
}

export const StressLongLabels: Story = {
  tags: ['layout-boundary', 'visual-review'],
  render: (args) => (
    <div style={centered}>
      <ActionMenu
        {...args}
        align="start"
        defaultOpen
        items={[
          {
            icon: <StoryIcon />,
            id: 'long-neutral',
            label:
              'Reenviar o link de cadastro para a pessoa responsável com uma descrição localizada extensa',
            onSelect: () => undefined,
          },
          {
            icon: <StoryIcon kind="square" />,
            id: 'long-danger',
            label:
              'Arquivar definitivamente este registro operacional depois da confirmação',
            onSelect: () => undefined,
            tone: 'danger',
          },
        ]}
        triggerLabel="Mais ações para um registro com nome muito longo"
      />
    </div>
  ),
}
