import * as Styled from './styles'
import type { FilterPillsProps } from './types'

export function FilterPills<Value extends string>({
  counts,
  onChange,
  options,
  overflow = 'scroll',
  size = 'md',
  value,
  ...props
}: FilterPillsProps<Value>) {
  return (
    <Styled.Group {...props} $overflow={overflow} role="group">
      {options.map((option) => {
        const count = counts?.[option.value]
        const accessibleLabel =
          option.accessibleLabel ??
          (typeof option.label === 'string' ? option.label : undefined)

        return (
          <Styled.Item
            key={option.value}
            $active={option.value === value}
            $size={size}
            aria-label={
              count !== undefined && accessibleLabel
                ? `${accessibleLabel}: ${count}`
                : accessibleLabel
            }
            aria-pressed={option.value === value}
            disabled={option.disabled}
            type="button"
            onClick={() => onChange(option.value)}
          >
            {option.label}
            {count !== undefined ? <Styled.Count>{count}</Styled.Count> : null}
          </Styled.Item>
        )
      })}
    </Styled.Group>
  )
}

export type {
  FilterPillsOverflow,
  FilterPillsProps,
  FilterPillsSize,
} from './types'
