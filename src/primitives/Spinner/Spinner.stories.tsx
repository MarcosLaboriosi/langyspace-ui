import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryRow } from '../../../.storybook/fixtures'
import { Spinner } from '.'

const meta = {
  args: { size: 'inherit' },
  argTypes: {
    size: { control: 'inline-radio', options: ['inherit', 'sm', 'md', 'lg'] },
  },
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component:
          'Indicador decorativo em currentColor. O container possui copy e status acessível.',
      },
    },
  },
  title: 'Primitives/Spinner',
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <StoryRow>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </StoryRow>
  ),
}

export const AccessibleComposition: Story = {
  render: () => (
    <span aria-live="polite">
      <Spinner size="md" /> Carregando aulas
    </span>
  ),
}
