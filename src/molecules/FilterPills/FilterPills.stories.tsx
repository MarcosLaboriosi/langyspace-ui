import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect } from 'storybook/test'
import { NarrowSurface } from '../../../.storybook/fixtures'
import { FilterPills } from '.'

const options = [
  { label: 'Todos', value: 'all' },
  { label: 'Ativos', value: 'active' },
  { label: 'Pendentes', value: 'pending' },
  { disabled: true, label: 'Arquivados', value: 'archived' },
] as const

function FilterExample({
  overflow = 'scroll',
}: {
  overflow?: 'scroll' | 'wrap'
}) {
  const [value, setValue] = useState<(typeof options)[number]['value']>('all')

  return (
    <FilterPills
      aria-label="Filtrar alunos"
      counts={{ active: 18, pending: 4 }}
      onChange={setValue}
      options={options}
      overflow={overflow}
      value={value}
    />
  )
}

const meta = {
  args: {
    'aria-label': 'Filtrar alunos',
    onChange: () => undefined,
    options,
    overflow: 'scroll',
    size: 'md',
    value: 'all',
  },
  argTypes: {
    options: { control: false },
    overflow: { control: 'inline-radio', options: ['scroll', 'wrap'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
  component: FilterPills,
  title: 'Molecules/Selection/FilterPills',
} satisfies Meta<typeof FilterPills>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  render: () => <FilterExample />,
  play: async ({ canvas, userEvent }) => {
    const all = canvas.getByRole('button', { name: 'Todos' })
    const active = canvas.getByRole('button', { name: 'Ativos: 18' })
    const archived = canvas.getByRole('button', { name: 'Arquivados' })

    await expect(all).toHaveAttribute('aria-pressed', 'true')
    await userEvent.click(active)
    await expect(active).toHaveAttribute('aria-pressed', 'true')
    await expect(all).toHaveAttribute('aria-pressed', 'false')

    await userEvent.keyboard('{Tab}{Enter}')
    await expect(
      canvas.getByRole('button', { name: 'Pendentes: 4' }),
    ).toHaveAttribute('aria-pressed', 'true')
    await expect(archived).toBeDisabled()
  },
}

export const NarrowScroll: Story = {
  tags: ['layout-boundary', 'visual-review'],
  decorators: [
    (Story) => (
      <NarrowSurface>
        <Story />
      </NarrowSurface>
    ),
  ],
  render: () => <FilterExample />,
}

export const Wrapped: Story = {
  tags: ['layout-boundary'],
  render: () => <FilterExample overflow="wrap" />,
}
