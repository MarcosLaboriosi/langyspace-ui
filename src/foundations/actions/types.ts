export type ActionVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'brand'
  | 'danger'
  | 'success'
  | 'inverse'

export type ActionSize = 'sm' | 'md' | 'lg'

export type ActionDensity = 'regular' | 'compact'

export type ActionShape = 'pill' | 'rounded'

export interface ActionRecipeStyleProps {
  $density: ActionDensity
  $fullWidth: boolean
  $shape: ActionShape
  $size: ActionSize
  $variant: ActionVariant
}
