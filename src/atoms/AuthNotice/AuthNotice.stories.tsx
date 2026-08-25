import type { Meta, StoryObj } from '@storybook/react-vite'
import { NarrowSurface, StoryStack } from '../../../.storybook/fixtures'
import { AuthNotice } from '.'

const meta = {
  args: { children: 'Código enviado para o canal confirmado.', tone: 'info' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['info', 'error'] },
  },
  component: AuthNotice,
  title: 'Atoms/Feedback/AuthNotice',
} satisfies Meta<typeof AuthNotice>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Tones: Story = {
  render: () => (
    <StoryStack>
      <AuthNotice tone="info">
        Código enviado para o canal confirmado.
      </AuthNotice>
      <AuthNotice role="alert" tone="error">
        O código informado expirou.
      </AuthNotice>
    </StoryStack>
  ),
}

export const Stress: Story = {
  tags: ['layout-boundary', 'visual-review'],
  args: {
    children:
      'O código não foi confirmado. Verifique as informações e solicite um novo envio antes de continuar.',
    tone: 'error',
  },
  decorators: [
    (Story) => (
      <NarrowSurface>
        <Story />
      </NarrowSurface>
    ),
  ],
}
