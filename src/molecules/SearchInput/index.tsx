import { forwardRef, useRef, type SVGProps } from 'react'
import { IconButton } from '../../atoms/IconButton'
import { CompoundControl } from '../CompoundControl'
import * as Styled from './styles'
import type { SearchInputProps } from './types'

const iconSizes = { lg: 18, md: 16, sm: 15 } as const

function SearchIcon({ size }: { size: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
      <path
        d="m21 21-4.35-4.35"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="13"
      viewBox="0 0 24 24"
      width="13"
      {...props}
    >
      <path
        d="m18 6-12 12M6 6l12 12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      className,
      clearLabel = 'Clear search',
      disabled = false,
      onClear,
      size = 'md',
      surface = 'surface',
      value,
      ...inputProps
    },
    forwardedRef,
  ) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const hasValue = Array.isArray(value)
      ? value.length > 0
      : String(value ?? '').length > 0

    return (
      <CompoundControl
        className={className}
        disabled={disabled}
        leading={<SearchIcon size={iconSizes[size]} />}
        size={size}
        surface={surface}
        trailing={
          onClear && clearLabel && hasValue ? (
            <IconButton
              aria-label={clearLabel}
              disabled={disabled}
              size="sm"
              variant="subtle"
              onClick={() => {
                onClear()
                inputRef.current?.focus({ preventScroll: true })
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null
        }
      >
        <Styled.Input
          {...inputProps}
          ref={(node) => {
            inputRef.current = node
            if (typeof forwardedRef === 'function') forwardedRef(node)
            else if (forwardedRef) forwardedRef.current = node
          }}
          disabled={disabled}
          type="search"
          value={value}
          $size={size}
        />
      </CompoundControl>
    )
  },
)

export type { SearchInputClearAction, SearchInputProps } from './types'
export type { FieldControlSize as SearchInputSize } from '../../foundations/fields'
