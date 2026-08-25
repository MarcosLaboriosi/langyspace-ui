import type { Meta, StoryObj } from '@storybook/react-vite'
import { NarrowSurface, StoryRow } from '../../../.storybook/fixtures'
import { StatusChip } from '.'

const meta = {
  args: {
    children: 'confirmado',
    indicator: true,
    size: 'md',
    tone: 'success',
  },
  argTypes: {
    iconStart: { control: false },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    tone: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'danger', 'brand'],
    },
  },
  component: StatusChip,
  title: 'Atoms/Feedback/StatusChip',
} satisfies Meta<typeof StatusChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Tones: Story = {
  render: () => (
    <StoryRow>
      {(
        ['neutral', 'info', 'success', 'warning', 'danger', 'brand'] as const
      ).map((tone) => (
        <StatusChip indicator key={tone} tone={tone}>
          {tone}
        </StatusChip>
      ))}
    </StoryRow>
  ),
}

export const Stress: Story = {
  tags: ['layout-boundary', 'visual-review'],
  args: {
    children:
      'pagamento confirmado com uma descrição operacional extremamente longa para o espaço',
  },
  decorators: [
    (Story) => (
      <NarrowSurface>
        <Story />
      </NarrowSurface>
    ),
  ],
}
