import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { StoryStack } from '../../../.storybook/fixtures'
import { TextInput } from '../../atoms/TextInput'
import { CompoundControl } from '.'

const meta = {
  args: {
    children: <TextInput aria-label="Valor" defaultValue="480,00" />,
    leading: <span>R$</span>,
    size: 'md',
    surface: 'surface',
    trailing: <span>BRL</span>,
  },
  argTypes: {
    children: { control: false },
    leading: { control: false },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    surface: { control: 'inline-radio', options: ['surface', 'muted'] },
    trailing: { control: false },
  },
  component: CompoundControl,
  title: 'Molecules/Fields/CompoundControl',
} satisfies Meta<typeof CompoundControl>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const States: Story = {
  tags: ['visual-review'],
  render: () => (
    <StoryStack>
      <CompoundControl leading={<span>R$</span>}>
        <TextInput aria-label="Valor disponível" defaultValue="480,00" />
      </CompoundControl>
      <CompoundControl invalid leading={<span>R$</span>}>
        <TextInput aria-label="Valor inválido" defaultValue="0,00" />
      </CompoundControl>
      <CompoundControl disabled leading={<span>R$</span>}>
        <TextInput aria-label="Valor indisponível" />
      </CompoundControl>
    </StoryStack>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('textbox', { name: 'Valor inválido' }),
    ).toHaveAttribute('aria-invalid', 'true')
    await expect(
      canvas.getByRole('textbox', { name: 'Valor indisponível' }),
    ).toBeDisabled()
  },
}
