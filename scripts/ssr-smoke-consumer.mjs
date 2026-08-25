import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, styled } from 'styled-components'

const ConsumerSurface = styled.div`
  color: #123456;
`

const {
  AuthNotice,
  AuthTokenDigits,
  Button,
  EmptyState,
  FieldRoot,
  FilterPills,
  IconButton,
  LoadingState,
  Pressable,
  SearchInput,
  SegmentedControl,
  Spinner,
  StatePanel,
  StatusChip,
  TextInput,
} = await import('@langyspace/ui')

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
        createElement(
          IconButton,
          { 'aria-label': 'Open menu' },
          createElement('span', { 'aria-hidden': true }, '+'),
        ),
        createElement(Pressable, null, 'Pressable SSR'),
        createElement(Spinner, { size: 'md' }),
        createElement(StatusChip, { tone: 'success' }, 'Confirmed'),
        createElement(EmptyState, { title: 'Empty' }),
        createElement(LoadingState, { title: 'Loading' }),
        createElement(StatePanel, { state: 'error', title: 'Error' }),
        createElement(
          FieldRoot,
          { label: 'Name' },
          createElement(TextInput, { defaultValue: 'Maria' }),
        ),
        createElement(SearchInput, {
          'aria-label': 'Search',
          defaultValue: 'Maria',
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
  'lsui-sc-auth-notice',
  'lsui-sc-auth-token-digits',
  'lsui-sc-field-root',
  'lsui-sc-filter-pills',
  'lsui-sc-search-input',
  'lsui-sc-segmented-control',
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
