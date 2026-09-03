import { describe, expect, it } from 'vitest'
import type {
  AuthTokenDigitsProps,
  AuthTokenLength,
  ChoiceOption,
  DialogDismissal,
  DrawerSize,
  MessageBubbleProps,
  MessageComposerProps,
  OperationalListColumn,
  OperationalListItemAction,
  OperationalListPrimaryColumn,
  OperationalListProps,
  SearchInputClearAction,
  SearchInputProps,
} from '../src'
import type { AccessibleName } from '../src/foundations/accessibility'
import type { AccessibleChoiceOption } from '../src/foundations/selection'

interface OperationalPerson {
  id: string
  name: string
  status: string
}

describe('public type contracts', () => {
  it('keeps messaging copy and behavior explicit in consumers', () => {
    const deliveredMessage: MessageBubbleProps = {
      children: 'Até amanhã!',
      side: 'outgoing',
      status: 'sent',
      statusLabel: 'Enviada',
      timestamp: '10:30',
    }
    const composer: MessageComposerProps = {
      onSubmit: () => undefined,
      onValueChange: () => undefined,
      submitIcon: <span aria-hidden="true">↑</span>,
      submitLabel: 'Enviar mensagem',
      textareaLabel: 'Mensagem para a professora',
      value: '',
    }
    // @ts-expect-error delivery status requires consumer-owned accessible copy
    const missingStatusLabel: MessageBubbleProps = {
      children: 'Tentando enviar',
      status: 'sending',
      timestamp: '10:31',
    }
    // @ts-expect-error status copy cannot exist without a semantic status
    const missingStatus: MessageBubbleProps = {
      children: 'Estado desconhecido',
      statusLabel: 'Enviada',
      timestamp: '10:32',
    }

    expect(deliveredMessage.statusLabel).toBe('Enviada')
    expect(composer.onSubmit).toBeTypeOf('function')
    expect(missingStatusLabel.status).toBe('sending')
    expect(missingStatus.statusLabel).toBe('Enviada')
  })

  it('publishes strict additive contracts for new compositions', () => {
    const directName: AccessibleName = { 'aria-label': 'Buscar' }
    const referencedName: AccessibleName = {
      'aria-labelledby': 'search-title',
    }
    const tokenLength: AuthTokenLength = 6
    const dialogDismissal: DialogDismissal = 'escape-and-backdrop'
    const drawerSize: DrawerSize = 'lg'
    const clearAction: SearchInputClearAction = {
      clearLabel: 'Limpar busca',
      onClear: () => undefined,
    }
    const customChoice: AccessibleChoiceOption = {
      accessibleLabel: 'Ativos: 18',
      label: <span>Ativos · 18</span>,
      value: 'active',
    }

    // @ts-expect-error accessible-name sources are mutually exclusive
    const duplicatedName: AccessibleName = {
      'aria-label': 'Buscar',
      'aria-labelledby': 'search-title',
    }
    // @ts-expect-error only verified token lengths belong to the strict contract
    const unsupportedLength: AuthTokenLength = 5
    // @ts-expect-error onClear requires explicit product copy in the strict contract
    const missingClearCopy: SearchInputClearAction = {
      onClear: () => undefined,
    }
    // @ts-expect-error custom visual labels require accessible copy in the strict contract
    const inaccessibleChoice: AccessibleChoiceOption = {
      label: <span>18</span>,
      value: 'active',
    }

    expect(directName['aria-label']).toBe('Buscar')
    expect(referencedName['aria-labelledby']).toBe('search-title')
    expect(tokenLength).toBe(6)
    expect(dialogDismissal).toBe('escape-and-backdrop')
    expect(drawerSize).toBe('lg')
    expect(clearAction.clearLabel).toBe('Limpar busca')
    expect(customChoice.accessibleLabel).toBe('Ativos: 18')
    expect(duplicatedName['aria-label']).toBe('Buscar')
    expect(unsupportedLength).toBe(5)
    expect(missingClearCopy.onClear).toBeTypeOf('function')
    expect(inaccessibleChoice.value).toBe('active')
  })

  it('keeps v1 props source-compatible until a versioned major migration', () => {
    const legacySearch: SearchInputProps = {
      'aria-label': 'Buscar',
      'aria-labelledby': 'search-title',
      onClear: () => undefined,
    }
    const legacyToken: AuthTokenDigitsProps = {
      'aria-label': 'Código',
      digitLabel: 'Dígito',
      idPrefix: 'token',
      length: 5,
      onTokenChange: () => undefined,
    }
    const legacyChoice: ChoiceOption = {
      label: <span>18</span>,
      value: 'active',
    }

    expect(legacySearch.onClear).toBeTypeOf('function')
    expect(legacyToken.length).toBe(5)
    expect(legacyChoice.value).toBe('active')
  })

  it('publishes strict generic operational-list contracts', () => {
    const items: readonly OperationalPerson[] = [
      { id: 'person-1', name: 'Ana', status: 'active' },
    ]
    const primaryColumn = {
      label: 'Pessoa',
      render: (item: OperationalPerson) => ({
        navigation: {
          label: `Abrir ${item.name}`,
          onNavigate: () => undefined,
        },
        title: item.name,
      }),
    } satisfies OperationalListPrimaryColumn<OperationalPerson>
    const columns = [
      {
        id: 'status',
        label: 'Status',
        render: (item: OperationalPerson) => item.status,
      },
    ] satisfies readonly OperationalListColumn<OperationalPerson>[]
    const props = {
      'aria-label': 'Fila operacional',
      columns,
      getItemKey: (item: OperationalPerson) => item.id,
      items,
      primaryColumn,
    } satisfies OperationalListProps<OperationalPerson>
    const quickAction: OperationalListItemAction = {
      icon: <span aria-hidden="true">+</span>,
      id: 'message',
      label: 'Enviar mensagem',
      onSelect: () => undefined,
      placement: 'quick',
    }

    // @ts-expect-error quick actions require an icon
    const missingQuickIcon: OperationalListItemAction = {
      id: 'message',
      label: 'Enviar mensagem',
      onSelect: () => undefined,
      placement: 'quick',
    }
    const destructivePrimary: OperationalListItemAction = {
      id: 'archive',
      label: 'Arquivar',
      onSelect: () => undefined,
      placement: 'primary',
      // @ts-expect-error primary actions cannot be destructive
      tone: 'danger',
    }
    // @ts-expect-error operational lists accept exactly one accessible-name source
    const duplicatedListName: OperationalListProps<OperationalPerson> = {
      ...props,
      'aria-labelledby': 'queue-title',
    }

    expect(props.getItemKey(items[0])).toBe('person-1')
    expect(quickAction.placement).toBe('quick')
    expect(missingQuickIcon.id).toBe('message')
    expect(destructivePrimary.placement).toBe('primary')
    expect(duplicatedListName['aria-label']).toBe('Fila operacional')
  })
})
