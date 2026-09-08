import type { Meta, StoryObj } from '@storybook/react-vite'
import { NarrowSurface, StoryStack } from '../../../.storybook/fixtures'
import { IconButton } from '../../atoms/IconButton'
import { MessageThreadHeader } from '.'

const backIcon = (
  <svg aria-hidden="true" height="18" viewBox="0 0 24 24" width="18">
    <path
      d="m15 18-6-6 6-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
)

const moreIcon = (
  <svg aria-hidden="true" height="18" viewBox="0 0 24 24" width="18">
    <circle cx="5" cy="12" fill="currentColor" r="1.5" />
    <circle cx="12" cy="12" fill="currentColor" r="1.5" />
    <circle cx="19" cy="12" fill="currentColor" r="1.5" />
  </svg>
)

const participantPhoto =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23ffe1ec'/%3E%3Ccircle cx='32' cy='24' r='12' fill='%23cc0f45'/%3E%3Cpath d='M12 62c2-14 10-22 20-22s18 8 20 22' fill='%23cc0f45'/%3E%3C/svg%3E"

const meta = {
  args: {
    initials: 'MF',
    subtitle: 'Mensagens ficam registradas na Langy.space.',
    title: 'Maria Fernanda',
  },
  component: MessageThreadHeader,
  title: 'Molecules/Messaging/MessageThreadHeader',
} satisfies Meta<typeof MessageThreadHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPhoto: Story = {
  args: { imageUrl: participantPhoto },
  tags: ['visual-review'],
}

export const FallbackAndActions: Story = {
  args: {
    imageUrl: 'https://example.invalid/broken-participant.jpg',
    leadingAction: (
      <IconButton aria-label="Voltar" size="sm" variant="neutral">
        {backIcon}
      </IconButton>
    ),
    trailingAction: (
      <IconButton aria-label="Mais opções" size="sm" variant="subtle">
        {moreIcon}
      </IconButton>
    ),
  },
  tags: ['visual-review'],
}

export const IdentityExtremes: Story = {
  render: () => (
    <NarrowSurface>
      <StoryStack>
        <section aria-label="Identidade curta">
          <MessageThreadHeader initials="A" title="Ana" />
        </section>
        <section aria-label="Identidade longa">
          <MessageThreadHeader
            initials="PC"
            subtitle="Disponível para acompanhar dúvidas sobre suas lições e seu plano de estudos."
            title="ProfessoraComUmNomeExtremamenteLongoSemEspacosParaTestarTruncamento"
            trailingAction={
              <IconButton aria-label="Mais opções" size="sm" variant="subtle">
                {moreIcon}
              </IconButton>
            }
          />
        </section>
      </StoryStack>
    </NarrowSurface>
  ),
  tags: ['messaging-boundary', 'visual-review'],
}
