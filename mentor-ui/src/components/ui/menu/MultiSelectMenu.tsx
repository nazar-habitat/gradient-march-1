import React, { useMemo, useState } from 'react'
import { Checkbox as AntCheckbox } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from '../Input'
import { cx } from '../internal/cx'
import './multi-select-menu.css'

export interface MultiSelectMenuItem {
  key: string
  label: React.ReactNode
  /**
   * Plain-text string used for search/filtering.
   * Provide this when `label` is a ReactNode rather than a plain string.
   * Falls back to `String(label)` when omitted.
   */
  searchLabel?: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface MultiSelectMenuSection {
  key?: string
  items: MultiSelectMenuItem[]
}

export interface MultiSelectMenuProps {
  items?: MultiSelectMenuItem[]
  sections?: MultiSelectMenuSection[]
  selectedKeys?: string[]
  onSelectionChange?: (keys: string[]) => void
  onApply?: (keys: string[]) => void
  showIcons?: boolean
  showDividers?: boolean
  showHeader?: boolean
  headerTitle?: React.ReactNode
  showSearch?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  clearSelectionLabel?: string
  applyLabel?: string
  disabled?: boolean
  maxHeight?: number
  className?: string
  style?: React.CSSProperties
}

function resolveSections(
  items: MultiSelectMenuItem[] | undefined,
  sections: MultiSelectMenuSection[] | undefined,
): MultiSelectMenuSection[] {
  if (sections && sections.length > 0) return sections
  return [{ key: 'default', items: items ?? [] }]
}

function filterItems(items: MultiSelectMenuItem[], query: string): MultiSelectMenuItem[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return items
  return items.filter((item) => {
    const text = item.searchLabel ?? (typeof item.label === 'string' ? item.label : String(item.label))
    return text.toLowerCase().includes(normalized)
  })
}

// ── Row ──────────────────────────────────────────────────────────────────────

interface RowProps {
  item: MultiSelectMenuItem
  checked: boolean
  onToggle: (key: string) => void
  showIcons: boolean
  disabled: boolean
}

function Row({ item, checked, onToggle, showIcons, disabled }: RowProps) {
  const [hovered, setHovered] = useState(false)
  const isDisabled = disabled || Boolean(item.disabled)

  return (
    <div
      role="option"
      aria-selected={checked}
      aria-disabled={isDisabled}
      onClick={() => {
        if (!isDisabled) onToggle(item.key)
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        alignItems: 'center',
        backgroundColor: hovered && !isDisabled ? 'var(--color-neutral-900)' : 'transparent',
        borderRadius: '8px',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        gap: 8,
        height: 32,
        marginBlock: 2,
        paddingInline: 8,
        transition: 'background-color 80ms ease',
      }}
    >
      <AntCheckbox
        checked={checked}
        disabled={isDisabled}
        // Prevent double-toggle: AntCheckbox fires onChange, outer div fires onClick.
        // Stop the checkbox's own click event from bubbling to the div.
        onClick={(e) => e.stopPropagation()}
        onChange={() => {
          if (!isDisabled) onToggle(item.key)
        }}
        style={{ flexShrink: 0 }}
      />
      {showIcons && item.icon && (
        <span
          style={{
            color: isDisabled ? 'var(--color-neutral-600)' : '#ffffff',
            display: 'inline-flex',
            flexShrink: 0,
            fontSize: 16,
          }}
        >
          {item.icon}
        </span>
      )}
      <span
        style={{
          color: isDisabled ? 'var(--color-neutral-600)' : '#ffffff',
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {item.label}
      </span>
    </div>
  )
}

// ── MultiSelectMenu ───────────────────────────────────────────────────────────

export function MultiSelectMenu({
  items,
  sections,
  selectedKeys = [],
  onSelectionChange,
  onApply,
  showIcons = false,
  showDividers = false,
  showHeader = false,
  headerTitle = 'Title',
  showSearch = false,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  clearSelectionLabel = 'Clear selection',
  applyLabel = 'Apply',
  disabled = false,
  maxHeight = 240,
  className,
  style,
}: MultiSelectMenuProps) {
  const [internalSearch, setInternalSearch] = useState('')
  const controlledSearch = searchValue !== undefined
  const resolvedSearch = controlledSearch ? searchValue : internalSearch

  const sourceSections = useMemo(
    () => resolveSections(items, sections),
    [items, sections],
  )

  const filteredSections = useMemo(() => {
    return sourceSections
      .map((section) => ({
        ...section,
        items: filterItems(section.items, resolvedSearch),
      }))
      .filter((section) => section.items.length > 0)
  }, [sourceSections, resolvedSearch])

  const toggle = (key: string) => {
    const next = selectedKeys.includes(key)
      ? selectedKeys.filter((k) => k !== key)
      : [...selectedKeys, key]
    onSelectionChange?.(next)
  }

  const hasSelection = selectedKeys.length > 0
  const showBottomBar = hasSelection || Boolean(onApply)

  return (
    <div
      className={cx('gradient-multi-select-menu-panel', className)}
      style={{
        backgroundColor: 'var(--color-neutral-950)',
        border: '1px solid var(--color-neutral-800)',
        borderRadius: '12px',
        boxShadow: '0px 8px 12px -2px rgba(87, 87, 87, 0.12)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minWidth: 260,
        ...style,
      }}
    >
      {showHeader && (
        <div
          style={{
            backgroundColor: 'var(--color-neutral-950)',
            borderBottom: '1px solid var(--color-neutral-800)',
            paddingInline: 8,
            paddingTop: 10,
            paddingBottom: 8,
          }}
        >
          <div
            style={{
              color: 'var(--color-neutral-400)',
              fontSize: 14,
              fontWeight: 500,
              lineHeight: '24px',
              paddingInline: 6,
            }}
          >
            {headerTitle}
          </div>
        </div>
      )}

      {showSearch && (
        <div style={{ borderBottom: '1px solid var(--color-neutral-800)', padding: 8 }}>
          <Input
            size="sm"
            placeholder={searchPlaceholder}
            value={resolvedSearch}
            leadingIcon={<SearchOutlined />}
            onChange={(nextValue) => {
              if (!controlledSearch) setInternalSearch(nextValue)
              onSearchChange?.(nextValue)
            }}
          />
        </div>
      )}

      {/* role="listbox" + aria-multiselectable live on the scroll container */}
      <div
        role="listbox"
        aria-multiselectable="true"
        className="gradient-multi-select-menu-body"
        style={{ maxHeight, overflowY: 'auto', padding: 8 }}
      >
        {filteredSections.map((section, sectionIndex) => (
          <React.Fragment key={section.key ?? sectionIndex}>
            {section.items.map((item) => (
              <Row
                key={item.key}
                item={item}
                checked={selectedKeys.includes(item.key)}
                onToggle={toggle}
                showIcons={showIcons}
                disabled={disabled}
              />
            ))}
            {showDividers && sectionIndex < filteredSections.length - 1 && (
              <div
                style={{ borderTop: '1px solid var(--color-neutral-800)', marginBlock: 4 }}
                role="separator"
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {showBottomBar && (
        <div
          style={{
            alignItems: 'center',
            backgroundColor: 'var(--color-neutral-950)',
            borderTop: '1px solid var(--color-neutral-800)',
            display: 'flex',
            gap: 8,
            justifyContent: onApply ? 'space-between' : 'flex-start',
            paddingBottom: 12,
            paddingInline: 8,
            paddingTop: 8,
          }}
        >
          <button
            type="button"
            disabled={!hasSelection || disabled}
            onClick={() => {
              if (!hasSelection || disabled) return
              onSelectionChange?.([])
            }}
            style={{
              background: 'transparent',
              border: 0,
              color: hasSelection && !disabled ? 'var(--color-purple-400)' : 'var(--color-neutral-600)',
              cursor: hasSelection && !disabled ? 'pointer' : 'not-allowed',
              fontSize: 13,
              fontWeight: 500,
              lineHeight: '16px',
              paddingInline: 8,
            }}
          >
            {clearSelectionLabel}
          </button>

          {onApply && (
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                if (disabled) return
                onApply(selectedKeys)
              }}
              style={{
                background: disabled ? 'transparent' : 'var(--color-purple-500)',
                border: disabled ? '1px solid var(--color-neutral-800)' : '0',
                borderRadius: '8px',
                color: disabled ? 'var(--color-neutral-600)' : '#ffffff',
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontSize: 13,
                fontWeight: 500,
                lineHeight: '16px',
                paddingBlock: 6,
                paddingInline: 12,
              }}
            >
              {applyLabel}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default MultiSelectMenu
