import { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Avatar } from '.'
import type { AvatarSize, AvatarTone } from './types'

describe('Avatar', () => {
  it('renders the default decorative identity on a native span', () => {
    const ref = createRef<HTMLSpanElement>()

    render(
      <Avatar
        ref={ref}
        className="consumer-avatar"
        data-testid="avatar"
        initials="LS"
      />,
    )

    expect(screen.getByTestId('avatar')).toHaveClass(
      'consumer-avatar',
      'lsui-sc-avatar',
    )
    expect(screen.getByTestId('avatar')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByTestId('avatar')).toHaveAttribute('data-size', 'md')
    expect(screen.getByTestId('avatar')).toHaveAttribute('data-tone', 'neutral')
    expect(screen.getByTestId('avatar')).toHaveTextContent('LS')
    expect(ref.current?.tagName).toBe('SPAN')
  })

  it('exposes every proven size and semantic tone', () => {
    const sizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
    const tones: AvatarTone[] = ['neutral', 'brand', 'inverse']

    render(
      <>
        {sizes.map((size) => (
          <Avatar
            data-testid={`size-${size}`}
            initials={size}
            key={size}
            size={size}
          />
        ))}
        {tones.map((tone) => (
          <Avatar
            data-testid={`tone-${tone}`}
            initials={tone}
            key={tone}
            tone={tone}
          />
        ))}
      </>,
    )

    sizes.forEach((size) =>
      expect(screen.getByTestId(`size-${size}`)).toHaveAttribute(
        'data-size',
        size,
      ),
    )
    tones.forEach((tone) =>
      expect(screen.getByTestId(`tone-${tone}`)).toHaveAttribute(
        'data-tone',
        tone,
      ),
    )
  })

  it('renders a decorative image and falls back to initials after an error', () => {
    render(
      <Avatar imageUrl="https://example.invalid/avatar.png" initials="AN" />,
    )

    const image = document.querySelector('img')

    expect(image).toHaveAttribute('alt', '')
    expect(image).toHaveAttribute('src', 'https://example.invalid/avatar.png')
    fireEvent.error(image!)

    expect(document.querySelector('img')).toBeNull()
    expect(screen.getByText('AN')).toBeInTheDocument()
  })

  it('tries a new image URL after the previous URL failed', () => {
    const { rerender } = render(
      <Avatar imageUrl="https://example.invalid/old.png" initials="AN" />,
    )

    fireEvent.error(document.querySelector('img')!)
    rerender(
      <Avatar imageUrl="https://example.invalid/new.png" initials="AN" />,
    )

    expect(document.querySelector('img')).toHaveAttribute(
      'src',
      'https://example.invalid/new.png',
    )
  })

  it('preserves an explicit accessible identity override', () => {
    render(
      <Avatar
        aria-hidden={false}
        aria-label="Perfil de Ana"
        initials="AN"
        role="img"
      />,
    )

    expect(screen.getByRole('img', { name: 'Perfil de Ana' })).toHaveAttribute(
      'aria-hidden',
      'false',
    )
  })

  it('does not expose cosmetic aliases or arbitrary geometry', () => {
    const renderTypeOnlyExamples = false as boolean

    if (renderTypeOnlyExamples) {
      // @ts-expect-error accent deve convergir para o tone semântico brand
      ;<Avatar initials="LS" tone="accent" />
      // @ts-expect-error dimensões livres não pertencem ao atom
      ;<Avatar initials="LS" size={36} />
      // @ts-expect-error color não é um segundo eixo visual
      ;<Avatar color="pink" initials="LS" />
    }

    expect(true).toBe(true)
  })
})
