import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { NarrowSurface, StoryStack } from '../../../.storybook/fixtures'
import { Button } from '../../atoms/Button'
import { AvailabilityCalendar } from '.'
import type {
  AvailabilityCalendarDay,
  AvailabilityCalendarProps,
} from './types'

const days: AvailabilityCalendarDay[] = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo',
].map((label, index) => ({
  id: `day-${index}`,
  label,
  dateLabel: `${14 + index}/09/2026`,
  slots: [
    { id: `${index}-09`, label: '09:00', available: true },
    {
      id: `${index}-10`,
      label: '10:00',
      available: false,
      unavailableReason: 'Indisponível',
    },
    { id: `${index}-11`, label: '11:00', available: true },
  ],
}))

function ControlledCalendar(props: AvailabilityCalendarProps) {
  const [selected, setSelected] = useState(props.selectedSlotIds)
  return (
    <AvailabilityCalendar
      {...props}
      selectedSlotIds={selected}
      selectionLabel={`${selected.length} horários selecionados`}
      onToggleSlot={(id) =>
        setSelected((current) =>
          current.includes(id)
            ? current.filter((item) => item !== id)
            : [...current, id],
        )
      }
    />
  )
}

const meta = {
  args: {
    days,
    label: 'Escolha os horários',
    helperText:
      'Selecione um horário disponível. Clique novamente para remover.',
    selectedSlotIds: [],
    onToggleSlot: () => undefined,
  },
  component: AvailabilityCalendar,
  title: 'Molecules/Scheduling/AvailabilityCalendar',
} satisfies Meta<typeof AvailabilityCalendar>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  tags: ['visual-review'],
  render: (args) => <ControlledCalendar {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const first = canvas.getByRole('button', {
      name: 'Segunda, 14/09/2026, 09:00',
    })
    await userEvent.tab()
    await expect(first).toHaveFocus()
    await userEvent.keyboard(' ')
    await expect(first).toHaveAttribute('aria-pressed', 'true')
    await userEvent.tab()
    await expect(
      canvas.getByRole('button', { name: 'Segunda, 14/09/2026, 11:00' }),
    ).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    await expect(canvas.getByText('2 horários selecionados')).toBeVisible()
    await userEvent.click(first)
    await expect(first).toHaveAttribute('aria-pressed', 'false')
  },
}
export const Selected: Story = {
  tags: ['visual-review'],
  args: {
    selectedSlotIds: ['0-09', '2-11'],
    selectionLabel: '2 horários selecionados',
  },
}
export const Narrow: Story = {
  tags: ['layout-boundary', 'visual-review'],
  render: (args) => (
    <NarrowSurface>
      <ControlledCalendar {...args} />
    </NarrowSurface>
  ),
}
export const Stress: Story = {
  tags: ['layout-boundary', 'visual-review'],
  args: {
    label:
      'Selecione múltiplos horários para reservar um compromisso recorrente',
    helperText:
      'Os horários desabilitados incluem o motivo da indisponibilidade. Os dados e a compatibilidade entre os horários são fornecidos pelo aplicativo.',
    selectionLabel: 'Seleção de horários recorrentes para o próximo período',
    days: [
      {
        id: 'long',
        label: 'Quarta-feira com descrição de disponibilidade prolongada',
        dateLabel: '16 de setembro de 2026',
        slots: [
          {
            id: 'long-disabled',
            label: '10:00–10:50',
            available: false,
            unavailableReason:
              'Nenhum recurso atende a todos os horários selecionados simultaneamente',
          },
          {
            id: 'long-selected',
            label: '14:00–14:50',
            available: false,
            unavailableReason:
              'A disponibilidade mudou; remova este horário para escolher outro',
          },
        ],
      },
    ],
    selectedSlotIds: ['long-selected'],
  },
}
export const States: Story = {
  tags: ['visual-review'],
  render: (args) => (
    <StoryStack>
      <AvailabilityCalendar
        {...args}
        label="Horários em carregamento"
        status="loading"
      />
      <AvailabilityCalendar
        {...args}
        label="Horários sem resultados"
        status="empty"
      />
      <AvailabilityCalendar
        {...args}
        label="Horários com falha"
        status="error"
        statusAction={<Button>Tentar novamente</Button>}
      />
    </StoryStack>
  ),
}
