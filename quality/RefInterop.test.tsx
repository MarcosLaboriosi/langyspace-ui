import { render } from '@testing-library/react'
import { createRef } from 'react'
import { renderToString } from 'react-dom/server'
import { styled } from 'styled-components'
import { describe, expect, it, vi } from 'vitest'
import { Button, SearchInput, TextInput } from '../src'

const StyledButton = styled(Button)`
  margin: 0;
`
const StyledSearchInput = styled(SearchInput)`
  margin: 0;
`

describe('React 19 ref interop', () => {
  it('supports object and callback refs through direct and styled compositions', () => {
    const buttonRef = createRef<HTMLButtonElement>()
    const inputRef = createRef<HTMLInputElement>()
    const searchRef = vi.fn<(node: HTMLInputElement | null) => void>()

    render(
      <>
        <StyledButton ref={buttonRef}>Salvar</StyledButton>
        <TextInput aria-label="Nome" ref={inputRef} />
        <StyledSearchInput aria-label="Buscar" ref={searchRef} />
      </>,
    )

    expect(buttonRef.current?.tagName).toBe('BUTTON')
    expect(inputRef.current?.tagName).toBe('INPUT')
    expect(searchRef.mock.calls[0]?.[0]?.tagName).toBe('INPUT')
  })

  it('server-renders both ref declaration patterns through styled-components', () => {
    const html = renderToString(
      <>
        <StyledButton>Salvar</StyledButton>
        <StyledSearchInput aria-label="Buscar" />
      </>,
    )

    expect(html).toContain('lsui-sc-button')
    expect(html).toContain('lsui-sc-search-input')
  })
})
