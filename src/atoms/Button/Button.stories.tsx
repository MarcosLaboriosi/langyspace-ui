import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { ArrowIcon } from '../../../.storybook/fixtures'
import { Button } from '.'

const meta = {
  args: {
    children: 'Continuar',
    density: 'regular',
    fullWidth: false,
    isLoading: false,
    size: 'md',
    variant: 'primary',
  },
  argTypes: {
    density: { control: 'inline-radio', options: ['regular', 'compact'] },
    iconEnd: { control: false },
    iconStart: { control: false },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'brand',
        'danger',
        'success',
        'inverse',
      ],
    },
  },
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'Comando rotulado com hierarquia, tamanho e loading controlados pelo design system.',
      },
    },
  },
  title: 'Atoms/Actions/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcons: Story = {
  args: { iconEnd: ArrowIcon, iconStart: ArrowIcon },
}

export const Loading: Story = {
  args: { iconEnd: ArrowIcon, isLoading: true },
  tags: ['visual-review'],
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Continuar' })

    await expect(button).toBeDisabled()
    await expect(button).toHaveAttribute('aria-busy', 'true')
    await expect(button).toHaveAttribute('data-loading', 'true')
    await expect(button.querySelector('[aria-hidden="true"]')).not.toBeNull()
  },
}

export const Stress: Story = {
  tags: ['layout-boundary', 'visual-review'],
  args: {
    children:
      'Continuar com a configuração compartilhada de componentes Langy.space em todos os produtos',
    fullWidth: true,
    size: 'lg',
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '0 auto', maxWidth: 280, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
}
