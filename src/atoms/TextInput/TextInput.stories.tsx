import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryStack } from '../../../.storybook/fixtures'
import { TextInput } from '.'

const meta = {
  args: {
    'aria-label': 'Nome',
    defaultValue: 'Maria Alves',
    size: 'md',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  component: TextInput,
  title: 'Atoms/Fields/TextInput',
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const States: Story = {
  render: () => (
    <StoryStack>
      <TextInput aria-label="Nome vazio" placeholder="Digite o nome" />
      <TextInput
        aria-label="Nome inválido"
        aria-invalid="true"
        defaultValue="Valor inválido"
      />
      <TextInput aria-label="Nome indisponível" disabled />
    </StoryStack>
  ),
}

export const Stress: Story = {
  tags: ['layout-boundary', 'visual-review'],
  args: {
    defaultValue:
      'umvalorcontinuomuitolongosemespacos000000000000000000000000000000000',
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '0 auto', maxWidth: 280, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
}
