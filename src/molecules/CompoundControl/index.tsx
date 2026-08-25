import * as Styled from './styles'
import type { CompoundControlProps } from './types'

export function CompoundControl({
  children,
  disabled = false,
  invalid = false,
  leading,
  size = 'md',
  surface = 'surface',
  trailing,
  ...props
}: CompoundControlProps) {
  return (
    <Styled.Root
      {...props}
      $disabled={disabled}
      $invalid={invalid}
      $size={size}
      $surface={surface}
      aria-disabled={disabled || undefined}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      data-ui-compound-control="single-surface"
    >
      {leading ? <Styled.Slot aria-hidden="true">{leading}</Styled.Slot> : null}
      {children}
      {trailing ? <Styled.Slot>{trailing}</Styled.Slot> : null}
    </Styled.Root>
  )
}

export type { CompoundControlProps, CompoundControlSurface } from './types'
