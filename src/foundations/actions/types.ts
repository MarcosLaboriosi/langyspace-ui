export type ActionVariant =
  'primary' | 'secondary' | 'tertiary' | 'danger' | 'success'

export type ActionTone = 'neutral' | 'brand'

export type ActionSize = 'sm' | 'md' | 'lg'

export type ActionDensity = 'regular' | 'compact'

export type ActionShape = 'pill' | 'rounded'

export interface ActionRecipeStyleProps {
  $density: ActionDensity
  $fullWidth: boolean
  $shape: ActionShape
  $size: ActionSize
  $tone: ActionTone
  $variant: ActionVariant
}
