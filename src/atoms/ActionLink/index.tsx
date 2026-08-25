import { IconSlot } from '../../internal/IconSlot'
import * as Styled from './styles'
import type { ActionLinkProps } from './types'

export function ActionLink({
  children,
  density = 'regular',
  fullWidth = false,
  iconEnd,
  iconStart,
  shape = 'pill',
  size = 'md',
  tone = 'neutral',
  variant = 'primary',
  ...props
}: ActionLinkProps) {
  return (
    <Styled.ActionLink
      {...props}
      $density={density}
      $fullWidth={fullWidth}
      $shape={shape}
      $size={size}
      $tone={tone}
      $variant={variant}
      data-density={density}
      data-size={size}
    >
      <IconSlot icon={iconStart} />
      {children}
      <IconSlot icon={iconEnd} />
    </Styled.ActionLink>
  )
}
