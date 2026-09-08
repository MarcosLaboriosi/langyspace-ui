import type {
  ComponentPropsWithRef,
  ReactNode,
  Ref,
  UIEventHandler,
} from 'react'

export interface MessageThreadProps extends Omit<
  ComponentPropsWithRef<'section'>,
  'children'
> {
  children: ReactNode
  footer?: ReactNode
  header: ReactNode
  onViewportScroll?: UIEventHandler<HTMLDivElement>
  viewportLabel: string
  viewportRef?: Ref<HTMLDivElement>
}
