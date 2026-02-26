import React from 'react'
import { applyFocusRing, clearFocusRing } from './internal/focusRing'

// ─── Props ────────────────────────────────────────────────────────────────────

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Render the link in a non-interactive disabled state.
   * `aria-disabled` is set and click / keyboard navigation is suppressed.
   */
  disabled?: boolean
  children?: React.ReactNode
}

// ─── Design tokens ────────────────────────────────────────────────────────────

/** Text colours per interactive state */
const COLORS = {
  default:  'var(--color-neutral-100)',   // fg-secondary  (#dedede)
  hover:    '#ffffff',    // fg-primary    (#ffffff)
  pressed:  'var(--color-neutral-300)',   // fg-quaternary (#adadad)
  disabled: 'var(--color-neutral-600)',   // fg-disabled   (#636363)
} as const

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * LinkButton
 *
 * A navigational text link styled per the Gradient Design System.
 * Renders as an `<a>` element — pass `href` for real navigation or omit it
 * for in-page interactions (the element remains focusable/clickable).
 *
 * Hover / pressed / focus states are driven by JS handlers rather than
 * Tailwind pseudo-utilities, to avoid the CSS-layer conflict with Storybook's
 * unlayered reset.
 */
export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      disabled,
      className = '',
      style: styleProp,
      onFocus,
      onBlur,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      children,
      ...rest
    },
    ref,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) { e.preventDefault(); return }
      onClick?.(e)
    }

    return (
      <a
        ref={ref}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        style={{
          outline: 'none',
          color:   disabled ? COLORS.disabled : COLORS.default,
          ...styleProp,
        }}
        className={[
          'inline',
          'text-[13px] font-normal leading-5',
          '[text-decoration:underline] [text-decoration-skip-ink:none]',
          'rounded-[4px]',
          'transition-colors duration-150',
          disabled ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer',
          className,
        ].filter(Boolean).join(' ')}
        onFocus={(e)  => { applyFocusRing(e.currentTarget, 'var(--color-purple-500)', '4px'); onFocus?.(e) }}
        onBlur={(e)   => { clearFocusRing(e.currentTarget);                                  onBlur?.(e)  }}
        onMouseEnter={(e) => {
          if (!disabled) e.currentTarget.style.color = COLORS.hover
          onMouseEnter?.(e)
        }}
        onMouseLeave={(e) => {
          if (!disabled) e.currentTarget.style.color = COLORS.default
          onMouseLeave?.(e)
        }}
        onMouseDown={(e) => {
          if (!disabled) e.currentTarget.style.color = COLORS.pressed
          onMouseDown?.(e)
        }}
        onMouseUp={(e) => {
          // cursor still over element → back to hover
          if (!disabled) e.currentTarget.style.color = COLORS.hover
          onMouseUp?.(e)
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
