import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryStack } from '../../../.storybook/fixtures'
import { SelectInput } from '.'

const meta = {
  args: {
    'aria-label': 'Nível',
    children: (
      <>
        <option value="b1">B1</option>
        <option value="b2">B2</option>
      </>
    ),
    defaultValue: 'b1',
    size: 'md',
  },
  argTypes: {
    children: { control: false },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  component: SelectInput,
  title: 'Atoms/Fields/SelectInput',
} satisfies Meta<typeof SelectInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const States: Story = {
  render: () => (
    <StoryStack>
      <SelectInput aria-label="Nível selecionado" defaultValue="b1">
        <option value="b1">B1</option>
      </SelectInput>
      <SelectInput aria-label="Nível inválido" aria-invalid="true">
        <option>Selecione</option>
      </SelectInput>
      <SelectInput aria-label="Nível indisponível" disabled>
        <option>Indisponível</option>
      </SelectInput>
    </StoryStack>
  ),
}
