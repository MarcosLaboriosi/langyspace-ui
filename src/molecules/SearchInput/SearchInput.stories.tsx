import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect } from 'storybook/test'
import { NarrowSurface, StoryStack } from '../../../.storybook/fixtures'
import { SearchInput } from '.'

function SearchExample({ initialValue = 'Maria' }: { initialValue?: string }) {
  const [value, setValue] = useState(initialValue)

  return (
    <SearchInput
      aria-label="Buscar aluno"
      clearLabel="Limpar busca"
      onClear={() => setValue('')}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  )
}

const meta = {
  args: {
    'aria-label': 'Buscar aluno',
    defaultValue: 'Maria',
    size: 'md',
    surface: 'surface',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    surface: { control: 'inline-radio', options: ['surface', 'muted'] },
  },
  component: SearchInput,
  title: 'Molecules/Fields/SearchInput',
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InteractiveClear: Story = {
  render: () => <SearchExample />,
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('searchbox', { name: 'Buscar aluno' })

    await expect(input).toHaveValue('Maria')
    await userEvent.type(input, ' Silva')
    await expect(input).toHaveValue('Maria Silva')
    await userEvent.click(canvas.getByRole('button', { name: 'Limpar busca' }))
    await expect(input).toHaveValue('')
    await expect(input).toHaveFocus()
    await expect(
      canvas.queryByRole('button', { name: 'Limpar busca' }),
    ).not.toBeInTheDocument()
  },
}

export const States: Story = {
  render: () => (
    <StoryStack>
      <SearchInput aria-label="Busca vazia" placeholder="Buscar" />
      <SearchInput aria-label="Busca indisponível" disabled value="Maria" />
    </StoryStack>
  ),
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
    <SearchExample initialValue="umabuscaextremamentelongasemespaços000000000000000000" />
  ),
}
