import type { Meta, StoryObj } from '@storybook/react-vite'
import { styled } from 'styled-components'
import { tokens } from './tokens'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
  width: min(100%, 60rem);
  margin: 0 auto;
`

const Swatch = styled.div<{ $color: string }>`
  min-width: 0;
  border: 1px solid ${tokens.color.surfaceBorder.default};
  border-radius: ${tokens.radius.control};
  overflow: hidden;
  background: ${tokens.color.neutral[0]};

  &::before {
    display: block;
    height: 5rem;
    background: ${({ $color }) => $color};
    content: '';
  }

  code {
    display: block;
    padding: ${tokens.spacing[3]};
    overflow-wrap: anywhere;
  }
`

function ColorTokens() {
  const colors = [
    ['content.default', tokens.color.content.default],
    ['content.secondary', tokens.color.content.secondary],
    ['surface.muted', tokens.color.surface.muted],
    ['brand.default', tokens.color.brand.default],
    ['feedback.success', tokens.color.feedback.success],
    ['status.warning.indicator', tokens.color.status.warning.indicator],
    ['feedback.danger', tokens.color.feedback.danger],
    ['feedback.info', tokens.color.feedback.info],
  ] as const

  return (
    <Grid>
      {colors.map(([name, color]) => (
        <Swatch $color={color} key={name}>
          <code>
            {name}
            <br />
            {color}
          </code>
        </Swatch>
      ))}
    </Grid>
  )
}

const meta = {
  component: ColorTokens,
  parameters: { controls: { disable: true }, layout: 'padded' },
  title: 'Foundations/Tokens',
} satisfies Meta<typeof ColorTokens>

export default meta
type Story = StoryObj<typeof meta>

export const Colors: Story = {
  tags: ['visual-review'],
}
