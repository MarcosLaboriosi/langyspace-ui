import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryStack } from '../../../.storybook/fixtures'
import { Button } from '../../atoms/Button'
import { StatePanel } from '.'

const meta = {
  args: {
    description: 'Adicione o primeiro item para começar.',
    state: 'empty',
    title: 'Nenhum resultado',
  },
  argTypes: {
    action: { control: false },
    icon: { control: false },
    state: {
      control: 'inline-radio',
      options: ['empty', 'error', 'loading', 'partial'],
    },
    surface: { control: 'inline-radio', options: ['outlined', 'dashed'] },
  },
  component: StatePanel,
  title: 'Molecules/State/StatePanel',
} satisfies Meta<typeof StatePanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const States: Story = {
  tags: ['visual-review'],
  render: () => (
    <StoryStack>
      <StatePanel state="empty" title="Nenhum resultado" />
      <StatePanel
        action={<Button size="sm">Tentar novamente</Button>}
        description="Confira sua conexão."
        state="error"
        title="Não foi possível carregar"
      />
      <StatePanel state="loading" title="Carregando conteúdo" />
      <StatePanel state="partial" title="Resultado parcial" />
    </StoryStack>
  ),
}

export const Stress: Story = {
  tags: ['layout-boundary', 'visual-review'],
  args: {
    description:
      'Parte das informações foi carregada, mas existem dados adicionais que ainda não puderam ser exibidos nesta superfície.',
    fill: true,
    state: 'partial',
    title: 'Algumas informações continuam temporariamente indisponíveis',
  },
}
