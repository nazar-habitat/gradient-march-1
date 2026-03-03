/**
 * Focus-ring helpers
 *
 * Applies / clears a coloured box-shadow ring around an element on focus.
 * Used by Button, IconButton, TextButton, and LinkButton.
 */

/**
 * Apply a focus ring (box-shadow) to an element.
 *
 * @param el     – The target element
 * @param color  – CSS colour for the ring (e.g. `var(--color-purple-500)`)
 * @param offset – Gap between the element and the ring (e.g. `'2px'` or `'4px'`)
 */
export function applyFocusRing(
  el: HTMLElement,
  color: string,
  offset: string = '2px',
): void {
  el.style.boxShadow = `0 0 0 ${offset} ${color}`
}

/**
 * Remove the focus ring from an element.
 */
export function clearFocusRing(el: HTMLElement): void {
  el.style.boxShadow = ''
}
