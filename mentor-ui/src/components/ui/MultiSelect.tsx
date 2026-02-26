import React, { useMemo, useRef, useState } from 'react'
import { Dropdown } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { Tag } from './Tag'
import { MultiSelectMenu, type MultiSelectMenuItem } from './menu/MultiSelectMenu'
import { Chevron } from './internal/Chevron'
import { resolveTriggerBorderColor } from './internal/resolveTriggerBorderColor'

export type MultiSelectSize = 'md' | 'sm'

export interface MultiSelectItem {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export interface MultiSelectProps {
  items: MultiSelectItem[]
  value?: string[]
  onChange?: (keys: string[]) => void
  onApply?: (keys: string[]) => void
  placeholder?: string
  prefix?: string
  leadingIcon?: React.ReactNode
  size?: MultiSelectSize
  disabled?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  style?: React.CSSProperties
}

const triggerSizeStyles: Record<MultiSelectSize, React.CSSProperties> = {
  md: {
    borderRadius: '12px',
    fontSize: 14,
    lineHeight: '20px',
    minHeight: 40,
    paddingBlock: 8,
    paddingInline: 12,
  },
  sm: {
    borderRadius: '8px',
    fontSize: 13,
    lineHeight: '16px',
    minHeight: 32,
    paddingBlock: 6,
    paddingInline: 10,
  },
}

const panelSizeStyles: Record<MultiSelectSize, React.CSSProperties> = {
  md: { fontSize: 14, lineHeight: '20px' },
  sm: { fontSize: 13, lineHeight: '16px' },
}

export function MultiSelect({
  items,
  value = [],
  onChange,
  onApply,
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
}: MultiSelectProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlledOpen = open !== undefined
  const resolvedOpen = isControlledOpen ? open : uncontrolledOpen

  const selectedItems = useMemo(
    () => items.filter((item) => value.includes(item.key)),
    [items, value],
  )

  const menuItems = useMemo<MultiSelectMenuItem[]>(
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

  const hasSelection = value.length > 0
  // Show a clear-all button on hover when items are selected and dropdown is closed
  const showClearAll = hovered && hasSelection && !disabled && !resolvedOpen

  const triggerBorderColor = resolveTriggerBorderColor({
    disabled,
    focused,
    hovered,
    open: resolvedOpen,
  })

  const chevronColor      = disabled ? 'var(--color-neutral-800)' : 'var(--color-neutral-400)'
  const iconColor         = disabled ? 'var(--color-neutral-800)' : 'var(--color-neutral-400)'
  const prefixColor       = disabled ? 'var(--color-neutral-800)' : 'var(--color-neutral-400)'
  const placeholderColor  = disabled ? 'var(--color-neutral-800)' : 'var(--color-neutral-600)'

  const setOpen = (nextOpen: boolean) => {
    if (!isControlledOpen) setUncontrolledOpen(nextOpen)
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
          <MultiSelectMenu
            items={menuItems}
            selectedKeys={value}
            onSelectionChange={onChange}
            onApply={onApply}
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
          color: '#ffffff',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'inline-flex',
          gap: 6,
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
        {/* Leading icon */}
        {leadingIcon && (
          <span
            style={{
              alignItems: 'center',
              color: iconColor,
              display: 'inline-flex',
              flexShrink: 0,
              height: 20,
              justifyContent: 'center',
              width: 20,
            }}
          >
            {leadingIcon}
          </span>
        )}

        {/* Prefix */}
        {prefix && (
          <span style={{ color: prefixColor, flexShrink: 0, whiteSpace: 'nowrap' }}>
            {prefix}
          </span>
        )}

        {/* Tags or placeholder — wrappable, fills available space */}
        {hasSelection ? (
          <span
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              flexWrap: 'wrap',
              gap: 4,
              minWidth: 0,
            }}
            // Stop clicks on tags (including × icons) from toggling the dropdown
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItems.map((item) => (
              <Tag
                key={item.key}
                label={item.label}
                size={size === 'md' ? 'sm' : 'xs'}
                removable={!disabled}
                onRemove={() => {
                  onChange?.(value.filter((k) => k !== item.key))
                }}
              />
            ))}
          </span>
        ) : (
          <span
            style={{
              color: placeholderColor,
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {placeholder}
          </span>
        )}

        {/* Trailing — clear-all button or chevron */}
        {showClearAll ? (
          <span
            role="button"
            aria-label="Clear all selections"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation()
              onChange?.([])
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                onChange?.([])
              }
            }}
            style={{
              alignItems: 'center',
              color: 'var(--color-neutral-400)',
              cursor: 'pointer',
              display: 'inline-flex',
              flexShrink: 0,
              height: 20,
              justifyContent: 'center',
              width: 20,
            }}
          >
            <CloseOutlined style={{ fontSize: 12 }} />
          </span>
        ) : (
          <Chevron open={resolvedOpen} color={chevronColor} />
        )}

        {/* Focus ring */}
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

export default MultiSelect
