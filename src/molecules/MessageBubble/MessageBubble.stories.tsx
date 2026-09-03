import type { Meta, StoryObj } from '@storybook/react-vite'
import { NarrowSurface, StoryStack } from '../../../.storybook/fixtures'
import { MessageBubble } from '.'

const meta = {
  args: {
    children: 'A atividade de hoje já está disponível?',
    timestamp: '10:30',
  },
  argTypes: {
    side: { control: 'inline-radio', options: ['incoming', 'outgoing'] },
    status: {
      control: 'inline-radio',
      options: [undefined, 'sending', 'sent', 'failed'],
    },
  },
  component: MessageBubble,
  title: 'Molecules/Messaging/MessageBubble',
} satisfies Meta<typeof MessageBubble>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DeliveryStates: Story = {
  tags: ['visual-review'],
  render: () => (
    <StoryStack>
      <MessageBubble timestamp="10:30">
        Bom dia! Tudo certo para a aula?
      </MessageBubble>
      <MessageBubble side="outgoing" timestamp="10:31">
        Tudo certo, professora.
      </MessageBubble>
      <MessageBubble
        side="outgoing"
        status="sending"
        statusLabel="Enviando"
        timestamp="10:32"
      >
        Posso mandar uma dúvida antes?
      </MessageBubble>
      <MessageBubble
        side="outgoing"
        status="sent"
        statusLabel="Enviada"
        timestamp="10:33"
      >
        Obrigada!
      </MessageBubble>
      <MessageBubble
        side="outgoing"
        status="failed"
        statusLabel="Falha ao enviar"
        timestamp="10:34"
      >
        Tento novamente quando a conexão voltar.
      </MessageBubble>
    </StoryStack>
  ),
}

export const Stress: Story = {
  tags: ['layout-boundary', 'visual-review'],
  render: () => (
    <NarrowSurface>
      <StoryStack>
        <MessageBubble timestamp="23:59">
          Primeira linha.{`\n`}Segunda linha com emoji ✨ e
          https://student.langy.space/mensagens/conversa-sem-espacos-que-precisa-quebrar-sem-aumentar-o-container
        </MessageBubble>
        <MessageBubble
          side="outgoing"
          status="sent"
          statusLabel="Enviada"
          timestamp="23:59"
        >
          {'Mensagem longa. '.repeat(67).trim()}
        </MessageBubble>
      </StoryStack>
    </NarrowSurface>
  ),
}
