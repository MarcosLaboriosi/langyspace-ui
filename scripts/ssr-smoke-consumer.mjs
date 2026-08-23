// Runs inside the temporary smoke consumer, not in this repository.
//
// Consumers prerender in Node while bundling the same package for the browser.
// Component ids generated at runtime depend on how many styled components each
// styled-components instance created before, so they change with module
// evaluation order: the class in the prerendered markup stops matching the one
// the browser injects, and the button renders unstyled. Published ids must be
// explicit and identical in every render.
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, styled } from 'styled-components'

// Created before the package is evaluated, like a real application would. The
// dynamic import below is what keeps that order; a static import would hoist
// the package ahead of this component.
const ConsumerSurface = styled.div`
  color: #123456;
`

const { Button } = await import('@langyspace/ui')

const sheet = new ServerStyleSheet()
let markup
let collectedCss

try {
  markup = renderToString(
    sheet.collectStyles(
      createElement(
        ConsumerSurface,
        null,
        createElement(Button, { size: 'lg', variant: 'primary' }, 'SSR'),
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

if (!buttonClasses.includes('lsui-button')) {
  throw new Error('shared_button_public_class_missing_from_ssr_markup')
}

if (!buttonClasses.includes('lsui-sc-button')) {
  throw new Error('shared_button_component_id_is_not_explicit')
}

if (buttonClasses.includes(ConsumerSurface.styledComponentId)) {
  throw new Error('shared_button_component_id_collides_with_consumer')
}

const generatedClasses = buttonClasses.filter(
  (className) => !className.startsWith('lsui-'),
)

if (generatedClasses.length !== 1) {
  throw new Error(
    `expected_one_generated_button_class_received_${generatedClasses.length}`,
  )
}

if (!collectedCss.includes(`.${generatedClasses[0]}{`)) {
  throw new Error('shared_button_styles_missing_from_collected_ssr_css')
}

if (!collectedCss.includes('border-radius:999px')) {
  throw new Error('shared_button_declarations_missing_from_collected_ssr_css')
}

console.log('SSR smoke passed for the packaged Button.')
