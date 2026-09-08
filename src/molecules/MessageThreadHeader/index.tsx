import { forwardRef } from 'react'
import { Avatar } from '../../atoms/Avatar'
import * as Styled from './styles'
import type { MessageThreadHeaderProps } from './types'

export const MessageThreadHeader = forwardRef<
  HTMLElement,
  MessageThreadHeaderProps
>(function MessageThreadHeader(
  {
    imageUrl,
    initials,
    leadingAction,
    subtitle,
    title,
    trailingAction,
    ...headerProps
  },
  ref,
) {
  return (
    <Styled.Header
      {...headerProps}
      ref={ref}
      data-ui-message-thread-header="true"
    >
      {leadingAction != null ? (
        <Styled.Action data-ui-message-thread-header-part="leading-action">
          {leadingAction}
        </Styled.Action>
      ) : null}
      <Styled.Identity>
        <Avatar
          aria-hidden="true"
          imageUrl={imageUrl}
          initials={initials}
          size="sm"
        />
        <Styled.Text>
          <Styled.Title title={title}>{title}</Styled.Title>
          {subtitle ? (
            <Styled.Subtitle title={subtitle}>{subtitle}</Styled.Subtitle>
          ) : null}
        </Styled.Text>
      </Styled.Identity>
      {trailingAction != null ? (
        <Styled.Action data-ui-message-thread-header-part="trailing-action">
          {trailingAction}
        </Styled.Action>
      ) : null}
    </Styled.Header>
  )
})

export type { MessageThreadHeaderProps } from './types'
