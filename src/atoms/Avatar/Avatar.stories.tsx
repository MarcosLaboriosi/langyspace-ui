import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import {
  DarkSurface,
  NarrowSurface,
  StoryRow,
  StoryStack,
} from '../../../.storybook/fixtures'
import { Avatar } from '.'

const syntheticImage =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect width="64" height="64" fill="%23ffe1ec"/%3E%3Ccircle cx="32" cy="25" r="12" fill="%23cc0f45"/%3E%3Cpath d="M12 64c2-15 9-23 20-23s18 8 20 23" fill="%23cc0f45"/%3E%3C/svg%3E'

const meta = {
  args: {
    initials: 'LS',
    size: 'md',
    tone: 'neutral',
  },
  argTypes: {
    imageUrl: { control: false },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    tone: {
      control: 'inline-radio',
      options: ['neutral', 'brand', 'inverse'],
    },
  },
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'Identidade visual decorativa com initials, imagem opcional, fallback e recipe fechado.',
      },
    },
  },
  title: 'Atoms/Identity/Avatar',
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  tags: ['visual-review'],
  render: () => (
    <StoryRow>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Avatar initials={size.toUpperCase()} key={size} size={size} />
      ))}
    </StoryRow>
  ),
}

export const Tones: Story = {
  tags: ['visual-review'],
  render: () => (
    <StoryStack>
      <StoryRow>
        <Avatar initials="NE" tone="neutral" />
        <Avatar initials="BR" tone="brand" />
      </StoryRow>
      <DarkSurface>
        <StoryRow>
          <Avatar initials="IN" tone="inverse" />
        </StoryRow>
      </DarkSurface>
    </StoryStack>
  ),
}

export const WithImage: Story = {
  tags: ['visual-review'],
  args: {
    imageUrl: syntheticImage,
    initials: 'IM',
    size: 'xl',
  },
  play: async ({ canvasElement }) => {
    const image = canvasElement.querySelector('img')

    await expect(image).not.toBeNull()
    await expect(image).toHaveAttribute('alt', '')
  },
}

export const ImageFailure: Story = {
  tags: ['visual-review'],
  args: {
    initials: 'FB',
    size: 'lg',
    tone: 'brand',
  },
}

export const Stress: Story = {
  tags: ['layout-boundary', 'visual-review'],
  decorators: [
    (Story) => (
      <NarrowSurface>
        <Story />
      </NarrowSurface>
    ),
  ],
  render: () => (
    <StoryRow style={{ flexWrap: 'nowrap', justifyContent: 'flex-start' }}>
      <Avatar initials="MFA" />
      <span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
        Maria Fernanda de Albuquerque Nogueira Vasconcelos com identidade
        operacional extensa
      </span>
    </StoryRow>
  ),
}
