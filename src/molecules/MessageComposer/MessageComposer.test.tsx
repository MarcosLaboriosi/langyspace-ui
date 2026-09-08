import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { MessageComposer } from '.'

const submitIcon = <span aria-hidden="true">↑</span>

function ControlledComposer({ onSubmit }: { onSubmit: () => void }) {
  const [value, setValue] = useState('')

  return (
    <MessageComposer
      helperText="Use o botão para enviar"
      onSubmit={onSubmit}
      onValueChange={setValue}
      placeholder="Escreva uma mensagem"
      submitIcon={submitIcon}
      submitLabel="Enviar mensagem"
      textareaLabel="Mensagem"
      value={value}
    />
  )
}

describe('MessageComposer', () => {
  it('keeps the controlled value and submits once through keyboard navigation', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ControlledComposer onSubmit={onSubmit} />)

    const input = screen.getByRole('textbox', { name: 'Mensagem' })
    const submit = screen.getByRole('button', { name: 'Enviar mensagem' })

    expect(submit).toBeEnabled()
    await user.type(input, 'Posso mandar uma dúvida?')
    expect(input).toHaveValue('Posso mandar uma dúvida?')
    expect(screen.getByText('24/1000')).toBeInTheDocument()

    await user.tab()
    expect(submit).toHaveFocus()
    await user.keyboard('{Enter}')

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('focuses the textarea instead of submitting an empty message', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(
      <MessageComposer
        onSubmit={onSubmit}
        onValueChange={() => undefined}
        submitIcon={submitIcon}
        submitLabel="Enviar mensagem"
        textareaLabel="Mensagem"
        value="   "
      />,
    )

    const input = screen.getByRole('textbox', { name: 'Mensagem' })
    const submit = screen.getByRole('button', { name: 'Enviar mensagem' })

    expect(submit).toBeEnabled()
    await user.click(submit)

    expect(input).toHaveFocus()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('focuses an over-limit textarea instead of submitting', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const baseProps = {
      onSubmit,
      onValueChange: vi.fn(),
      submitIcon,
      submitLabel: 'Enviar mensagem',
      textareaLabel: 'Mensagem',
    }
    render(<MessageComposer {...baseProps} maxLength={1} value="AB" />)

    const input = screen.getByRole('textbox', { name: 'Mensagem' })
    const submit = screen.getByRole('button', { name: 'Enviar mensagem' })

    expect(submit).toBeEnabled()
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText('2/1')).toBeVisible()
    await user.click(submit)

    expect(input).toHaveFocus()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('blocks disabled and loading submissions', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const baseProps = {
      onSubmit,
      onValueChange: vi.fn(),
      submitIcon,
      submitLabel: 'Enviar mensagem',
      textareaLabel: 'Mensagem',
    }
    const { rerender } = render(
      <MessageComposer {...baseProps} disabled value="A" />,
    )

    expect(screen.getByRole('textbox', { name: 'Mensagem' })).toBeDisabled()

    rerender(<MessageComposer {...baseProps} isSubmitting value="A" />)
    const submit = screen.getByRole('button', { name: 'Enviar mensagem' })
    expect(submit).toBeDisabled()
    expect(submit).toHaveAttribute('aria-busy', 'true')
    expect(submit.closest('form')).toHaveAttribute('aria-busy', 'true')

    await user.click(submit)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('grows and shrinks with its controlled content', () => {
    const baseProps = {
      onSubmit: () => undefined,
      onValueChange: () => undefined,
      submitIcon,
      submitLabel: 'Enviar mensagem',
      textareaLabel: 'Mensagem',
    }
    const { rerender } = render(
      <MessageComposer {...baseProps} value="Uma linha" />,
    )
    const input = screen.getByRole('textbox', {
      name: 'Mensagem',
    }) as HTMLTextAreaElement
    let scrollHeight = 96

    Object.defineProperty(input, 'scrollHeight', {
      configurable: true,
      get: () => scrollHeight,
    })

    rerender(
      <MessageComposer {...baseProps} value={'Linha 1\nLinha 2\nLinha 3'} />,
    )
    expect(input.style.height).toBe('96px')

    scrollHeight = 48
    rerender(<MessageComposer {...baseProps} value="Uma linha novamente" />)
    expect(input.style.height).toBe('48px')
  })

  it('associates error, helper and counter while preserving form props and ref', () => {
    const ref = createRef<HTMLFormElement>()
    render(
      <MessageComposer
        className="consumer-composer"
        data-context="teacher"
        error="Não foi possível enviar."
        helperText="A professora responde assim que puder."
        maxLength={1000}
        onSubmit={() => undefined}
        onValueChange={() => undefined}
        ref={ref}
        submitIcon={submitIcon}
        submitLabel="Enviar mensagem"
        textareaLabel="Mensagem para a professora"
        value="Olá"
      />,
    )

    const input = screen.getByRole('textbox', {
      name: 'Mensagem para a professora',
    })
    const describedBy = input.getAttribute('aria-describedby')?.split(' ')

    expect(ref.current).toHaveClass(
      'lsui-sc-message-composer',
      'consumer-composer',
    )
    expect(ref.current).toHaveAttribute('data-context', 'teacher')
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Não foi possível enviar.',
    )
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(describedBy).toHaveLength(3)
    for (const id of describedBy ?? []) {
      expect(document.getElementById(id)).toBeInTheDocument()
    }
  })
})
