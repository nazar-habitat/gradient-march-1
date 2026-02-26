import React from 'react'
import { applyFocusRing, clearFocusRing } from './internal/focusRing'

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

// ─── Design tokens ────────────────────────────────────────────────────────────

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  xl: { height: '64px', paddingInline: '24px', paddingBlock: '20px', gap: '10px', borderRadius: '16px' },
  md: { height: '40px', paddingInline: '16px', paddingBlock: '10px', gap: '8px',  borderRadius: '12px'  },
  sm: { height: '32px', paddingInline: '12px', paddingBlock: '8px',  gap: '6px',  borderRadius: '8px'  },
}

const iconSize: Record<ButtonSize, string> = {
  xl: 'w-6 h-6',
  md: 'w-5 h-5',
  sm: 'w-5 h-5',
}

const textSize: Record<ButtonSize, string> = {
  xl: 'text-base font-semibold leading-6',
  md: 'text-sm font-medium leading-5',
  sm: 'text-[13px] font-medium leading-4',
}

const secondaryTextColor: Record<ButtonIntent, string> = {
  default: 'text-white',
  success: 'text-green-400',
  warning: 'text-orange-500',
  error:   'text-red-500',
}

/** Focus ring colour per intent (secondary). Primary always uses the accent. */
const focusColor: Record<ButtonIntent, string> = {
  default: 'var(--color-purple-500)',
  success: 'var(--color-green-400)',
  warning: 'var(--color-orange-500)',
  error:   'var(--color-red-500)',
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
      style: styleProp,
      onFocus,
      onBlur,
      children,
      ...rest
    },
    ref,
  ) => {
    const ringColor = variant === 'primary' ? 'var(--color-purple-500)' : focusColor[intent]

    const base =
      'relative inline-flex items-center justify-center ' +
      'cursor-pointer select-none transition-colors duration-150 ' +
      'disabled:cursor-not-allowed'

    let variantClasses = ''

    if (variant === 'primary') {
      variantClasses = [
        textSize[size],
        'text-white',
        'bg-purple-500 hover:bg-purple-600 active:bg-purple-700',
        'disabled:bg-neutral-800 disabled:text-neutral-600',
      ].join(' ')
    }

    if (variant === 'secondary') {
      variantClasses = [
        textSize[size],
        secondaryTextColor[intent],
        'bg-neutral-900 border border-neutral-800',
        'hover:bg-neutral-850 active:bg-neutral-800',
        'disabled:bg-transparent disabled:border-neutral-600 disabled:text-neutral-600',
      ].join(' ')
    }

    const iconClass = iconSize[size]

    return (
      <button
        ref={ref}
        disabled={disabled}
        style={{ outline: 'none', ...sizeStyles[size], ...styleProp }}
        className={[base, variantClasses, className].filter(Boolean).join(' ')}
        onFocus={(e) => { applyFocusRing(e.currentTarget, ringColor, '2px'); onFocus?.(e) }}
        onBlur={(e)  => { clearFocusRing(e.currentTarget);                   onBlur?.(e)  }}
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

Button.displayName = 'Button'
export default Button
