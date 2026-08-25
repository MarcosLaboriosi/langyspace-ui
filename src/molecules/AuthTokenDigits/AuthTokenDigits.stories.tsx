import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect } from 'storybook/test'
import { AuthTokenDigits } from '.'
import type { AuthTokenDigitsProps } from './types'

function TokenExample(props: AuthTokenDigitsProps) {
  const [value, setValue] = useState(props.value ?? '')

  return (
    <AuthTokenDigits
      {...props}
      value={value}
      onTokenChange={(token) => {
        setValue(token)
        props.onTokenChange(token)
      }}
    />
  )
}

const meta = {
  args: {
    'aria-label': 'Código de confirmação',
    autoFocus: false,
    digitLabel: 'Dígito',
    hasError: false,
    idPrefix: 'storybook-token',
    length: 4,
    onTokenChange: () => undefined,
  },
  component: AuthTokenDigits,
  parameters: {
    docs: {
      description: {
        component:
          'Entrada segmentada de token; o fluxo de autenticação e a validação continuam no produto.',
      },
    },
  },
  render: (args) => <TokenExample {...args} />,
  title: 'Molecules/Auth/AuthTokenDigits',
} satisfies Meta<typeof AuthTokenDigits>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const inputs = canvas.getAllByRole('textbox')

    await userEvent.click(inputs[0])
    await userEvent.paste('12a34')
    await expect(inputs[0]).toHaveValue('1')
    await expect(inputs[1]).toHaveValue('2')
    await expect(inputs[2]).toHaveValue('3')
    await expect(inputs[3]).toHaveValue('4')
    await expect(inputs[3]).toHaveFocus()

    await userEvent.keyboard('{Backspace}{Backspace}')
    await expect(inputs[3]).toHaveValue('')
    await expect(inputs[2]).toHaveFocus()

    await userEvent.keyboard('{ArrowLeft}')
    await expect(inputs[1]).toHaveFocus()
    await userEvent.keyboard('{End}')
    await expect(inputs[3]).toHaveFocus()
    await userEvent.keyboard('{Home}')
    await expect(inputs[0]).toHaveFocus()
  },
}

export const Partial: Story = {
  args: { value: '12' },
}

export const Invalid: Story = {
  args: { hasError: true, value: '9876' },
}

export const SixDigits: Story = {
  args: { length: 6, value: '123' },
  tags: ['layout-boundary', 'visual-review'],
}
