import { Icon } from '../Icon'
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
      <Icon icon={iconStart} />
      {children}
      <Icon icon={iconEnd} />
    </Styled.ActionLink>
  )
}
