import type { ComponentPropsWithRef as NativePropsWithRef } from 'react'

export type SpinnerSize = 'inherit' | 'sm' | 'md' | 'lg'

export type SpinnerProps = Omit<
  NativePropsWithRef<'span'>,
  'aria-hidden' | 'aria-label' | 'aria-labelledby' | 'children' | 'role'
> & {
  size?: SpinnerSize
}

export interface SpinnerStyleProps {
  $size: SpinnerSize
}
