import type { ComponentPropsWithRef } from 'react'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type AvatarTone = 'neutral' | 'brand' | 'inverse'

export interface AvatarProps extends Omit<
  ComponentPropsWithRef<'span'>,
  'color'
> {
  imageUrl?: string
  initials: string
  size?: AvatarSize
  tone?: AvatarTone
}
