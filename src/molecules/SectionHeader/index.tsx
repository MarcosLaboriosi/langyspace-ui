import * as Styled from './styles'
import type { SectionHeaderProps } from './types'

export function SectionHeader({
  actions,
  headingLevel = 2,
  meta,
  spacing = 'default',
  title,
  ...headerProps
}: SectionHeaderProps) {
  const hasAside = meta !== undefined || actions != null

  return (
    <Styled.Header
      {...headerProps}
      $spacing={spacing}
      data-ui-section-header="true"
    >
      <Styled.Title as={`h${headingLevel}`}>{title}</Styled.Title>
      {hasAside ? (
        <Styled.Aside>
          {meta !== undefined ? <Styled.Meta>{meta}</Styled.Meta> : null}
          {actions}
        </Styled.Aside>
      ) : null}
    </Styled.Header>
  )
}

export type {
  SectionHeaderLevel,
  SectionHeaderProps,
  SectionHeaderSpacing,
} from './types'
