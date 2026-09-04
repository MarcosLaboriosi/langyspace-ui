import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { TextInput } from '../../atoms/TextInput'
import { FieldRoot } from '.'

const meta = {
  args: {
    children: <TextInput defaultValue="Maria Alves" />,
    label: 'Nome completo',
  },
  argTypes: {
    children: { control: false },
  },
  component: FieldRoot,
  decorators: [
    (Story) => (
      <div style={{ margin: '0 auto', maxWidth: 480, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Compõe label, hint e error com um control nativo do package, sem adapter de formulário.',
      },
    },
  },
  title: 'Molecules/Fields/FieldRoot',
} satisfies Meta<typeof FieldRoot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHint: Story = {
  args: { hint: 'Use o nome completo exibido no documento.' },
}

export const EyebrowLabel: Story = {
  args: { labelVariant: 'eyebrow' },
  play: async ({ canvas }) => {
    const label = canvas.getByText('Nome completo')
    const styles = window.getComputedStyle(label)

    await expect(styles.fontWeight).toBe('600')
    await expect(styles.letterSpacing).toBe('0.96px')
    await expect(styles.lineHeight).toBe('18px')
    await expect(styles.textTransform).toBe('uppercase')
  },
  tags: ['visual-review'],
}

export const Invalid: Story = {
  args: {
    error: 'Revise este valor antes de continuar.',
    hint: 'Use o nome completo exibido no documento.',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: 'Nome completo' })
    const error = canvas.getByRole('alert')
    const hint = canvas.getByText('Use o nome completo exibido no documento.')

    await expect(input).toHaveAttribute('aria-invalid', 'true')
    await expect(input).toHaveAttribute(
      'aria-describedby',
      `${hint.id} ${error.id}`,
    )
    await expect(error).toHaveTextContent(
      'Revise este valor antes de continuar.',
    )
  },
}

export const Stress: Story = {
  tags: ['layout-boundary', 'visual-review'],
  args: {
    children: (
      <TextInput defaultValue="umvalorcontinuomuitolongosemespacos000000000000000000000000" />
    ),
    error:
      'Este campo possui uma mensagem longa para comprovar contenção e associação acessível.',
    hint: 'O texto de ajuda continua disponível junto da mensagem de erro.',
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '0 auto', maxWidth: 280, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
}
