import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect } from 'storybook/test'
import { DarkSurface, NarrowSurface } from '../../../.storybook/fixtures'
import { SegmentedControl } from '.'

const options = [
  { label: '7 dias', value: 7 },
  { label: '30 dias', value: 30 },
  { label: '90 dias', value: 90 },
] as const

const longOptions = [
  { label: 'Últimos 30 dias', value: 30 },
  { label: 'Últimos 90 dias', value: 90 },
  { label: 'Desde o início', value: 'all' },
] as const

function SegmentedExample({
  surface = 'light',
}: {
  surface?: 'inverse' | 'light'
}) {
  const [value, setValue] = useState<(typeof options)[number]['value']>(30)

  return (
    <SegmentedControl
      aria-label="Período do relatório"
      onChange={setValue}
      options={options}
      shape="pill"
      surface={surface}
      value={value}
    />
  )
}

const meta = {
  args: {
    'aria-label': 'Período do relatório',
    onChange: () => undefined,
    options,
    shape: 'rounded',
    surface: 'light',
    value: 30,
  },
  argTypes: {
    options: { control: false },
    shape: { control: 'inline-radio', options: ['pill', 'rounded'] },
    surface: { control: 'inline-radio', options: ['light', 'inverse'] },
  },
  component: SegmentedControl,
  title: 'Molecules/Selection/SegmentedControl',
} satisfies Meta<typeof SegmentedControl>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  render: () => <SegmentedExample />,
  play: async ({ canvas, userEvent }) => {
    const sevenDays = canvas.getByRole('button', { name: '7 dias' })
    const thirtyDays = canvas.getByRole('button', { name: '30 dias' })

    await expect(thirtyDays).toHaveAttribute('aria-pressed', 'true')
    await userEvent.click(sevenDays)
    await expect(sevenDays).toHaveAttribute('aria-pressed', 'true')
    await expect(thirtyDays).toHaveAttribute('aria-pressed', 'false')

    await userEvent.keyboard('{Tab}{Enter}')
    await expect(thirtyDays).toHaveAttribute('aria-pressed', 'true')
  },
}

export const Inverse: Story = {
  tags: ['visual-review'],
  decorators: [
    (Story) => (
      <DarkSurface>
        <Story />
      </DarkSurface>
    ),
  ],
  render: () => <SegmentedExample surface="inverse" />,
}

export const Narrow: Story = {
  tags: ['layout-boundary', 'visual-review'],
  decorators: [
    (Story) => (
      <NarrowSurface>
        <Story />
      </NarrowSurface>
    ),
  ],
  render: () => <SegmentedExample />,
}

export const NarrowLongLabels: Story = {
  tags: ['layout-boundary', 'visual-review'],
  decorators: [
    (Story) => (
      <NarrowSurface>
        <Story />
      </NarrowSurface>
    ),
  ],
  args: {
    'aria-label': 'Período detalhado do relatório',
    options: longOptions,
    value: 90,
  },
}
