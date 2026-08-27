import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormProvider, useForm } from 'react-hook-form'
import { expect } from 'storybook/test'
import { NarrowSurface } from '../../../.storybook/fixtures'
import { ControlledField } from '.'
import type { ControlledFieldProps } from './types'

interface FormValues {
  email: string
}

type ExampleProps = Omit<ControlledFieldProps<FormValues>, 'name'> & {
  initialValue?: string
}

function ControlledFieldExample({ initialValue = '', ...props }: ExampleProps) {
  const methods = useForm<FormValues>({
    defaultValues: { email: initialValue },
  })

  return (
    <FormProvider {...methods}>
      <ControlledField<FormValues> {...props} name="email" />
    </FormProvider>
  )
}

const meta = {
  args: {
    hint: 'Use o e-mail principal da conta.',
    label: 'E-mail',
    placeholder: 'nome@exemplo.com',
    type: 'email',
  },
  component: ControlledFieldExample,
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
          'Adapter opcional que conecta react-hook-form ao FieldRoot e TextInput compartilhados.',
      },
    },
  },
  title: 'Molecules/Fields/ControlledField',
} satisfies Meta<typeof ControlledFieldExample>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox', { name: 'E-mail' })
    await userEvent.type(input, 'maria@example.com')
    await expect(input).toHaveValue('maria@example.com')
  },
}

export const Invalid: Story = {
  args: { error: 'E-mail já cadastrado', initialValue: 'maria@example.com' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toHaveTextContent(
      'E-mail já cadastrado',
    )
    await expect(
      canvas.getByRole('textbox', { name: 'E-mail' }),
    ).toHaveAttribute('aria-invalid', 'true')
  },
}

export const Stress: Story = {
  args: {
    error:
      'Este e-mail precisa ser revisado antes de continuar para evitar perda de acesso à conta.',
    hint: 'A confirmação será enviada para o endereço informado.',
    initialValue:
      'umenderecoextremamentelongosemquebras000000000000000000000@example.com',
  },
  decorators: [
    (Story) => (
      <NarrowSurface>
        <Story />
      </NarrowSurface>
    ),
  ],
  tags: ['layout-boundary', 'visual-review'],
}
