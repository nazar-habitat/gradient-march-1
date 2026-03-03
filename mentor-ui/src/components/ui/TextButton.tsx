import React from 'react'
import { applyFocusRing, clearFocusRing } from './internal/focusRing'
import './TextButton.css'
import type { ButtonIntent, ButtonSize } from './Button'

export type { ButtonIntent, ButtonSize }

export interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?:   ButtonSize
  intent?: ButtonIntent
  leadingIcon?:  React.ReactNode
  trailingIcon?: React.ReactNode
  children?: React.ReactNode
}

function cx(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(' ')
}

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
          'gradient-text-button',
          `gradient-text-button--${size}`,
          `gradient-text-button--intent-${intent}`,
          className,
        )}
        onFocus={(e)  => { applyFocusRing(e.currentTarget, 'var(--color-purple-500)', '4px'); onFocus?.(e) }}
        onBlur={(e)   => { clearFocusRing(e.currentTarget);                                  onBlur?.(e)  }}
        {...rest}
      >
        {leadingIcon && (
          <span className="gradient-text-button__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        {children && <span className="gradient-text-button__label">{children}</span>}
        {trailingIcon && (
          <span className="gradient-text-button__icon" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </button>
    )
  },
)

TextButton.displayName = 'TextButton'
export default TextButton
