import * as Styled from './styles'
import type { ChoiceValue } from '../../foundations/selection'
import type { SegmentedControlProps } from './types'

export function SegmentedControl<Value extends ChoiceValue>({
  onChange,
  options,
  shape = 'rounded',
  surface = 'light',
  value,
  ...props
}: SegmentedControlProps<Value>) {
  return (
    <Styled.Group {...props} $shape={shape} $surface={surface} role="group">
      {options.map((option) => (
        <Styled.Item
          key={option.value}
          $active={option.value === value}
          $shape={shape}
          $surface={surface}
          aria-label={option.accessibleLabel}
          aria-pressed={option.value === value}
          disabled={option.disabled}
          type="button"
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Styled.Item>
      ))}
    </Styled.Group>
  )
}

export type {
  SegmentedControlProps,
  SegmentedControlShape,
  SegmentedControlSurface,
} from './types'
export type { ChoiceOption, ChoiceValue } from '../../foundations/selection'
