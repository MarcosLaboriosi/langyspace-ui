import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type Ref,
} from 'react'
import { createPortal } from 'react-dom'
import { IconButton } from '../../atoms/IconButton'
import { IconSlot } from '../../internal/IconSlot'
import { Spinner } from '../../primitives/Spinner'
import { getActionMenuPosition, type ActionMenuPosition } from './position'
import * as Styled from './styles'
import type { ActionMenuItem, ActionMenuProps } from './types'

type FocusIntent = 'first' | 'last'

const tabbableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const subscribeToClient = () => () => undefined

const assignRef = <Element,>(
  ref: Ref<Element> | undefined,
  node: Element | null,
) => {
  if (typeof ref === 'function') {
    ref(node)
  } else if (ref) {
    ref.current = node
  }
}

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

const normalizeItems = (items: readonly ActionMenuItem[]) => [
  ...items.filter((item) => item.tone !== 'danger'),
  ...items.filter((item) => item.tone === 'danger'),
]

const getEnabledItems = (items: readonly ActionMenuItem[]) =>
  items.filter((item) => !item.disabled && !item.isLoading)

function EllipsisGlyph() {
  return (
    <svg aria-hidden="true" height="18" viewBox="0 0 18 18" width="18">
      <circle cx="3.5" cy="9" fill="currentColor" r="1.25" />
      <circle cx="9" cy="9" fill="currentColor" r="1.25" />
      <circle cx="14.5" cy="9" fill="currentColor" r="1.25" />
    </svg>
  )
}

export function ActionMenu({
  align = 'end',
  defaultOpen = false,
  items,
  onOpenChange,
  open,
  ref,
  size = 'md',
  triggerLabel,
  ...nativeProps
}: ActionMenuProps) {
  const canUseDOM = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  )
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  const [position, setPosition] = useState<ActionMenuPosition | null>(null)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const menuId = useId()
  const triggerId = useId()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef(new Map<string, HTMLButtonElement>())
  const focusIntentRef = useRef<FocusIntent>('first')
  const normalizedItems = useMemo(() => normalizeItems(items), [items])
  const isMenuOpen = isOpen && canUseDOM && normalizedItems.length > 0
  const enabledItems = useMemo(
    () => getEnabledItems(normalizedItems),
    [normalizedItems],
  )
  const firstDangerIndex = normalizedItems.findIndex(
    (item) => item.tone === 'danger',
  )

  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node
      assignRef(ref, node)
    },
    [ref],
  )

  const requestOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setInternalOpen(nextOpen)
      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange],
  )

  const focusTrigger = useCallback(() => {
    if (triggerRef.current?.isConnected) {
      triggerRef.current.focus({ preventScroll: true })
    }
  }, [])

  const focusItem = useCallback((item: ActionMenuItem | undefined) => {
    if (!item) return false

    const node = itemRefs.current.get(item.id)
    if (!node?.isConnected) return false

    setActiveItemId(item.id)
    node.focus({ preventScroll: true })
    return true
  }, [])

  const focusRelativeToTrigger = useCallback((backward: boolean) => {
    const trigger = triggerRef.current
    if (!trigger) return

    const menu = menuRef.current
    const tabbables = Array.from(
      document.querySelectorAll<HTMLElement>(tabbableSelector),
    ).filter((element) => isTabbable(element) && !menu?.contains(element))
    const triggerIndex = tabbables.indexOf(trigger)
    const target = tabbables[triggerIndex + (backward ? -1 : 1)]

    if (target) target.focus({ preventScroll: true })
    else trigger.blur()
  }, [])

  useLayoutEffect(() => {
    if (!isMenuOpen || !menuRef.current || !triggerRef.current) {
      setPosition(null)
      return
    }

    const nextPosition = getActionMenuPosition({
      align,
      menu: menuRef.current.getBoundingClientRect(),
      trigger: triggerRef.current.getBoundingClientRect(),
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
    })
    setPosition(nextPosition)
  }, [align, isMenuOpen, normalizedItems, size])

  useEffect(() => {
    if (!isMenuOpen || !position || !menuRef.current) return

    const target =
      focusIntentRef.current === 'last' ? enabledItems.at(-1) : enabledItems[0]
    focusIntentRef.current = 'first'

    if (!focusItem(target)) {
      setActiveItemId(null)
      menuRef.current.focus({ preventScroll: true })
    }
  }, [enabledItems, focusItem, isMenuOpen, position])

  useEffect(() => {
    if (!isMenuOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return
      if (
        rootRef.current?.contains(event.target) ||
        menuRef.current?.contains(event.target)
      ) {
        return
      }

      requestOpen(false)
    }

    const handleViewportChange = (event: Event) => {
      if (
        event.type === 'scroll' &&
        event.target instanceof Node &&
        menuRef.current?.contains(event.target)
      ) {
        return
      }

      const shouldRestore = Boolean(
        document.activeElement &&
        menuRef.current?.contains(document.activeElement),
      )
      requestOpen(false)
      if (shouldRestore) focusTrigger()
    }

    document.addEventListener('pointerdown', handlePointerDown, true)
    document.addEventListener('scroll', handleViewportChange, true)
    window.addEventListener('resize', handleViewportChange)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true)
      document.removeEventListener('scroll', handleViewportChange, true)
      window.removeEventListener('resize', handleViewportChange)
    }
  }, [focusTrigger, isMenuOpen, requestOpen])

  if (normalizedItems.length === 0) {
    return <Styled.Root {...nativeProps} ref={setRootRef} />
  }

  const openWithIntent = (intent: FocusIntent) => {
    focusIntentRef.current = intent
    if (isOpen) {
      const target = intent === 'last' ? enabledItems.at(-1) : enabledItems[0]
      if (!focusItem(target)) menuRef.current?.focus({ preventScroll: true })
      return
    }

    requestOpen(true)
  }

  const handleTriggerKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return

    event.preventDefault()
    openWithIntent(event.key === 'ArrowUp' ? 'last' : 'first')
  }

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      requestOpen(false)
      focusTrigger()
      return
    }

    if (event.key === 'Tab') {
      event.preventDefault()
      requestOpen(false)
      focusRelativeToTrigger(event.shiftKey)
      return
    }

    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    if (enabledItems.length === 0) return

    const activeIndex = enabledItems.findIndex(
      (item) => item.id === activeItemId,
    )
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? enabledItems.length - 1
          : event.key === 'ArrowDown'
            ? (activeIndex + 1 + enabledItems.length) % enabledItems.length
            : (activeIndex - 1 + enabledItems.length) % enabledItems.length

    focusItem(enabledItems[nextIndex])
  }

  const menuStyle: CSSProperties = {
    left: position?.left,
    maxHeight: position?.maxHeight,
    top: position?.top,
    visibility: position ? 'visible' : 'hidden',
  }

  return (
    <Styled.Root {...nativeProps} ref={setRootRef}>
      <IconButton
        aria-controls={isMenuOpen ? menuId : undefined}
        aria-expanded={isMenuOpen}
        aria-haspopup="menu"
        aria-label={triggerLabel}
        id={triggerId}
        ref={triggerRef}
        size={size}
        variant="subtle"
        onClick={() => {
          if (isOpen) requestOpen(false)
          else openWithIntent('first')
        }}
        onKeyDown={handleTriggerKeyDown}
      >
        <EllipsisGlyph />
      </IconButton>

      {isMenuOpen
        ? createPortal(
            <Styled.Menu
              $align={align}
              $placement={position?.placement ?? 'bottom'}
              aria-labelledby={triggerId}
              data-align={align}
              data-placement={position?.placement}
              data-ui-action-menu="true"
              id={menuId}
              ref={menuRef}
              role="menu"
              style={menuStyle}
              tabIndex={-1}
              onKeyDown={handleMenuKeyDown}
            >
              {normalizedItems.map((item, index) => {
                const isUnavailable = Boolean(item.disabled || item.isLoading)
                const shouldSeparate =
                  index === firstDangerIndex && firstDangerIndex > 0

                return (
                  <div key={item.id} role="none">
                    {shouldSeparate ? (
                      <Styled.Separator role="separator" />
                    ) : null}
                    <Styled.MenuItem
                      $size={size}
                      $tone={item.tone ?? 'neutral'}
                      aria-busy={item.isLoading || undefined}
                      aria-disabled={isUnavailable || undefined}
                      data-action-menu-item-id={item.id}
                      data-loading={item.isLoading ? 'true' : undefined}
                      disabled={isUnavailable}
                      ref={(node) => {
                        if (node) itemRefs.current.set(item.id, node)
                        else itemRefs.current.delete(item.id)
                      }}
                      role="menuitem"
                      tabIndex={item.id === activeItemId ? 0 : -1}
                      onClick={() => {
                        requestOpen(false)
                        focusTrigger()
                        item.onSelect()
                      }}
                      onFocus={() => setActiveItemId(item.id)}
                    >
                      <IconSlot
                        icon={item.isLoading ? <Spinner /> : item.icon}
                      />
                      <Styled.ItemLabel>{item.label}</Styled.ItemLabel>
                    </Styled.MenuItem>
                  </div>
                )
              })}
            </Styled.Menu>,
            document.body,
          )
        : null}
    </Styled.Root>
  )
}

export type {
  ActionMenuAlign,
  ActionMenuItem,
  ActionMenuProps,
  ActionMenuSize,
  ActionMenuTone,
} from './types'
