import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryStack } from '../../../.storybook/fixtures'
import { TextareaInput } from '.'

const meta = {
  args: {
    'aria-label': 'Notas',
    defaultValue: 'Objetivos da próxima aula',
    size: 'md',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  component: TextareaInput,
  title: 'Atoms/Fields/TextareaInput',
} satisfies Meta<typeof TextareaInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const States: Story = {
  render: () => (
    <StoryStack>
      <TextareaInput aria-label="Notas vazias" placeholder="Digite as notas" />
      <TextareaInput
        aria-label="Notas inválidas"
        aria-invalid="true"
        defaultValue="Valor inválido"
      />
      <TextareaInput aria-label="Notas indisponíveis" disabled />
    </StoryStack>
  ),
}
