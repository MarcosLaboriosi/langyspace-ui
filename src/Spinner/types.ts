import type { ComponentPropsWithRef } from 'react'

export type SpinnerSize = 'inherit' | 'sm' | 'md' | 'lg'

export type SpinnerProps = Omit<
  ComponentPropsWithRef<'span'>,
  'aria-hidden' | 'aria-label' | 'aria-labelledby' | 'children' | 'role'
> & {
  size?: SpinnerSize
}

export interface SpinnerStyleProps {
  $size: SpinnerSize
}
