import React, { useMemo, useRef, useState } from 'react'
import { Dropdown } from 'antd'
import { SelectMenu, type SelectMenuItem } from './menu/SelectMenu'
import { Chevron } from './internal/Chevron'
import { cx } from './internal/cx'
import './select.css'

export type SelectSize = 'md' | 'sm'

export interface SelectOption {
  value: string
  label: React.ReactNode
  /**
   * Plain-text string used for search/filtering.
   * Provide this when `label` is a ReactNode rather than a plain string.
   */
  searchLabel?: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface SingleSelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
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

export function SingleSelect({
  options,
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
}: SingleSelectProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [focused, setFocused] = useState(false)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlledOpen = open !== undefined
  const resolvedOpen = isControlledOpen ? open : uncontrolledOpen

  const selectedOption = useMemo(
    () => options.find((o) => o.value === value),
    [options, value],
  )

  const menuItems = useMemo<SelectMenuItem[]>(
    () => options.map((o) => ({
      value: o.value,
      label: o.label,
      searchLabel: o.searchLabel,
      icon: o.icon,
      disabled: o.disabled,
    })),
    [options],
  )

  const hasAnyIcons = useMemo(() => options.some((o) => Boolean(o.icon)), [options])

  const chevronColor = disabled ? 'var(--color-neutral-800)' : 'var(--color-neutral-400)'

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
        <div style={{ fontSize: size === 'md' ? 14 : 13, marginTop: 8 }}>
          <SelectMenu
            items={menuItems}
            selectedValue={value ?? null}
            onSelect={(val) => {
              onChange?.(val)
              setOpen(false)
            }}
            showIcons={hasAnyIcons}
            disabled={disabled}
            style={{ minWidth: Math.max(triggerRef.current?.offsetWidth ?? 0, 220) }}
          />
        </div>
      )}
    >
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        className={cx(
          'gradient-select-trigger',
          `gradient-select-trigger--${size}`,
          resolvedOpen && 'gradient-select-trigger--open',
          className,
        )}
        style={style}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-haspopup="listbox"
        aria-expanded={resolvedOpen}
      >
        {leadingIcon && (
          <span className="gradient-select-trigger__icon">{leadingIcon}</span>
        )}
        {prefix && (
          <span className="gradient-select-trigger__prefix">{prefix}</span>
        )}
        {selectedOption
          ? <span className="gradient-select-trigger__label">{selectedOption.label}</span>
          : <span className="gradient-select-trigger__placeholder">{placeholder}</span>
        }
        <Chevron open={resolvedOpen} color={chevronColor} />
        {focused && !resolvedOpen && !disabled && (
          <span aria-hidden="true" className="gradient-select-focus-ring" />
        )}
      </button>
    </Dropdown>
  )
}

export default SingleSelect
