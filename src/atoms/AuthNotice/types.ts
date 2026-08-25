import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type AuthNoticeTone = 'error' | 'info'

export interface AuthNoticeProps extends ComponentPropsWithoutRef<'p'> {
  children: ReactNode
  tone?: AuthNoticeTone
}
