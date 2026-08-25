import * as Styled from './styles'
import type { StatusChipProps } from './types'

export function StatusChip({
  children,
  iconStart,
  indicator = false,
  size = 'md',
  tone = 'neutral',
  ...props
}: StatusChipProps) {
  return (
    <Styled.Chip {...props} $size={size} $tone={tone}>
      {indicator ? <Styled.Indicator $tone={tone} aria-hidden="true" /> : null}
      {iconStart ? (
        <Styled.Icon aria-hidden="true">{iconStart}</Styled.Icon>
      ) : null}
      <Styled.Label
        title={
          props.title ??
          (typeof children === 'string' || typeof children === 'number'
            ? String(children)
            : undefined)
        }
      >
        {children}
      </Styled.Label>
    </Styled.Chip>
  )
}

export type { StatusChipProps, StatusChipSize, StatusChipTone } from './types'
