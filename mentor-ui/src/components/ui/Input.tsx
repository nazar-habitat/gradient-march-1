import React, { useMemo, useState } from 'react'
import { Input as AntInput, Tooltip } from 'antd'
import type { InputProps as AntInputProps } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import './input.css'

export type InputSize = 'md' | 'sm'

export interface InputProps extends Omit<AntInputProps, 'size' | 'onChange' | 'prefix' | 'suffix'> {
  size?: InputSize
  label?: string
  required?: boolean
  info?: boolean
  /** Shown in a tooltip next to the label info icon. Accepts string or ReactNode. */
  infoTooltip?: React.ReactNode
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  error?: string
  /** Simplified onChange — receives the string value directly (not the event). */
  onChange?: (value: string) => void
}

const shellPadding: Record<InputSize, React.CSSProperties> = {
  md: { paddingInline: 12, paddingBlock: 8, borderRadius: '12px' },
  sm: { paddingInline: 10, paddingBlock: 6, borderRadius: '8px' },
}

const textStyles: Record<InputSize, React.CSSProperties> = {
  md: { fontSize: 14, lineHeight: '24px' },
  sm: { fontSize: 13, lineHeight: '20px' },
}

function resolveBorderColor(params: {
  disabled: boolean
  hasError: boolean
  focused: boolean
  hovered: boolean
}) {
  const { disabled, hasError, focused, hovered } = params

  if (disabled) return 'var(--color-neutral-800)'
  if (hasError) return 'var(--color-red-500)'
  if (focused)  return 'var(--color-neutral-400)'
  if (hovered)  return 'var(--color-neutral-700)'
  return 'var(--color-neutral-800)'
}

export function Input({
  size = 'md',
  label,
  required = false,
  info = false,
  infoTooltip,
  leadingIcon,
  trailingIcon,
  error,
  disabled = false,
  onChange,
  style,
  ...rest
}: InputProps) {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const hasError = Boolean(error)

  const borderColor = useMemo(
    () => resolveBorderColor({ disabled, hasError, focused, hovered }),
    [disabled, focused, hasError, hovered],
  )

  const iconColor  = disabled ? 'var(--color-neutral-800)' : 'var(--color-neutral-400)'
  const valueColor = disabled ? 'var(--color-neutral-800)' : '#ffffff'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      {label && (
        <div style={{ alignItems: 'center', color: 'var(--color-neutral-400)', display: 'inline-flex', fontSize: 13, fontWeight: 500, gap: 6, lineHeight: '20px' }}>
          <span>{label}</span>
          {required && <span style={{ color: 'var(--color-red-600)' }}>*</span>}
          {info && (
            <Tooltip title={infoTooltip}>
              <span
                aria-label="Input info"
                style={{ color: 'var(--color-neutral-400)', display: 'inline-flex', fontSize: 12, lineHeight: 1 }}
              >
                ⓘ
              </span>
            </Tooltip>
          )}
        </div>
      )}

      <div
        className="gradient-input__control"
        style={{
          ...shellPadding[size],
          alignItems: 'center',
          backgroundColor: 'var(--color-neutral-900)',
          border: `1px solid ${borderColor}`,
          display: 'flex',
          transition: 'border-color 120ms ease',
          ...style,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AntInput
          {...rest}
          disabled={disabled}
          variant="borderless"
          prefix={
            leadingIcon ? (
              <span className="gradient-input__icon" style={{ color: iconColor }}>
                {leadingIcon}
              </span>
            ) : undefined
          }
          suffix={
            trailingIcon ? (
              <span className="gradient-input__icon" style={{ color: iconColor }}>
                {trailingIcon}
              </span>
            ) : undefined
          }
          style={{
            ...textStyles[size],
            color: valueColor,
            flex: 1,
            fontWeight: 400,
            minWidth: 0,
            outline: 'none',
          }}
          onFocus={(event) => {
            setFocused(true)
            rest.onFocus?.(event)
          }}
          onBlur={(event) => {
            setFocused(false)
            rest.onBlur?.(event)
          }}
          onChange={(event) => {
            onChange?.(event.target.value)
          }}
        />
      </div>

      {hasError && (
        <div style={{ alignItems: 'center', color: 'var(--color-red-500)', display: 'inline-flex', fontSize: 13, fontWeight: 400, gap: 6, lineHeight: '20px' }}>
          <ExclamationCircleFilled style={{ fontSize: 14 }} />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

export default Input
