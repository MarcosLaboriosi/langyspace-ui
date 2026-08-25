import { Icon } from '../Icon'
import { Spinner } from '../Spinner'
import * as Styled from './styles'
import type { ButtonProps } from './types'

export function Button({
  children,
  density = 'regular',
  fullWidth = false,
  iconEnd,
  iconOnly = false,
  iconStart,
  isLoading = false,
  shape = 'pill',
  size = 'md',
  tone = 'neutral',
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
      $iconOnly={iconOnly}
      $shape={shape}
      $size={size}
      $tone={tone}
      $variant={variant}
      data-loading={isLoading ? 'true' : undefined}
      data-density={density}
      data-size={size}
    >
      {iconOnly ? (
        <Icon icon={isLoading ? <Spinner /> : children} />
      ) : (
        <>
          <Icon icon={iconStart} />
          {children}
          <Icon icon={isLoading ? <Spinner /> : iconEnd} />
        </>
      )}
    </Styled.Button>
  )
}
