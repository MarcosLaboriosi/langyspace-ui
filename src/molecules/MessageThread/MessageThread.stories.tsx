import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { styled } from 'styled-components'
import { EmptyState } from '../EmptyState'
import { MessageBubble } from '../MessageBubble'
import { MessageComposer } from '../MessageComposer'
import { StatePanel } from '../StatePanel'
import { tokens } from '../../foundations/tokens'
import { MessageThreadHeader } from '../MessageThreadHeader'
import { MessageThread } from '.'

const sendIcon = (
  <svg aria-hidden="true" height="18" viewBox="0 0 24 24" width="18">
    <path
      d="m4 4 17 8-17 8 3-8-3-8Zm3 8h14"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
)

const participantPhoto =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23ffe1ec'/%3E%3Ccircle cx='32' cy='24' r='12' fill='%23cc0f45'/%3E%3Cpath d='M12 62c2-14 10-22 20-22s18 8 20 22' fill='%23cc0f45'/%3E%3C/svg%3E"

const ThreadSurface = styled.div<{ $short?: boolean }>`
  width: min(calc(100% - ${tokens.spacing[8]}), 56rem);
  height: ${({ $short }) => ($short ? '21rem' : '40rem')};
  min-width: 0;
  min-height: 0;
  margin: ${tokens.spacing[4]} auto;
`

const MessageList = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: ${tokens.spacing[3]};
`

const Notice = styled.div`
  margin-bottom: ${tokens.spacing[3]};
  color: ${tokens.color.content.secondary};
  font-size: ${tokens.typography.fontSize.sm};
  line-height: ${tokens.typography.lineHeight.normal};
`

const denseMessages = Array.from({ length: 18 }, (_, index) => ({
  incoming: index % 3 === 0,
  text:
    index === 7
      ? 'EsteConteudoLongoSemEspacosContinuaContidoDentroDaThreadMesmoEmUmaTelaEstreita'
      : index % 2 === 0
        ? 'Revisei a atividade e anotei uma nova dúvida.'
        : 'Perfeito! Podemos conversar sobre isso na próxima aula.',
  time: `10:${String(index).padStart(2, '0')}`,
}))

function Composer({
  error,
  helperText = 'Até 1.000 caracteres',
  initialValue = '',
}: {
  error?: string
  helperText?: string
  initialValue?: string
}) {
  const [value, setValue] = useState(initialValue)

  return (
    <MessageComposer
      error={error}
      helperText={helperText}
      onSubmit={() => setValue('')}
      onValueChange={setValue}
      placeholder="Escreva uma mensagem"
      submitIcon={sendIcon}
      submitLabel="Enviar mensagem"
      textareaLabel="Mensagem para Maria Fernanda"
      value={value}
    />
  )
}

function ParticipantHeader({ withPhoto = false }: { withPhoto?: boolean }) {
  return (
    <MessageThreadHeader
      imageUrl={withPhoto ? participantPhoto : undefined}
      initials="MF"
      subtitle="Mensagens ficam registradas na Langy.space."
      title="Maria Fernanda"
    />
  )
}

const meta = {
  args: {
    children: null,
    header: null,
    viewportLabel: 'Histórico da conversa',
  },
  component: MessageThread,
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
  title: 'Molecules/Messaging/MessageThread',
} satisfies Meta<typeof MessageThread>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  render: () => (
    <ThreadSurface>
      <MessageThread
        aria-label="Conversa com Maria Fernanda"
        footer={<Composer />}
        header={<ParticipantHeader />}
        viewportLabel="Histórico da conversa com Maria Fernanda"
      >
        <EmptyState
          description="Escreva uma mensagem para iniciar a conversa por aqui."
          fill
          title="Comece a conversa"
        />
      </MessageThread>
    </ThreadSurface>
  ),
  tags: ['visual-review'],
}

export const DenseWithPhoto: Story = {
  render: () => (
    <ThreadSurface>
      <MessageThread
        aria-label="Conversa com Maria Fernanda"
        footer={
          <Composer initialValue="Posso confirmar o exercício da próxima aula?" />
        }
        header={<ParticipantHeader withPhoto />}
        viewportLabel="Histórico da conversa com Maria Fernanda"
      >
        <MessageList role="log">
          {denseMessages.map((message, index) =>
            message.incoming ? (
              <MessageBubble key={index} timestamp={message.time}>
                {message.text}
              </MessageBubble>
            ) : (
              <MessageBubble
                key={index}
                side="outgoing"
                status="sent"
                statusLabel="Enviada"
                timestamp={message.time}
              >
                {message.text}
              </MessageBubble>
            ),
          )}
        </MessageList>
      </MessageThread>
    </ThreadSurface>
  ),
  tags: ['messaging-boundary', 'visual-review'],
  play: async ({ canvas }) => {
    const viewport = canvas.getByRole('region', {
      name: 'Histórico da conversa com Maria Fernanda',
    })
    const style = getComputedStyle(viewport)

    expect(style.overflowY).toBe('auto')
    expect(style.scrollbarWidth).toBe('none')
    viewport.scrollTop = 64
    viewport.dispatchEvent(new Event('scroll', { bubbles: true }))
    expect(viewport.scrollTop).toBe(64)
    viewport.scrollTop = 0
  },
}

export const Offline: Story = {
  render: () => (
    <ThreadSurface>
      <MessageThread
        aria-label="Conversa offline"
        footer={
          <>
            <Notice role="status">
              Você está offline. Seu rascunho continua aqui enquanto reconecta.
            </Notice>
            <Composer initialValue="Minha dúvida continua salva." />
          </>
        }
        header={<ParticipantHeader />}
        viewportLabel="Histórico offline"
      >
        <MessageList role="log">
          <MessageBubble timestamp="10:30">
            A conversa continua disponível.
          </MessageBubble>
          <MessageBubble
            side="outgoing"
            status="sent"
            statusLabel="Enviada"
            timestamp="10:31"
          >
            Vou revisar enquanto isso.
          </MessageBubble>
        </MessageList>
      </MessageThread>
    </ThreadSurface>
  ),
  tags: ['visual-review'],
}

export const Error: Story = {
  render: () => (
    <ThreadSurface>
      <MessageThread
        aria-label="Conversa com erro"
        footer={
          <Composer
            error="Não foi possível enviar. Confira sua conexão e tente novamente."
            initialValue="Tento novamente quando a conexão voltar."
          />
        }
        header={<ParticipantHeader />}
        viewportLabel="Histórico com erro"
      >
        <StatePanel
          density="compact"
          description="As mensagens mais recentes podem estar indisponíveis."
          state="error"
          title="A conversa não foi atualizada"
        />
      </MessageThread>
    </ThreadSurface>
  ),
  tags: ['visual-review'],
}

export const ShortHeight: Story = {
  render: () => (
    <ThreadSurface $short>
      <MessageThread
        aria-label="Conversa em viewport baixo"
        footer={
          <Composer
            helperText="O composer permanece visível enquanto somente o histórico rola."
            initialValue={'Primeira linha\nSegunda linha\nTerceira linha'}
          />
        }
        header={<ParticipantHeader withPhoto />}
        viewportLabel="Histórico em viewport baixo"
      >
        <MessageList role="log">
          {denseMessages.slice(0, 8).map((message, index) => (
            <MessageBubble
              key={index}
              side={message.incoming ? 'incoming' : 'outgoing'}
              timestamp={message.time}
            >
              {message.text}
            </MessageBubble>
          ))}
        </MessageList>
      </MessageThread>
    </ThreadSurface>
  ),
  tags: ['messaging-boundary', 'short-viewport', 'visual-review'],
}
