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

/** Focus ring colour: always primary (keyboard focus only). */
const FOCUS_RING_COLOR = 'var(--color-purple-500)'

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
        onFocus={(e) => {
          if (e.currentTarget.matches(':focus-visible')) {
            applyFocusRing(e.currentTarget, FOCUS_RING_COLOR, '2px')
          }
          onFocus?.(e)
        }}
        onBlur={(e) => {
          clearFocusRing(e.currentTarget)
          onBlur?.(e)
        }}
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
