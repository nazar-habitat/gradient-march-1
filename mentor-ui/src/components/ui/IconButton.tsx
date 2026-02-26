import React from 'react'
import { applyFocusRing, clearFocusRing } from './internal/focusRing'

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

// ─── Design tokens ────────────────────────────────────────────────────────────

type StateTokens = { bg: string; border: string; iconColor: string }
type VariantTokens = {
  default:  StateTokens
  hover:    StateTokens
  pressed:  StateTokens
  disabled: StateTokens
}

const variantTokens: Record<IconButtonVariant, VariantTokens> = {
  primary: {
    default:  { bg: 'var(--color-purple-500)',         border: 'transparent',                   iconColor: '#ffffff'  },
    hover:    { bg: 'var(--color-purple-600)',   border: 'transparent',                   iconColor: '#ffffff'  },
    pressed:  { bg: 'var(--color-purple-700)', border: 'transparent',                   iconColor: '#ffffff'  },
    disabled: { bg: 'var(--color-neutral-800)',       border: 'transparent',                   iconColor: 'var(--color-neutral-600)' },
  },
  secondary: {
    default:  { bg: 'var(--color-neutral-900)',  border: 'var(--color-neutral-700)', iconColor: '#ffffff'  },
    hover:    { bg: 'var(--color-neutral-850)',  border: 'var(--color-neutral-700)', iconColor: '#ffffff'  },
    pressed:  { bg: 'var(--color-neutral-800)',  border: 'var(--color-neutral-700)', iconColor: '#ffffff'  },
    disabled: { bg: 'transparent',              border: 'var(--color-neutral-800)', iconColor: 'var(--color-neutral-600)' },
  },
  transparent: {
    default:  { bg: 'transparent', border: 'transparent', iconColor: 'var(--color-purple-400)'  },
    hover:    { bg: 'transparent', border: 'transparent', iconColor: 'var(--color-purple-300)' },
    pressed:  { bg: 'transparent', border: 'transparent', iconColor: 'var(--color-purple-500)'  },
    disabled: { bg: 'transparent', border: 'transparent', iconColor: 'var(--color-neutral-600)'},
  },
  removable: {
    default:  { bg: 'transparent', border: 'transparent', iconColor: 'var(--color-neutral-100)' },
    hover:    { bg: 'transparent', border: 'transparent', iconColor: '#ffffff'  },
    pressed:  { bg: 'transparent', border: 'transparent', iconColor: 'var(--color-neutral-300)' },
    disabled: { bg: 'transparent', border: 'transparent', iconColor: 'var(--color-neutral-600)' },
  },
}

/** Button dimensions per size */
const sizeStyles: Record<IconButtonSize, React.CSSProperties> = {
  xl: { width: 48, height: 48, padding: 10, borderRadius: '16px' },
  md: { width: 40, height: 40, padding:  8, borderRadius: '12px'  },
  sm: { width: 32, height: 32, padding:  4, borderRadius: '8px'  },
}

/** Icon pixel size per button size */
const iconSizePx: Record<IconButtonSize, number> = { xl: 24, md: 20, sm: 20 }

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Primary / secondary sit on a filled background so the ring floats 4 px
 * outside. Transparent / removable are borderless with a smaller hit-target,
 * so we pull the ring in to 2 px to keep it tight around the icon.
 */
function focusOffset(variant: IconButtonVariant) {
  return variant === 'transparent' || variant === 'removable' ? '2px' : '4px'
}

function applyTokens(el: HTMLButtonElement, tokens: StateTokens) {
  el.style.backgroundColor = tokens.bg
  el.style.borderColor     = tokens.border
  el.style.color           = tokens.iconColor
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
      style: styleProp,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      ...rest
    },
    ref,
  ) => {
    const tokens  = variantTokens[variant]
    const initial = disabled ? tokens.disabled : tokens.default
    const iconPx  = iconSizePx[size]

    // Internal ref for the useEffect below; forwarded ref gets the same element
    // via useImperativeHandle so external callers still work as expected.
    const innerRef = React.useRef<HTMLButtonElement>(null)
    React.useImperativeHandle(ref, () => innerRef.current!, [])

    // Reset colour tokens whenever `disabled` or `variant` changes. This fixes
    // stale hover/pressed inline styles that can persist if `disabled` flips
    // while the cursor is over the element.
    React.useEffect(() => {
      const el = innerRef.current
      if (!el) return
      applyTokens(el, disabled ? tokens.disabled : tokens.default)
    }, [disabled, tokens])

    return (
      <button
        ref={innerRef}
        disabled={disabled}
        style={{
          outline:         'none',
          boxSizing:       'border-box',
          border:          '1px solid',
          cursor:          disabled ? 'not-allowed' : 'pointer',
          backgroundColor: initial.bg,
          borderColor:     initial.border,
          color:           initial.iconColor,
          ...sizeStyles[size],
          ...styleProp,
        }}
        className={[
          'inline-flex items-center justify-center',
          'select-none shrink-0',
          'transition-colors duration-150',
          className,
        ].filter(Boolean).join(' ')}
        onFocus={(e) => {
          applyFocusRing(e.currentTarget, 'var(--color-purple-500)', focusOffset(variant))
          onFocus?.(e)
        }}
        onBlur={(e) => {
          clearFocusRing(e.currentTarget)
          onBlur?.(e)
        }}
        onMouseEnter={(e) => {
          if (!disabled) applyTokens(e.currentTarget, tokens.hover)
          onMouseEnter?.(e)
        }}
        onMouseLeave={(e) => {
          if (!disabled) applyTokens(e.currentTarget, tokens.default)
          onMouseLeave?.(e)
        }}
        onMouseDown={(e) => {
          if (!disabled) applyTokens(e.currentTarget, tokens.pressed)
          onMouseDown?.(e)
        }}
        onMouseUp={(e) => {
          if (!disabled) applyTokens(e.currentTarget, tokens.hover)
          onMouseUp?.(e)
        }}
        {...rest}
      >
        <span
          aria-hidden="true"
          style={{ width: iconPx, height: iconPx, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        >
          {icon}
        </span>
      </button>
    )
  },
)

IconButton.displayName = 'IconButton'
export default IconButton
