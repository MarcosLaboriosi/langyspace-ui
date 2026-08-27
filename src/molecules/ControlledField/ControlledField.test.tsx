import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import { describe, expect, it, vi } from 'vitest'
import { ControlledField } from '.'

interface FormValues {
  email: string
}

function TestForm({
  error,
  onSubmit = () => undefined,
}: {
  error?: string
  onSubmit?: (values: FormValues) => void
}) {
  const methods = useForm<FormValues>({ defaultValues: { email: '' } })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ControlledField<FormValues>
          error={error}
          hint="Use seu endereço principal"
          label="E-mail"
          name="email"
          rules={{ required: 'Informe seu e-mail' }}
          type="email"
        />
        <button type="submit">Salvar</button>
      </form>
    </FormProvider>
  )
}

describe('ControlledField', () => {
  it('connects react-hook-form state to the shared text field', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<TestForm onSubmit={onSubmit} />)

    const input = screen.getByRole('textbox', { name: 'E-mail' })
    expect(input).toHaveAttribute('id', 'email')
    expect(input.getAttribute('aria-describedby')).toMatch(/email-hint/)

    await user.type(input, 'maria@example.com')
    await user.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(onSubmit).toHaveBeenCalledWith(
      { email: 'maria@example.com' },
      expect.anything(),
    )
  })

  it('renders validation and external errors through FieldRoot', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<TestForm />)

    await user.click(screen.getByRole('button', { name: 'Salvar' }))
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Informe seu e-mail',
    )
    expect(screen.getByRole('textbox', { name: 'E-mail' })).toHaveAttribute(
      'aria-invalid',
      'true',
    )

    rerender(<TestForm error="E-mail já cadastrado" />)
    expect(screen.getByRole('alert')).toHaveTextContent('E-mail já cadastrado')
  })
})
