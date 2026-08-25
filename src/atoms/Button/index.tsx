import { IconSlot } from '../../internal/IconSlot'
import { Spinner } from '../../primitives/Spinner'
import * as Styled from './styles'
import type { ButtonProps } from './types'

export function Button({
  children,
  density = 'regular',
  fullWidth = false,
  iconEnd,
  iconStart,
  isLoading = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <Styled.Button
      {...props}
      {...(isLoading && { 'aria-busy': true, disabled: true })}
      type={type}
      $density={density}
      $fullWidth={fullWidth}
      $shape="pill"
      $size={size}
      $variant={variant}
      data-loading={isLoading ? 'true' : undefined}
      data-density={density}
      data-size={size}
    >
      <IconSlot icon={iconStart} />
      {children}
      <IconSlot icon={isLoading ? <Spinner /> : iconEnd} />
    </Styled.Button>
  )
}
