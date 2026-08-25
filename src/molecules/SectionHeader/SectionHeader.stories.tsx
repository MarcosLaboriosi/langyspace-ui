import type { Meta, StoryObj } from '@storybook/react-vite'
import { NarrowSurface } from '../../../.storybook/fixtures'
import { Button } from '../../atoms/Button'
import { SectionHeader } from '.'

const meta = {
  args: {
    meta: '4 itens',
    title: 'Fila operacional',
  },
  argTypes: {
    actions: { control: false },
    headingLevel: { control: 'inline-radio', options: [2, 3, 4] },
    spacing: { control: 'inline-radio', options: ['default', 'flush'] },
  },
  component: SectionHeader,
  title: 'Molecules/Layout/SectionHeader',
} satisfies Meta<typeof SectionHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAction: Story = {
  tags: ['visual-review'],
  args: {
    actions: (
      <Button size="sm" variant="secondary">
        Ver detalhes
      </Button>
    ),
  },
}

export const HeadingLevel: Story = {
  args: {
    headingLevel: 3,
    title: 'Relações da cobrança',
  },
}

export const NarrowStress: Story = {
  tags: ['layout-boundary', 'visual-review'],
  decorators: [
    (Story) => (
      <NarrowSurface>
        <Story />
      </NarrowSurface>
    ),
  ],
  args: {
    actions: (
      <Button size="sm" variant="secondary">
        Abrir informações completas
      </Button>
    ),
    meta: '12 informações operacionais disponíveis',
    title: 'Acompanhamento detalhado das relações de cobrança',
  },
}
