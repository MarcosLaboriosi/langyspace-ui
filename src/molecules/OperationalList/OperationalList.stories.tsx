import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { styled } from 'styled-components'
import { expect, waitFor, within } from 'storybook/test'
import { Avatar } from '../../atoms/Avatar'
import { Button } from '../../atoms/Button'
import { StatusChip } from '../../atoms/StatusChip'
import { tokens } from '../../foundations/tokens'
import {
  OperationalList,
  type OperationalListColumn,
  type OperationalListItemAction,
  type OperationalListPrimaryColumn,
  type OperationalListSortDirection,
} from '.'

interface QueueItem {
  email: string
  id: string
  name: string
  nextAction: string
  owner: string
  priority: 'Alta' | 'Média' | 'Normal'
  source: string
  status: 'Novo' | 'Em contato' | 'Qualificado'
  value: string
}

function StoryIcon({ kind = 'message' }: { kind?: 'calendar' | 'message' }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
    >
      {kind === 'calendar' ? (
        <>
          <rect
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
            width="13"
            x="2.5"
            y="3.5"
          />
          <path d="M3 7h12M6 2v3M12 2v3" stroke="currentColor" />
        </>
      ) : (
        <path
          d="M3 3.5h12v8H8l-3.5 3v-3H3z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      )}
    </svg>
  )
}

const Page = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: ${tokens.spacing[6]};
  background: ${tokens.color.surface.muted};
`

const StoryContainer = styled.div<{ $maxWidth?: string }>`
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth ?? '90rem'};
  margin: 0 auto;
`

const StoryHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: ${tokens.spacing[3]};
  margin-bottom: ${tokens.spacing[4]};
`

const Heading = styled.h2`
  margin: 0;
  font-size: ${tokens.typography.fontSize.xl};
  line-height: ${tokens.typography.lineHeight.snug};
`

const Muted = styled.span`
  color: ${tokens.color.content.muted};
  font-size: ${tokens.typography.fontSize.sm};
`

const ScrollFixture = styled.div`
  max-height: 42rem;
  overflow: auto;
`

const queueItems: readonly QueueItem[] = [
  {
    email: 'ana.lima@example.com',
    id: 'lead-1042',
    name: 'Ana Lima',
    nextAction: 'Retornar hoje, 15:30',
    owner: 'Marina',
    priority: 'Alta',
    source: 'Instagram',
    status: 'Novo',
    value: 'R$ 289,00',
  },
  {
    email: 'beatriz.souza@example.com',
    id: 'lead-1043',
    name: 'Beatriz Souza',
    nextAction: 'Enviar proposta amanhã',
    owner: 'Rafael',
    priority: 'Média',
    source: 'Indicação',
    status: 'Em contato',
    value: 'R$ 349,00',
  },
  {
    email: 'caio.martins@example.com',
    id: 'lead-1044',
    name: 'Caio Martins',
    nextAction: 'Confirmar disponibilidade',
    owner: 'Marina',
    priority: 'Normal',
    source: 'Site',
    status: 'Qualificado',
    value: 'R$ 420,00',
  },
]

const primaryColumn = {
  label: 'Pessoa',
  render: (item: QueueItem) => ({
    description: item.email,
    leading: (
      <Avatar initials={item.name.slice(0, 2).toUpperCase()} size="sm" />
    ),
    meta: item.id,
    navigation: {
      label: `Abrir cadastro de ${item.name}`,
      onNavigate: () => undefined,
    },
    title: item.name,
  }),
} satisfies OperationalListPrimaryColumn<QueueItem>

const leadColumns = [
  {
    id: 'status',
    label: 'Status',
    render: (item: QueueItem) => (
      <StatusChip tone={item.status === 'Qualificado' ? 'success' : 'neutral'}>
        {item.status}
      </StatusChip>
    ),
  },
  {
    id: 'priority',
    label: 'Prioridade',
    render: (item: QueueItem) => item.priority,
  },
  {
    id: 'source',
    importance: 'tertiary',
    label: 'Origem',
    render: (item: QueueItem) => item.source,
  },
  {
    id: 'next-action',
    importance: 'secondary',
    label: 'Próxima ação',
    render: (item: QueueItem) => item.nextAction,
  },
] satisfies readonly OperationalListColumn<QueueItem>[]

const denseColumns = [
  ...leadColumns,
  {
    id: 'owner',
    importance: 'tertiary',
    label: 'Responsável',
    render: (item: QueueItem) => item.owner,
  },
  {
    align: 'end',
    id: 'value',
    label: 'Mensalidade',
    render: (item: QueueItem) => item.value,
  },
] satisfies readonly OperationalListColumn<QueueItem>[]

const rowActions = (item: QueueItem): readonly OperationalListItemAction[] => [
  {
    id: 'convert',
    label: 'Converter em aluna',
    onSelect: () => undefined,
    placement: 'primary',
    variant: 'secondary',
  },
  {
    icon: <StoryIcon />,
    id: 'message',
    label: `Falar com ${item.name}`,
    onSelect: () => undefined,
    placement: 'quick',
  },
  {
    icon: <StoryIcon kind="calendar" />,
    id: 'follow-up',
    label: `Agendar retorno para ${item.name}`,
    onSelect: () => undefined,
    placement: 'overflow',
  },
  {
    id: 'archive',
    label: `Arquivar cadastro de ${item.name}`,
    onSelect: () => undefined,
    placement: 'overflow',
    tone: 'danger',
  },
]

const QueueOperationalList = OperationalList<QueueItem>

const meta = {
  args: {
    'aria-label': 'Fila operacional de pessoas',
    columns: leadColumns,
    getItemKey: (item) => item.id,
    items: queueItems,
    primaryColumn,
  },
  component: QueueOperationalList,
  parameters: { layout: 'fullscreen' },
  title: 'Molecules/Data/OperationalList',
} satisfies Meta<typeof QueueOperationalList>

export default meta
type Story = StoryObj<typeof meta>

function ListFixture({
  columns = leadColumns,
  density = 'regular',
  getActions = rowActions,
  items = queueItems,
  maxWidth,
}: {
  columns?: readonly OperationalListColumn<QueueItem>[]
  density?: 'compact' | 'regular'
  getActions?: (item: QueueItem) => readonly OperationalListItemAction[]
  items?: readonly QueueItem[]
  maxWidth?: string
}) {
  return (
    <Page>
      <StoryContainer $maxWidth={maxWidth}>
        <StoryHeader>
          <div>
            <Heading>Fila operacional</Heading>
            <Muted>{items.length} registros no recorte atual</Muted>
          </div>
        </StoryHeader>
        <OperationalList
          aria-label="Fila operacional de pessoas"
          columns={columns}
          density={density}
          footer={<Muted>Dados sintéticos para validação visual</Muted>}
          getActions={getActions}
          getItemKey={(item) => item.id}
          items={items}
          primaryColumn={primaryColumn}
        />
      </StoryContainer>
    </Page>
  )
}

export const DefaultLeads: Story = {
  tags: ['visual-review'],
  render: () => <ListFixture />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement)
    await userEvent.click(
      canvas.getByRole('button', { name: 'Abrir cadastro de Ana Lima' }),
    )
    await expect(
      canvas.getByRole('table', { name: 'Fila operacional de pessoas' }),
    ).toBeInTheDocument()
  },
}

export const DenseStudents: Story = {
  tags: ['layout-boundary', 'visual-review'],
  render: () => (
    <ListFixture columns={denseColumns} density="compact" items={queueItems} />
  ),
}

function SortableFixture() {
  const [direction, setDirection] =
    useState<OperationalListSortDirection>('ascending')
  const sortablePrimary = {
    ...primaryColumn,
    sort: {
      direction,
      onToggle: () =>
        setDirection((current) =>
          current === 'ascending' ? 'descending' : 'ascending',
        ),
    },
  } satisfies OperationalListPrimaryColumn<QueueItem>

  return (
    <Page>
      <StoryContainer>
        <OperationalList
          aria-label="Fila ordenável"
          columns={leadColumns}
          getActions={rowActions}
          getItemKey={(item) => item.id}
          items={queueItems}
          primaryColumn={sortablePrimary}
        />
      </StoryContainer>
    </Page>
  )
}

export const Sortable: Story = {
  tags: ['layout-boundary', 'visual-review'],
  render: () => <SortableFixture />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement)
    const header = canvas.getByRole('columnheader', { name: 'Pessoa' })
    await expect(header).toHaveAttribute('aria-sort', 'ascending')
    await userEvent.click(within(header).getByRole('button'))
    await expect(header).toHaveAttribute('aria-sort', 'descending')
  },
}

export const ActionHierarchy: Story = {
  tags: ['visual-review'],
  render: () => <ListFixture items={queueItems.slice(0, 1)} />,
  play: async ({ canvasElement, userEvent }) => {
    const body = within(canvasElement.ownerDocument.body)
    await expect(
      body.getByRole('button', { name: 'Converter em aluna' }),
    ).toBeVisible()
    await expect(
      body.getByRole('button', { name: 'Falar com Ana Lima' }),
    ).toBeVisible()
    await userEvent.click(body.getByRole('button', { name: 'Mais ações' }))
    await waitFor(() => expect(body.getByRole('menu')).toBeVisible())
  },
}

export const DangerOverflow: Story = {
  tags: ['visual-review'],
  render: () => <ListFixture items={queueItems.slice(0, 1)} />,
  play: async ({ canvasElement, userEvent }) => {
    const body = within(canvasElement.ownerDocument.body)
    const trigger = body.getByRole('button', { name: 'Mais ações' })
    trigger.focus()
    await userEvent.keyboard('{ArrowUp}')
    await waitFor(() =>
      expect(
        body.getByRole('menuitem', {
          name: 'Arquivar cadastro de Ana Lima',
        }),
      ).toHaveFocus(),
    )
    await expect(body.getAllByRole('separator')).toHaveLength(1)
  },
}

export const DisabledAndLoading: Story = {
  tags: ['visual-review'],
  render: () => (
    <ListFixture
      getActions={(item) => [
        {
          id: 'convert',
          isLoading: true,
          label: 'Convertendo em aluna',
          onSelect: () => undefined,
          placement: 'primary',
        },
        {
          disabled: true,
          icon: <StoryIcon />,
          id: 'message',
          label: `Falar com ${item.name}`,
          onSelect: () => undefined,
          placement: 'quick',
        },
        {
          disabled: true,
          id: 'archive',
          label: `Arquivar cadastro de ${item.name}`,
          onSelect: () => undefined,
          placement: 'overflow',
          tone: 'danger',
        },
      ]}
      items={queueItems.slice(0, 1)}
    />
  ),
  play: async ({ canvasElement, userEvent }) => {
    const body = within(canvasElement.ownerDocument.body)
    await expect(
      body.getByRole('button', { name: 'Convertendo em aluna' }),
    ).toBeDisabled()
    await userEvent.click(body.getByRole('button', { name: 'Mais ações' }))
    await expect(
      body.getByRole('menuitem', { name: 'Arquivar cadastro de Ana Lima' }),
    ).toHaveAttribute('aria-disabled', 'true')
  },
}

export const Empty: Story = {
  tags: ['layout-boundary', 'visual-review'],
  render: () => (
    <Page>
      <StoryContainer>
        <OperationalList
          aria-label="Fila sem resultados"
          columns={leadColumns}
          emptyState={
            <div>
              <Heading>Nenhum registro neste recorte</Heading>
              <Muted>Remova os filtros ou atualize a busca.</Muted>
              <div style={{ marginTop: tokens.spacing[4] }}>
                <Button variant="secondary">Limpar filtros</Button>
              </div>
            </div>
          }
          footer={<Muted>0 resultados</Muted>}
          getItemKey={(item) => item.id}
          items={[]}
          primaryColumn={primaryColumn}
        />
      </StoryContainer>
    </Page>
  ),
}

export const NarrowCards: Story = {
  tags: ['layout-boundary', 'visual-review'],
  render: () => <ListFixture maxWidth="52rem" />,
}

export const LongLocalizedContent: Story = {
  tags: ['layout-boundary', 'visual-review'],
  render: () => (
    <ListFixture
      getActions={(item) => [
        ...rowActions(item),
        {
          id: 'long-action',
          label:
            'Reencaminhar todas as informações cadastrais para validação administrativa',
          onSelect: () => undefined,
          placement: 'overflow',
        },
      ]}
      items={[
        {
          ...queueItems[0],
          email:
            'responsavel.financeiro.com.nome.muito.extenso@instituicao-internacional.example.com',
          name: 'Ana Beatriz de Albuquerque e Vasconcelos Ferreira',
          nextAction:
            'Retornar quando a pessoa responsável concluir a validação documental internacional',
          source: 'Campanha internacional de indicação entre famílias',
        },
      ]}
      maxWidth="48rem"
    />
  ),
}

export const NoActions: Story = {
  tags: ['visual-review'],
  render: () => <ListFixture getActions={() => []} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.queryByRole('columnheader', { name: 'Ações' }),
    ).not.toBeInTheDocument()
  },
}

const fiftyRows = Array.from({ length: 50 }, (_, index): QueueItem => {
  const base = queueItems[index % queueItems.length]
  return {
    ...base,
    email: `pessoa.${index + 1}@example.com`,
    id: `queue-${String(index + 1).padStart(2, '0')}`,
    name: `Pessoa ${index + 1}`,
  }
})

export const FiftyRows: Story = {
  render: () => (
    <Page>
      <StoryContainer>
        <ScrollFixture>
          <OperationalList
            aria-label="Fila com cinquenta registros"
            columns={leadColumns}
            density="compact"
            getActions={(item) => rowActions(item)}
            getItemKey={(item) => item.id}
            items={fiftyRows}
            primaryColumn={primaryColumn}
          />
        </ScrollFixture>
      </StoryContainer>
    </Page>
  ),
  play: async ({ canvasElement, userEvent }) => {
    const body = within(canvasElement.ownerDocument.body)
    const triggers = body.getAllByRole('button', { name: 'Mais ações' })
    await userEvent.click(triggers[0])
    await userEvent.click(triggers[1])
    await waitFor(() => expect(body.getAllByRole('menu')).toHaveLength(1))
  },
}
