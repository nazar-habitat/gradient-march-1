import React from 'react'
import { applyFocusRing, clearFocusRing } from './internal/focusRing'
import type { ButtonIntent, ButtonSize } from './Button'

export type { ButtonIntent, ButtonSize }

export interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?:   ButtonSize
  intent?: ButtonIntent
  leadingIcon?:  React.ReactNode
  trailingIcon?: React.ReactNode
  children?: React.ReactNode
}

// ─── Design tokens ────────────────────────────────────────────────────────────

/** 2px gap between icon and label — uniform across all sizes */
const GAP = '2px'

const iconSize: Record<ButtonSize, string> = {
  xl: 'w-4 h-4',
  md: 'w-4 h-4',
  sm: 'w-4 h-4',
}

const textSize: Record<ButtonSize, string> = {
  xl: 'text-base font-semibold leading-6',
  md: 'text-sm font-medium leading-5',
  sm: 'text-[13px] font-medium leading-4',
}

/**
 * Default / hover / pressed colours per intent.
 * Focus ring is always the accent token regardless of intent.
 */
const intentColors: Record<ButtonIntent, {
  default: string
  hover:   string
  pressed: string
}> = {
  default: {
    default: 'var(--color-purple-400)',
    hover:   'var(--color-purple-300)',
    pressed: 'var(--color-purple-500)',
  },
  success: {
    default: 'var(--color-green-400)',
    hover:   'var(--color-green-300)',
    pressed: 'var(--color-green-500)',
  },
  warning: {
    default: 'var(--color-orange-400)',
    hover:   'var(--color-orange-300)',
    pressed: 'var(--color-orange-700)',
  },
  error: {
    default: 'var(--color-red-500)',
    hover:   'var(--color-red-300)',
    pressed: 'var(--color-red-600)',
  },
}

const DISABLED_COLOR = 'var(--color-neutral-600)'

// ─── Component ────────────────────────────────────────────────────────────────

export const TextButton = React.forwardRef<HTMLButtonElement, TextButtonProps>(
  (
    {
      size   = 'md',
      intent = 'default',
      leadingIcon,
      trailingIcon,
      disabled,
      className = '',
      style: styleProp,
      onFocus,
      onBlur,
      children,
      ...rest
    },
    ref,
  ) => {
    const { default: defaultColor, hover, pressed } = intentColors[intent]

    /**
     * Hover / pressed colours are set via JS mouse handlers (inline style) to
     * avoid Tailwind @layer utilities being overridden by Storybook's unlayered
     * CSS reset. Focus ring likewise uses onFocus/onBlur + el.matches(':focus-visible').
     */
    const base =
      'inline-flex items-center ' +
      'bg-transparent border-0 p-0 ' +
      'cursor-pointer select-none ' +
      'transition-colors duration-150 ' +
      'rounded-[6px] ' +
      'disabled:cursor-not-allowed'

    const iconClass = iconSize[size]

    return (
      <button
        ref={ref}
        disabled={disabled}
        style={{
          outline: 'none',
          gap: GAP,
          color: disabled ? DISABLED_COLOR : defaultColor,
          ...styleProp,
        }}
        className={[base, textSize[size], className].filter(Boolean).join(' ')}
        onFocus={(e)  => { applyFocusRing(e.currentTarget, 'var(--color-purple-500)', '4px'); onFocus?.(e) }}
        onBlur={(e)   => { clearFocusRing(e.currentTarget);                                  onBlur?.(e)  }}
        onMouseEnter={(e) => {
          if (!disabled) (e.currentTarget as HTMLButtonElement).style.color = hover
          rest.onMouseEnter?.(e)
        }}
        onMouseLeave={(e) => {
          if (!disabled) (e.currentTarget as HTMLButtonElement).style.color = defaultColor
          rest.onMouseLeave?.(e)
        }}
        onMouseDown={(e) => {
          if (!disabled) (e.currentTarget as HTMLButtonElement).style.color = pressed
          rest.onMouseDown?.(e)
        }}
        onMouseUp={(e) => {
          if (!disabled) (e.currentTarget as HTMLButtonElement).style.color = hover
          rest.onMouseUp?.(e)
        }}
        {...rest}
      >
        {leadingIcon && (
          <span className={['shrink-0 inline-flex items-center justify-center', iconClass].join(' ')} aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        {children && <span className="whitespace-nowrap">{children}</span>}
        {trailingIcon && (
          <span className={['shrink-0 inline-flex items-center justify-center', iconClass].join(' ')} aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </button>
    )
  },
)

TextButton.displayName = 'TextButton'
export default TextButton
