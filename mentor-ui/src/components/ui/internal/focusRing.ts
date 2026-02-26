/**
 * JS-driven focus ring helpers — shared across all interactive components.
 *
 * We drive focus rings via JS (rather than CSS :focus-visible) to avoid the
 * Storybook CSS layer conflict where unlayered resets clobber Tailwind utilities.
 *
 * @param el     - The element to apply / clear the ring on.
 * @param color  - CSS colour string. Defaults to the design-system accent token.
 * @param offset - outline-offset value. Defaults to '2px'.
 */
export function applyFocusRing(
  el:     HTMLElement,
  color  = 'var(--color-purple-500)',
  offset = '2px',
): void {
  if (el.matches(':focus-visible')) {
    el.style.outline       = `1.5px solid ${color}`
    el.style.outlineOffset = offset
  }
}

export function clearFocusRing(el: HTMLElement): void {
  el.style.outline       = 'none'
  el.style.outlineOffset = '0px'
}
