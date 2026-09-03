import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { NarrowSurface, StoryStack } from '../../../.storybook/fixtures'
import { MessageComposer } from '.'

const sendIcon = (
  <svg
    aria-hidden="true"
    fill="none"
    height="18"
    viewBox="0 0 24 24"
    width="18"
  >
    <path d="m4 4 17 8-17 8 3-8-3-8Z" stroke="currentColor" strokeWidth="2" />
    <path d="M7 12h14" stroke="currentColor" strokeWidth="2" />
  </svg>
)

function ComposerExample() {
  const [value, setValue] = useState('')

  return (
    <MessageComposer
      helperText="A professora responde assim que puder."
      onSubmit={() => setValue('')}
      onValueChange={setValue}
      placeholder="Escreva uma mensagem"
      submitIcon={sendIcon}
      submitLabel="Enviar mensagem"
      textareaLabel="Mensagem para a professora"
      value={value}
    />
  )
}

const meta = {
  args: {
    onSubmit: () => undefined,
    onValueChange: () => undefined,
    submitIcon: sendIcon,
    submitLabel: 'Enviar mensagem',
    textareaLabel: 'Mensagem',
    value: '',
  },
  component: MessageComposer,
  parameters: { controls: { disable: true } },
  title: 'Molecules/Messaging/MessageComposer',
} satisfies Meta<typeof MessageComposer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <ComposerExample />,
}

export const States: Story = {
  tags: ['visual-review'],
  render: () => (
    <StoryStack>
      <MessageComposer
        helperText="A professora responde assim que puder."
        onSubmit={() => undefined}
        onValueChange={() => undefined}
        placeholder="Escreva uma mensagem"
        submitIcon={sendIcon}
        submitLabel="Enviar mensagem"
        textareaLabel="Composer vazio"
        value=""
      />
      <MessageComposer
        disabled
        onSubmit={() => undefined}
        onValueChange={() => undefined}
        submitIcon={sendIcon}
        submitLabel="Enviar mensagem"
        textareaLabel="Composer indisponível"
        value="Canal temporariamente indisponível"
      />
      <MessageComposer
        isSubmitting
        onSubmit={() => undefined}
        onValueChange={() => undefined}
        submitIcon={sendIcon}
        submitLabel="Enviando mensagem"
        textareaLabel="Composer enviando"
        value="Até a aula!"
      />
      <MessageComposer
        error="Não foi possível enviar. Confira sua conexão e tente novamente."
        onSubmit={() => undefined}
        onValueChange={() => undefined}
        submitIcon={sendIcon}
        submitLabel="Tentar enviar novamente"
        textareaLabel="Composer com erro"
        value="Tento novamente quando a conexão voltar."
      />
    </StoryStack>
  ),
}

export const Stress: Story = {
  tags: ['layout-boundary', 'visual-review'],
  render: () => (
    <NarrowSurface>
      <MessageComposer
        error="Não foi possível enviar para esta conversa agora. O texto continua disponível para uma nova tentativa."
        helperText="Mensagem com emoji ✨, múltiplas linhas e um endereço-sem-espacos-que-nao-pode-aumentar-o-container."
        onSubmit={() => undefined}
        onValueChange={() => undefined}
        submitIcon={sendIcon}
        submitLabel="Enviar mensagem"
        textareaLabel="Mensagem longa"
        value={'Mensagem longa. '.repeat(67).trim()}
      />
    </NarrowSurface>
  ),
}
