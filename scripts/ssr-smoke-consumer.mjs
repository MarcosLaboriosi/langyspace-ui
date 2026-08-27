import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { FormProvider, useForm } from 'react-hook-form'
import { ServerStyleSheet, styled } from 'styled-components'

const ConsumerSurface = styled.div`
  color: #123456;
`

const {
  AuthNotice,
  AuthTokenDigits,
  ActionLink,
  Avatar,
  Button,
  CompoundControl,
  ControlledField,
  Dialog,
  Drawer,
  EmptyState,
  FieldRoot,
  FilterPills,
  IconButton,
  LoadingState,
  Pressable,
  SearchInput,
  SectionHeader,
  SegmentedControl,
  SelectInput,
  Spinner,
  StatePanel,
  StatusChip,
  TextareaInput,
  TextInput,
} = await import('@langyspace/ui')

function ControlledFieldSsr() {
  const form = useForm({ defaultValues: { email: 'maria@example.com' } })
  return createElement(
    FormProvider,
    form,
    createElement(ControlledField, { label: 'Email', name: 'email' }),
  )
}

const sheet = new ServerStyleSheet()
let markup
let collectedCss

try {
  markup = renderToString(
    sheet.collectStyles(
      createElement(
        ConsumerSurface,
        null,
        createElement(Button, { size: 'lg', variant: 'brand' }, 'SSR'),
        createElement(ActionLink, { href: '/next' }, 'Action SSR'),
        createElement(
          IconButton,
          { 'aria-label': 'Open menu' },
          createElement('span', { 'aria-hidden': true }, '+'),
        ),
        createElement(Pressable, null, 'Pressable SSR'),
        createElement(Spinner, { size: 'md' }),
        createElement(Avatar, { initials: 'LS', tone: 'brand' }),
        createElement(StatusChip, { tone: 'success' }, 'Confirmed'),
        createElement(EmptyState, { title: 'Empty' }),
        createElement(LoadingState, { title: 'Loading' }),
        createElement(StatePanel, { state: 'error', title: 'Error' }),
        createElement(
          FieldRoot,
          { label: 'Name' },
          createElement(TextInput, { defaultValue: 'Maria' }),
        ),
        createElement(ControlledFieldSsr),
        createElement(
          FieldRoot,
          { label: 'Level' },
          createElement(
            SelectInput,
            { defaultValue: 'B1' },
            createElement('option', null, 'B1'),
          ),
        ),
        createElement(
          FieldRoot,
          { label: 'Notes' },
          createElement(TextareaInput, { defaultValue: 'SSR notes' }),
        ),
        createElement(
          CompoundControl,
          { leading: '$' },
          createElement(TextInput, {
            'aria-label': 'Amount',
            defaultValue: '48',
          }),
        ),
        createElement(SearchInput, {
          'aria-label': 'Search',
          defaultValue: 'Maria',
        }),
        createElement(SectionHeader, {
          meta: '4 items',
          title: 'Section header SSR',
        }),
        createElement(FilterPills, {
          'aria-label': 'Filters',
          onChange: () => undefined,
          options: [{ label: 'All', value: 'all' }],
          value: 'all',
        }),
        createElement(SegmentedControl, {
          'aria-label': 'Range',
          onChange: () => undefined,
          options: [{ label: '30 days', value: '30' }],
          value: '30',
        }),
        createElement(AuthTokenDigits, {
          'aria-label': 'Code',
          autoFocus: false,
          digitLabel: 'Digit',
          idPrefix: 'code',
          length: 4,
          onTokenChange: () => undefined,
        }),
        createElement(AuthNotice, { tone: 'info' }, 'Code sent'),
        createElement(
          Dialog,
          {
            closeLabel: 'Close dialog',
            onClose: () => undefined,
            open: false,
            title: 'Dialog SSR',
          },
          'Dialog',
        ),
        createElement(
          Drawer,
          {
            closeLabel: 'Close drawer',
            onClose: () => undefined,
            open: false,
            title: 'Drawer SSR',
          },
          'Drawer',
        ),
      ),
    ),
  )
  collectedCss = sheet.getStyleTags()
} finally {
  sheet.seal()
}

const buttonClasses = (markup.match(/<button[^>]*\sclass="([^"]*)"/)?.[1] ?? '')
  .split(' ')
  .filter(Boolean)

if (!buttonClasses.includes('lsui-sc-button')) {
  throw new Error('shared_button_component_id_is_not_explicit')
}

if (!markup.includes('lsui-sc-pressable')) {
  throw new Error('shared_pressable_component_id_is_not_explicit')
}

if (!markup.includes('lsui-sc-icon-button')) {
  throw new Error('shared_icon_button_component_id_is_not_explicit')
}

if (!markup.includes('lsui-sc-spinner')) {
  throw new Error('shared_spinner_component_id_is_not_explicit')
}

if (!markup.includes('lsui-sc-status-chip')) {
  throw new Error('shared_status_chip_component_id_is_not_explicit')
}

if (!markup.includes('lsui-sc-state-panel')) {
  throw new Error('shared_state_panel_component_id_is_not_explicit')
}

for (const componentId of [
  'lsui-sc-action-link',
  'lsui-sc-auth-notice',
  'lsui-sc-auth-token-digits',
  'lsui-sc-avatar',
  'lsui-sc-field-root',
  'lsui-sc-filter-pills',
  'lsui-sc-compound-control',
  'lsui-sc-search-input',
  'lsui-sc-section-header',
  'lsui-sc-select-input',
  'lsui-sc-segmented-control',
  'lsui-sc-textarea-input',
  'lsui-sc-text-input',
]) {
  if (!markup.includes(componentId)) {
    throw new Error(`shared_component_id_is_not_explicit_${componentId}`)
  }
}

if (buttonClasses.includes(ConsumerSurface.styledComponentId)) {
  throw new Error('shared_button_component_id_collides_with_consumer')
}

const generatedClasses = buttonClasses.filter(
  (className) => !className.startsWith('lsui-'),
)

if (generatedClasses.length !== 2) {
  throw new Error(
    `expected_two_generated_button_classes_received_${generatedClasses.length}`,
  )
}

if (
  generatedClasses.some(
    (generatedClass) => !collectedCss.includes(`.${generatedClass}{`),
  )
) {
  throw new Error('shared_button_styles_missing_from_collected_ssr_css')
}

if (!collectedCss.includes('border-radius:999px')) {
  throw new Error('shared_button_declarations_missing_from_collected_ssr_css')
}

console.log(
  'SSR smoke passed for packaged actions, fields, filters and auth components.',
)
