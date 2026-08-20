import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'

export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonIconPosition = 'start' | 'end'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  fullWidth?: boolean
  icon?: ReactNode
  iconPosition?: ButtonIconPosition
  isLoading?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}

const hasIcon = (icon: ReactNode) =>
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
      <span aria-hidden="true" className="lsui-button__spinner" />
    ) : (
      icon
    )
    const buttonClassName = ['lsui-button', className].filter(Boolean).join(' ')
    const iconElement = hasIcon(renderedIcon) ? (
      <span
        aria-hidden={isLoading ? true : undefined}
        className="lsui-button__icon"
      >
        {renderedIcon}
      </span>
    ) : null

    return (
      <button
        {...props}
        ref={ref}
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
      </button>
    )
  },
)
