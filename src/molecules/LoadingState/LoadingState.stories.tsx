import type { Meta, StoryObj } from '@storybook/react-vite'
import { LoadingState } from '.'

const meta = {
  args: {
    description: 'Isso pode levar alguns segundos.',
    title: 'Carregando conteúdo',
  },
  component: LoadingState,
  title: 'Molecules/State/LoadingState',
} satisfies Meta<typeof LoadingState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Compact: Story = {
  args: { density: 'compact', description: undefined },
}

export const Fill: Story = {
  args: { fill: true },
}
