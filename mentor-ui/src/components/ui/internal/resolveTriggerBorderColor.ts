/**
 * Shared border-colour logic for Select and MultiSelect triggers.
 * Returns a CSS variable reference so both components stay token-bound.
 */
export function resolveTriggerBorderColor(params: {
  disabled: boolean
  open:     boolean
  focused:  boolean
  hovered:  boolean
}): string {
  const { disabled, open, focused, hovered } = params
  if (disabled) return 'var(--color-neutral-800)'
  if (open)     return 'var(--color-neutral-400)'
  if (focused)  return 'var(--color-neutral-800)'
  if (hovered)  return 'var(--color-neutral-700)'
  return 'var(--color-neutral-800)'
}
