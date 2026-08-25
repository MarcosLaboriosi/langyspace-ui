import type { ReactNode } from 'react'
import { styled } from 'styled-components'

export const ArrowIcon = (
  <svg
    aria-hidden="true"
    fill="none"
    height="18"
    viewBox="0 0 18 18"
    width="18"
  >
    <path
      d="M3 9h12M10 4l5 5-5 5"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
)

export const SearchGlyph = (
  <svg
    aria-hidden="true"
    fill="none"
    height="18"
    viewBox="0 0 24 24"
    width="18"
  >
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
    <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export const StoryStack = styled.div`
  display: flex;
  width: min(100%, 32rem);
  min-width: 0;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
`

export const StoryRow = styled.div`
  display: flex;
  max-width: 100%;
  min-width: 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`

export const DarkSurface = styled.div`
  width: min(100%, 40rem);
  min-width: 0;
  border-radius: 1.25rem;
  margin: 0 auto;
  background: #141414;
  padding: 1.5rem;
`

export const NarrowSurface = styled.div`
  width: min(100%, 17.5rem);
  min-width: 0;
  margin: 0 auto;
`

export function StoryGroup({ children }: { children: ReactNode }) {
  return <StoryStack>{children}</StoryStack>
}
