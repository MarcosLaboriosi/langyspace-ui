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

const Table = styled.table`
  width: min(100%, 60rem);
  margin: 0 auto;
  border-collapse: collapse;

  th,
  td {
    padding: ${tokens.spacing[3]};
    border-bottom: 1px solid ${tokens.color.surfaceBorder.subtle};
    text-align: left;
    vertical-align: top;
  }

  th {
    color: ${tokens.color.content.default};
  }

  td {
    color: ${tokens.color.content.muted};
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

function TokenPurpose() {
  return (
    <Table>
      <thead>
        <tr>
          <th scope="col">Foundation</th>
          <th scope="col">Use</th>
          <th scope="col">Boundary</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>control.height</td>
          <td>Button, link and icon action families</td>
          <td>Do not use for form fields</td>
        </tr>
        <tr>
          <td>field.height</td>
          <td>Inputs and compound field surfaces</td>
          <td>The parent and nested control share the same size</td>
        </tr>
        <tr>
          <td>color.inverse</td>
          <td>Content, borders and subtle fills on dark surfaces</td>
          <td>Choose by semantic role, not a new alpha</td>
        </tr>
        <tr>
          <td>typography.fontSize.2xs</td>
          <td>Short metadata inside chips and counters</td>
          <td>Never use for primary action or body copy</td>
        </tr>
        <tr>
          <td>Private recipe constants</td>
          <td>Singular component geometry such as StatePanel fill</td>
          <td>Promote only after a second semantic consumer exists</td>
        </tr>
      </tbody>
    </Table>
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

export const PurposeAndBoundaries: Story = {
  render: () => <TokenPurpose />,
}
