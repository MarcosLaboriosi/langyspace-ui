import { IconSlot } from '../../internal/IconSlot'
import { Spinner } from '../../primitives/Spinner'
import * as Styled from './styles'
import type { IconButtonProps, IconButtonVariant } from './types'
import type { ActionVariant } from '../../foundations/actions/types'

const actionVariants = {
  brand: 'brand',
  danger: 'tertiary',
  inverse: 'inverse',
  neutral: 'secondary',
  subtle: 'tertiary',
  success: 'success',
} as const satisfies Record<IconButtonVariant, ActionVariant>

export function IconButton({
  children,
  isLoading = false,
  shape = 'circle',
  size = 'md',
  type = 'button',
  variant = 'neutral',
  ...props
}: IconButtonProps) {
  return (
    <Styled.IconButton
      {...props}
      {...(isLoading && { 'aria-busy': true, disabled: true })}
      type={type}
      $density="regular"
      $fullWidth={false}
      $iconVariant={variant}
      $shape={shape === 'circle' ? 'pill' : 'rounded'}
      $size={size}
      $variant={actionVariants[variant]}
      data-loading={isLoading ? 'true' : undefined}
      data-size={size}
    >
      <IconSlot icon={isLoading ? <Spinner /> : children} />
    </Styled.IconButton>
  )
}
