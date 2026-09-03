import type { ComponentPropsWithRef, ReactNode } from 'react'

export type MessageBubbleSide = 'incoming' | 'outgoing'
export type MessageBubbleStatus = 'failed' | 'sending' | 'sent'

type MessageBubbleDelivery =
  | {
      status?: never
      statusLabel?: never
    }
  | {
      status: MessageBubbleStatus
      statusLabel: string
    }

export type MessageBubbleProps = Omit<
  ComponentPropsWithRef<'article'>,
  'children'
> & {
  children: ReactNode
  dateTime?: string
  side?: MessageBubbleSide
  timestamp: string
} & MessageBubbleDelivery
