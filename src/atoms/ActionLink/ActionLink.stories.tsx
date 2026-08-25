import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  ArrowIcon,
  NarrowSurface,
  StoryRow,
} from '../../../.storybook/fixtures'
import { ActionLink } from '.'

const meta = {
  args: {
    children: 'Continuar',
    href: '#destination',
    size: 'md',
    variant: 'primary',
  },
  argTypes: {
    iconEnd: { control: false },
    iconStart: { control: false },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'tertiary', 'brand'],
    },
  },
  component: ActionLink,
  parameters: {
    docs: {
      description: {
        component:
          'Navegação nativa por href com aparência de ação; não possui loading ou disabled.',
      },
    },
  },
  title: 'Atoms/Actions/ActionLink',
} satisfies Meta<typeof ActionLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: () => (
    <StoryRow>
      <ActionLink href="#primary">Principal</ActionLink>
      <ActionLink href="#secondary" variant="secondary">
        Secundária
      </ActionLink>
      <ActionLink href="#tertiary" variant="tertiary">
        Terciária
      </ActionLink>
      <ActionLink href="#brand" variant="brand">
        Começar agora
      </ActionLink>
    </StoryRow>
  ),
}

export const WithIcon: Story = {
  args: { iconEnd: ArrowIcon },
}

export const Stress: Story = {
  tags: ['layout-boundary', 'visual-review'],
  args: {
    children:
      'acaoprincipalcompartilhadaextremamentelongasemespaços000000000000000000000',
    fullWidth: true,
    size: 'lg',
  },
  decorators: [
    (Story) => (
      <NarrowSurface>
        <Story />
      </NarrowSurface>
    ),
  ],
}
