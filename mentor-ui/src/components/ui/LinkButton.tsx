import React from 'react'
import { applyFocusRing, clearFocusRing } from './internal/focusRing'
import './LinkButton.css'

// ─── Props ────────────────────────────────────────────────────────────────────

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Render the link in a non-interactive disabled state.
   * `aria-disabled` is set and click / keyboard navigation is suppressed.
   */
  disabled?: boolean
  children?: React.ReactNode
}

function cx(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(' ')
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * LinkButton
 *
 * A navigational text link styled per the Gradient Design System.
 * Renders as an `<a>` element — pass `href` for real navigation or omit it
 * for in-page interactions (the element remains focusable/clickable).
 */
export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      disabled,
      className = '',
      style,
      onFocus,
      onBlur,
      onClick,
      children,
      ...rest
    },
    ref,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault()
        return
      }
      // Prevent navigation for placeholder hrefs (# or empty) so LinkButton can be used as a button
      const href = e.currentTarget.getAttribute('href')
      if (href === '#' || href === '') {
        e.preventDefault()
      }
      onClick?.(e)
    }

    return (
      <a
        ref={ref}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        style={style}
        className={cx(
          'gradient-link-button',
          disabled && 'gradient-link-button--disabled',
          className,
        )}
        onFocus={(e) => {
          if (e.currentTarget.matches(':focus-visible')) {
            applyFocusRing(e.currentTarget, 'var(--color-purple-500)', '4px')
          }
          onFocus?.(e)
        }}
        onBlur={(e) => {
          clearFocusRing(e.currentTarget)
          onBlur?.(e)
        }}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </a>
    )
  },
)

LinkButton.displayName = 'LinkButton'
export default LinkButton
