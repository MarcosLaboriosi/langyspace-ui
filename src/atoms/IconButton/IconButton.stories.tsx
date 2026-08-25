import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { ArrowIcon, DarkSurface, StoryRow } from '../../../.storybook/fixtures'
import { IconButton } from '.'

const meta = {
  args: {
    'aria-label': 'Avançar',
    children: ArrowIcon,
    isLoading: false,
    shape: 'circle',
    size: 'md',
    variant: 'neutral',
  },
  argTypes: {
    children: { control: false },
    shape: { control: 'inline-radio', options: ['circle', 'rounded'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    variant: {
      control: 'select',
      options: ['neutral', 'subtle', 'brand', 'success', 'danger', 'inverse'],
    },
  },
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component:
          'Comando de glyph único com nome acessível obrigatório e loading que substitui o glyph.',
      },
    },
  },
  title: 'Atoms/Actions/IconButton',
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: () => (
    <StoryRow>
      {(['neutral', 'subtle', 'brand', 'success', 'danger'] as const).map(
        (variant) => (
          <IconButton
            aria-label={`Avançar ${variant}`}
            key={variant}
            variant={variant}
          >
            {ArrowIcon}
          </IconButton>
        ),
      )}
    </StoryRow>
  ),
}

export const Loading: Story = {
  args: { isLoading: true },
  tags: ['visual-review'],
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Avançar' })

    await expect(button).toBeDisabled()
    await expect(button).toHaveAttribute('aria-busy', 'true')
    await expect(button).toHaveAttribute('data-loading', 'true')
    await expect(button.querySelector('[aria-hidden="true"]')).not.toBeNull()
  },
}

export const Inverse: Story = {
  args: { variant: 'inverse' },
  tags: ['visual-review'],
  decorators: [
    (Story) => (
      <DarkSurface>
        <Story />
      </DarkSurface>
    ),
  ],
}
