import { Icon } from '../Icon'
import * as Styled from './styles'
import type { ButtonProps } from './types'

export function Button({
  children,
  fullWidth = false,
  iconEnd,
  iconOnly = false,
  iconStart,
  isLoading = false,
  shape = 'pill',
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const spinsAtStart = isLoading && Boolean(iconStart)

  return (
    <Styled.Button
      {...props}
      {...(isLoading && { 'aria-busy': true, disabled: true })}
      type={type}
      $fullWidth={fullWidth}
      $iconOnly={iconOnly}
      $shape={shape}
      $size={size}
      $variant={variant}
      data-loading={isLoading ? 'true' : undefined}
      data-size={size}
    >
      {iconOnly ? (
        <Icon icon={children} isLoading={isLoading} />
      ) : (
        <>
          <Icon icon={iconStart} isLoading={spinsAtStart} />
          {children}
          <Icon icon={iconEnd} isLoading={isLoading && !spinsAtStart} />
        </>
      )}
    </Styled.Button>
  )
}
