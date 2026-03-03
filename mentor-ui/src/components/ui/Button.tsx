import React from 'react'
import { applyFocusRing, clearFocusRing } from './internal/focusRing'
import './Button.css'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize    = 'xl' | 'md' | 'sm'
export type ButtonIntent  = 'default' | 'success' | 'warning' | 'error'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?:    ButtonSize
  /** Only applies to `secondary` — `primary` always uses the accent colour */
  intent?:  ButtonIntent
  leadingIcon?:  React.ReactNode
  trailingIcon?: React.ReactNode
  children?: React.ReactNode
}

/** Focus ring colour per intent (secondary). Primary always uses the accent. */
const focusColor: Record<ButtonIntent, string> = {
  default: 'var(--color-purple-500)',
  success: 'var(--color-green-400)',
  warning: 'var(--color-orange-500)',
  error:   'var(--color-red-500)',
}

function cx(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(' ')
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size    = 'md',
      intent  = 'default',
      leadingIcon,
      trailingIcon,
      disabled,
      className = '',
      style,
      onFocus,
      onBlur,
      children,
      ...rest
    },
    ref,
  ) => {
    const ringColor = variant === 'primary' ? 'var(--color-purple-500)' : focusColor[intent]

    return (
      <button
        ref={ref}
        disabled={disabled}
        style={style}
        className={cx(
          'gradient-button',
          `gradient-button--${variant}`,
          `gradient-button--${size}`,
          variant === 'secondary' && `gradient-button--intent-${intent}`,
          className,
        )}
        onFocus={(e) => { applyFocusRing(e.currentTarget, ringColor, '2px'); onFocus?.(e) }}
        onBlur={(e)  => { clearFocusRing(e.currentTarget);                   onBlur?.(e)  }}
        {...rest}
      >
        {leadingIcon && (
          <span className="gradient-button__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        {children && <span className="gradient-button__label">{children}</span>}
        {trailingIcon && (
          <span className="gradient-button__icon" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
export default Button
