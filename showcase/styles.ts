import { styled } from 'styled-components'
import { Pressable } from '../src'

export const ContextTab = styled(Pressable)`
  min-height: 2.5rem;
  padding-right: 1rem;
  padding-left: 1rem;
  border: 1px solid #d9d9d6;
  border-radius: 0.75rem;
  background: #ffffff;
  font-weight: 600;

  &[aria-pressed='true'] {
    border-color: #0a0a0a;
    color: #ffffff;
    background: #0a0a0a;
  }
`
