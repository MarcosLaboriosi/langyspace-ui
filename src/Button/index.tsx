import { forwardRef } from 'react'
import * as Styled from './styles'
import type { ButtonProps } from './types'

const hasIcon = (icon: ButtonProps['icon']) =>
  icon !== null && icon !== undefined && icon !== false

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      'aria-busy': ariaBusy,
      children,
      className,
      disabled,
      fullWidth = false,
      icon,
      iconPosition = 'end',
      isLoading = false,
      size = 'md',
      type = 'button',
      variant = 'primary',
      ...props
    },
    ref,
  ) {
    const renderedIcon = isLoading ? (
      <Styled.Spinner aria-hidden="true" className="lsui-button__spinner" />
    ) : (
      icon
    )
    const buttonClassName = ['lsui-button', className].filter(Boolean).join(' ')
    const iconElement = hasIcon(renderedIcon) ? (
      <Styled.Icon
        aria-hidden={isLoading ? true : undefined}
        className="lsui-button__icon"
      >
        {renderedIcon}
      </Styled.Icon>
    ) : null

    return (
      <Styled.Button
        {...props}
        ref={ref}
        $fullWidth={fullWidth}
        $size={size}
        $variant={variant}
        aria-busy={isLoading ? true : ariaBusy}
        className={buttonClassName}
        data-full-width={fullWidth ? 'true' : undefined}
        data-icon-position={hasIcon(renderedIcon) ? iconPosition : undefined}
        data-loading={isLoading ? 'true' : undefined}
        data-size={size}
        data-variant={variant}
        disabled={disabled || isLoading}
        type={type}
      >
        {iconPosition === 'start' ? iconElement : null}
        {children}
        {iconPosition === 'end' ? iconElement : null}
      </Styled.Button>
    )
  },
)

export type {
  ButtonIconPosition,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from './types'
