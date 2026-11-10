import { useEffect, type RefObject } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  '[contenteditable]',
  '[tabindex]',
]
  .map((selector) => `${selector}:not([disabled]):not([tabindex="-1"])`)
  .join(',')

function isVisible(element: HTMLElement): boolean {
  return element.offsetWidth > 0 || element.offsetHeight > 0
}

/**
 * Keeps Tab focus inside the given container while `active` is true.
 * The container itself must be focusable (`tabIndex={-1}`) so it can take
 * focus when nothing inside it is tabbable.
 */
export function useFocusTrap(
  container: RefObject<HTMLElement | null>,
  active: boolean,
): void {
  useEffect(() => {
    if (!active) return
    const node = container.current
    if (!node) return

    const getFocusable = (): HTMLElement[] =>
      Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(isVisible)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      if (focusable.length === 0) {
        event.preventDefault()
        node.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const current = document.activeElement

      // Focus sits on the dialog container (or escaped it): restart the cycle
      // at the correct end instead of letting the browser leave the dialog.
      if (!(current instanceof Node) || !node.contains(current) || current === node) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
        return
      }

      if (event.shiftKey && current === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && current === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [active, container])
}
