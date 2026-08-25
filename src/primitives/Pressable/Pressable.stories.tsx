import type { Meta, StoryObj } from '@storybook/react-vite'
import { styled } from 'styled-components'
import { Pressable } from '.'

const ExampleControl = styled(Pressable)`
  min-height: 2.5rem;
  border: 1px solid #d8d4cb;
  border-radius: 0.75rem;
  background: #ffffff;
  padding: 0.5rem 1rem;

  &:focus-visible {
    outline: 3px solid rgba(0, 242, 234, 0.45);
    outline-offset: 2px;
  }
`

const meta = {
  args: { children: 'Controle de domínio' },
  component: ExampleControl,
  parameters: {
    docs: {
      description: {
        component:
          'Primitive nativo sem recipe visual; o component de domínio possui semântica, styles e estados.',
      },
    },
  },
  title: 'Primitives/Pressable',
} satisfies Meta<typeof ExampleControl>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Pressed: Story = {
  args: { 'aria-pressed': true, children: 'Tradução ativa' },
}

export const Disabled: Story = {
  args: { children: 'Indisponível', disabled: true },
}
