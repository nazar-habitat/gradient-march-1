import React, { useMemo, useRef, useState } from 'react'
import { Dropdown } from 'antd'
import { SelectMenu, type SelectMenuItem } from './menu/SelectMenu'
import { Chevron } from './internal/Chevron'
import { resolveTriggerBorderColor } from './internal/resolveTriggerBorderColor'

export type SelectSize = 'md' | 'sm'

export interface SelectItem {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export interface SelectProps {
  items: SelectItem[]
  value?: string
  onChange?: (key: string) => void
  placeholder?: string
  prefix?: string
  leadingIcon?: React.ReactNode
  size?: SelectSize
  disabled?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  style?: React.CSSProperties
}

const triggerSizeStyles: Record<SelectSize, React.CSSProperties> = {
  md: {
    borderRadius: '12px',
    fontSize: 14,
    lineHeight: '20px',
    paddingBlock: 10,
    paddingInline: 12,
  },
  sm: {
    borderRadius: '8px',
    fontSize: 13,
    lineHeight: '16px',
    paddingBlock: 8,
    paddingInline: 10,
  },
}

const panelSizeStyles: Record<SelectSize, React.CSSProperties> = {
  md: {
    fontSize: 14,
    lineHeight: '20px',
  },
  sm: {
    fontSize: 13,
    lineHeight: '16px',
  },
}

export function Select({
  items,
  value,
  onChange,
  placeholder = 'Select',
  prefix,
  leadingIcon,
  size = 'md',
  disabled = false,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  style,
}: SelectProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlledOpen = open !== undefined
  const resolvedOpen = isControlledOpen ? open : uncontrolledOpen

  const selectedItem = useMemo(
    () => items.find((item) => item.key === value),
    [items, value],
  )
  const menuItems = useMemo<SelectMenuItem[]>(
    () =>
      items.map((item) => ({
        key: item.key,
        label: item.label,
        icon: item.icon,
        disabled: item.disabled,
      })),
    [items],
  )
  const hasAnyIcons = useMemo(
    () => items.some((item) => Boolean(item.icon)),
    [items],
  )

  const triggerBorderColor = resolveTriggerBorderColor({
    disabled,
    focused,
    hovered,
    open: resolvedOpen,
  })

  const triggerTextColor = disabled
    ? 'var(--color-neutral-800)'
    : selectedItem
      ? '#ffffff'
      : 'var(--color-neutral-600)'

  const chevronColor = disabled ? 'var(--color-neutral-800)' : 'var(--color-neutral-400)'
  const iconColor    = disabled ? 'var(--color-neutral-800)' : 'var(--color-neutral-400)'
  const prefixColor  = disabled ? 'var(--color-neutral-800)' : 'var(--color-neutral-400)'

  const setOpen = (nextOpen: boolean) => {
    if (!isControlledOpen) {
      setUncontrolledOpen(nextOpen)
    }
    onOpenChange?.(nextOpen)
  }

  return (
    <Dropdown
      trigger={['click']}
      disabled={disabled}
      open={resolvedOpen}
      onOpenChange={setOpen}
      dropdownRender={() => (
        <div style={{ ...panelSizeStyles[size], marginTop: 8 }}>
          <SelectMenu
            items={menuItems}
            selectedKey={value ?? null}
            onSelect={(key) => {
              onChange?.(key)
              setOpen(false)
            }}
            showIcons={hasAnyIcons}
            disabled={disabled}
            style={{
              minWidth: Math.max(triggerRef.current?.offsetWidth ?? 0, 220),
            }}
          />
        </div>
      )}
    >
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        className={className}
        style={{
          ...triggerSizeStyles[size],
          alignItems: 'center',
          backgroundColor: 'var(--color-neutral-900)',
          border: `1px solid ${triggerBorderColor}`,
          color: triggerTextColor,
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'inline-flex',
          gap: 8,
          position: 'relative',
          textDecoration: 'none',
          transition: 'border-color 120ms ease',
          userSelect: 'none',
          ...style,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-haspopup="listbox"
        aria-expanded={resolvedOpen}
      >
        {leadingIcon && (
          <span style={{ alignItems: 'center', color: iconColor, display: 'inline-flex', height: 20, justifyContent: 'center', width: 20 }}>
            {leadingIcon}
          </span>
        )}
        {prefix && <span style={{ color: prefixColor }}>{prefix}</span>}
        <span style={{ color: triggerTextColor, whiteSpace: 'nowrap' }}>{selectedItem ? selectedItem.label : placeholder}</span>
        <Chevron open={resolvedOpen} color={chevronColor} />
        {focused && !resolvedOpen && !disabled && (
          <span
            aria-hidden="true"
            style={{
              border: '1.5px solid var(--color-purple-500)',
              borderRadius: '16px',
              inset: -5,
              pointerEvents: 'none',
              position: 'absolute',
            }}
          />
        )}
      </button>
    </Dropdown>
  )
}

export default Select
