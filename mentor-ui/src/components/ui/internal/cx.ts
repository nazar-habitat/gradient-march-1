/**
 * Joins truthy class names into a single space-separated string.
 * Shared utility — replaces the three identical inline copies in
 * Checkbox, MultiSelectMenu, and SelectMenu.
 */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
