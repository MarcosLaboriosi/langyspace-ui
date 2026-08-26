import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { createPortal } from 'react-dom'
import {
  isTopModalLayer,
  registerModalLayer,
  unregisterModalLayer,
} from './stack'
import * as Styled from './styles'
import type { ModalLayerProps } from './types'

const tabbableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const isTabbable = (element: HTMLElement) => {
  if (
    element.hidden ||
    element.closest('[inert]') ||
    element.getAttribute('aria-hidden') === 'true'
  ) {
    return false
  }

  const style = window.getComputedStyle(element)
  return style.display !== 'none' && style.visibility !== 'hidden'
}

const getTabbableElements = (panel: HTMLElement) =>
  Array.from(panel.querySelectorAll<HTMLElement>(tabbableSelector)).filter(
    isTabbable,
  )

const getPortalTarget = () =>
  document.getElementById('overlay-root') ?? document.body

const subscribeToClient = () => () => undefined

export function ModalLayer({
  children,
  closeControl,
  description,
  dismissal = 'escape-and-backdrop',
  fallbackFocusRef,
  footer,
  initialFocusRef,
  kind,
  onClose,
  open,
  panelProps,
  returnFocusRef,
  size = 'md',
  title,
}: ModalLayerProps) {
  const canUseDOM = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  )
  const titleId = useId()
  const descriptionId = useId()
  const backdropRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<ReturnType<typeof registerModalLayer> | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const backdropPressedRef = useRef(false)

  const restoreFocus = useCallback(() => {
    const target =
      returnFocusRef?.current?.isConnected === true
        ? returnFocusRef.current
        : triggerRef.current?.isConnected === true
          ? triggerRef.current
          : fallbackFocusRef?.current?.isConnected === true
            ? fallbackFocusRef.current
            : document.querySelector<HTMLElement>('main')

    target?.focus({ preventScroll: true })
  }, [fallbackFocusRef, returnFocusRef])

  const deactivate = useCallback(() => {
    const layer = layerRef.current
    if (!layer) return

    unregisterModalLayer(layer.id)
    layerRef.current = null
    restoreFocus()
  }, [restoreFocus])

  useEffect(() => {
    if (!open) {
      deactivate()
      return
    }
    if (layerRef.current || !backdropRef.current || !panelRef.current) return

    triggerRef.current = document.activeElement as HTMLElement | null
    layerRef.current = registerModalLayer(backdropRef.current)
    backdropRef.current.style.zIndex = String(800 + layerRef.current.order * 2)
    const focusTarget =
      initialFocusRef?.current ??
      panelRef.current.querySelector<HTMLElement>(
        '[data-overlay-initial-focus="true"]',
      ) ??
      getTabbableElements(panelRef.current)[0] ??
      panelRef.current
    focusTarget.focus({ preventScroll: true })
  }, [deactivate, initialFocusRef, open])

  useEffect(() => deactivate, [deactivate])

  useEffect(() => {
    if (!open) return

    const handleEscape = (event: KeyboardEvent) => {
      const layer = layerRef.current
      if (
        event.key !== 'Escape' ||
        !layer ||
        !isTopModalLayer(layer.id) ||
        !['escape-and-backdrop', 'escape-only'].includes(dismissal)
      ) {
        return
      }

      event.preventDefault()
      event.stopPropagation()
      onClose()
    }

    document.addEventListener('keydown', handleEscape, true)
    return () => document.removeEventListener('keydown', handleEscape, true)
  }, [dismissal, onClose, open])

  const portalTarget = canUseDOM ? getPortalTarget() : null
  if (!open || !portalTarget) return null

  const handlePanelKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !panelRef.current) return

    const layer = layerRef.current
    if (!layer || !isTopModalLayer(layer.id)) return

    const tabbable = getTabbableElements(panelRef.current)
    if (tabbable.length === 0) {
      event.preventDefault()
      panelRef.current.focus()
      return
    }

    const first = tabbable[0]
    const last = tabbable.at(-1) ?? first
    if (
      event.shiftKey &&
      (document.activeElement === first ||
        document.activeElement === panelRef.current)
    ) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const handleBackdropPointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    backdropPressedRef.current = event.target === event.currentTarget
  }

  const handleBackdropPointerUp = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    const layer = layerRef.current
    const shouldClose =
      backdropPressedRef.current &&
      event.target === event.currentTarget &&
      dismissal === 'escape-and-backdrop' &&
      Boolean(layer && isTopModalLayer(layer.id))
    backdropPressedRef.current = false
    if (shouldClose) onClose()
  }

  return createPortal(
    <Styled.Backdrop
      ref={backdropRef}
      $kind={kind}
      data-ui-modal-backdrop="true"
      onPointerDown={handleBackdropPointerDown}
      onPointerUp={handleBackdropPointerUp}
    >
      <Styled.Panel
        ref={panelRef}
        $kind={kind}
        $size={size}
        {...panelProps}
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={titleId}
        aria-modal="true"
        data-size={size}
        data-ui-modal-layer={kind}
        role="dialog"
        tabIndex={-1}
        onKeyDown={handlePanelKeyDown}
      >
        <Styled.Header>
          <Styled.Heading>
            <Styled.Title id={titleId}>{title}</Styled.Title>
            {description ? (
              <Styled.Description id={descriptionId}>
                {description}
              </Styled.Description>
            ) : null}
          </Styled.Heading>
          {closeControl}
        </Styled.Header>
        <Styled.Body>{children}</Styled.Body>
        {footer ? (
          <Styled.Footer data-ui-action-group="modal-footer">
            {footer}
          </Styled.Footer>
        ) : null}
      </Styled.Panel>
    </Styled.Backdrop>,
    portalTarget,
  )
}
