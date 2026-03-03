import React from 'react'
import { applyFocusRing, clearFocusRing } from './internal/focusRing'
import './IconButton.css'

// ─── Types ────────────────────────────────────────────────────────────────────

export type IconButtonVariant = 'primary' | 'secondary' | 'transparent' | 'removable'
export type IconButtonSize    = 'xl' | 'md' | 'sm'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button */
  variant?: IconButtonVariant
  /** Size of the button */
  size?: IconButtonSize
  /**
   * The icon to display. Use any ReactNode — lucide-react, @ant-design/icons,
   * or a raw <svg>. The icon MUST use currentColor for fill/stroke so it
   * inherits the button's interactive colour states automatically.
   */
  icon: React.ReactNode
  /**
   * Accessible label — required since there is no visible text.
   * Maps to the native aria-label attribute.
   */
  'aria-label': string
}

/**
 * Primary / secondary sit on a filled background so the ring floats 4 px
 * outside. Transparent / removable are borderless with a smaller hit-target,
 * so we pull the ring in to 2 px to keep it tight around the icon.
 */
function focusOffset(variant: IconButtonVariant) {
  return variant === 'transparent' || variant === 'removable' ? '2px' : '4px'
}

function cx(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(' ')
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * IconButton
 *
 * An icon-only button matching the Gradient Design System.
 * Pass any lucide-react (or other currentColor) icon via the `icon` prop.
 *
 * @example
 * <IconButton icon={<Plus />} aria-label="Add item" />
 * <IconButton variant="secondary" size="sm" icon={<X />} aria-label="Close" />
 * <IconButton variant="transparent" icon={<Settings />} aria-label="Settings" />
 * <IconButton variant="removable"   icon={<X />}        aria-label="Remove"   />
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = 'primary',
      size    = 'md',
      icon,
      disabled,
      className = '',
      style,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        style={style}
        className={cx(
          'gradient-icon-button',
          `gradient-icon-button--${variant}`,
          `gradient-icon-button--${size}`,
          className,
        )}
        onFocus={(e) => {
          applyFocusRing(e.currentTarget, 'var(--color-purple-500)', focusOffset(variant))
          onFocus?.(e)
        }}
        onBlur={(e) => {
          clearFocusRing(e.currentTarget)
          onBlur?.(e)
        }}
        {...rest}
      >
        <span className="gradient-icon-button__icon" aria-hidden="true">
          {icon}
        </span>
      </button>
    )
  },
)

IconButton.displayName = 'IconButton'
export default IconButton
