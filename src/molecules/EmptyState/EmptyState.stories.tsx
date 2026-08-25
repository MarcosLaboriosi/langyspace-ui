import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../../atoms/Button'
import { EmptyState } from '.'

const meta = {
  args: {
    description: 'Adicione o primeiro item para começar.',
    title: 'Nenhum resultado',
  },
  argTypes: {
    action: { control: false },
    icon: { control: false },
  },
  component: EmptyState,
  title: 'Molecules/State/EmptyState',
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAction: Story = {
  args: { action: <Button size="sm">Adicionar item</Button> },
}

export const Stress: Story = {
  tags: ['layout-boundary', 'visual-review'],
  args: {
    description:
      'Nenhum resultado corresponde aos filtros selecionados. Revise todas as condições ou limpe a busca para continuar.',
    fill: true,
    title: 'Nenhum resultado encontrado para esta combinação de filtros',
  },
}
