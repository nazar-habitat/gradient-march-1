import React, { useMemo, useState } from 'react'
import { Dropdown, Menu, type MenuProps } from 'antd'
import type { DropdownProps } from 'antd'
import { CheckOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Input } from '../Input'
import { cx } from '../internal/cx'
import './select-menu.css'

export interface SelectMenuItem {
  value: string
  label: React.ReactNode
  /**
   * Plain-text string used for search/filtering.
   * Provide this when `label` is a ReactNode rather than a plain string.
   * Falls back to `String(label)` when omitted.
   */
  searchLabel?: string
  icon?: React.ReactNode
  disabled?: boolean
  children?: SelectMenuItem[]
}

export interface SelectMenuSection {
  key?: string
  items: SelectMenuItem[]
}

export interface SelectMenuProps {
  items?: SelectMenuItem[]
  sections?: SelectMenuSection[]
  selectedValue?: string | null
  onSelect?: (value: string) => void
  onCascadeOpen?: (value: string) => void
  showIcons?: boolean
  showDividers?: boolean
  showCascading?: boolean
  showHeader?: boolean
  headerTitle?: React.ReactNode
  showSearch?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  showBottomBar?: boolean
  clearSelectionLabel?: string
  onClearSelection?: () => void
  disabled?: boolean
  maxHeight?: number
  /**
   * When provided, SelectMenu renders as a complete dropdown component.
   * The trigger element is shown inline; clicking it opens the panel in
   * an antd Dropdown portal — the correct rendering context for antd Menu.
   *
   * When omitted, only the panel div is rendered (for embedding inside
   * another Dropdown's `dropdownRender`, e.g. inside `<SingleSelect>`).
   */
  trigger?: React.ReactNode
  /** Controlled open state — only meaningful when `trigger` is provided. */
  open?: boolean
  /** Initial open state — only meaningful when `trigger` is provided. */
  defaultOpen?: boolean
  /** Called when open state changes — only meaningful when `trigger` is provided. */
  onOpenChange?: (open: boolean) => void
  /** Dropdown placement — only meaningful when `trigger` is provided. */
  placement?: DropdownProps['placement']
  className?: string
  style?: React.CSSProperties
}

function resolveSections(
  items: SelectMenuItem[] | undefined,
  sections: SelectMenuSection[] | undefined,
): SelectMenuSection[] {
  if (sections && sections.length > 0) return sections
  return [{ key: 'default', items: items ?? [] }]
}

function flattenItems(items: SelectMenuItem[]): SelectMenuItem[] {
  return items.flatMap((item) => [item, ...flattenItems(item.children ?? [])])
}

function filterItems(items: SelectMenuItem[], query: string): SelectMenuItem[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return items

  const result: SelectMenuItem[] = []
  items.forEach((item) => {
    const children = filterItems(item.children ?? [], normalized)
    const text = item.searchLabel ?? (typeof item.label === 'string' ? item.label : String(item.label))
    const selfMatch = text.toLowerCase().includes(normalized)
    if (selfMatch || children.length > 0) {
      result.push({ ...item, children: children.length > 0 ? children : item.children })
    }
  })
  return result
}

function toMenuItem(
  item: SelectMenuItem,
  options: { showIcons: boolean; showCascading: boolean; disabled: boolean; selectedValue: string | null },
): NonNullable<MenuProps['items']>[number] {
  const { showIcons, showCascading, disabled, selectedValue } = options
  const hasChildren = showCascading && (item.children?.length ?? 0) > 0
  const iconColor = item.disabled || disabled ? 'var(--color-neutral-600)' : '#ffffff'
  const textColor = item.disabled || disabled ? 'var(--color-neutral-600)' : '#ffffff'
  const isSelectedLeaf = !hasChildren && selectedValue === item.value

  return {
    key: item.value,
    className: isSelectedLeaf ? 'gradient-select-menu-item--selected' : undefined,
    disabled: disabled || item.disabled,
    icon: showIcons
      ? <span style={{ color: iconColor, display: 'inline-flex' }}>{item.icon ?? <PlusOutlined />}</span>
      : undefined,
    label: <span style={{ color: textColor }}>{item.label}</span>,
    extra: isSelectedLeaf
      ? <CheckOutlined style={{ color: item.disabled || disabled ? 'var(--color-neutral-600)' : 'var(--color-purple-400)', fontSize: 12 }} />
      : undefined,
    popupClassName: hasChildren ? 'gradient-select-submenu-popup' : undefined,
    children: hasChildren
      ? item.children?.map((child) => toMenuItem(child, options))
      : undefined,
  }
}

export function SelectMenu({
  items,
  sections,
  selectedValue = null,
  onSelect,
  onCascadeOpen,
  showIcons = false,
  showDividers = false,
  showCascading = false,
  showHeader = false,
  headerTitle = 'Title',
  showSearch = false,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  showBottomBar = false,
  clearSelectionLabel = 'Clear selection',
  onClearSelection,
  disabled = false,
  maxHeight = 240,
  trigger,
  open,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottomLeft',
  className,
  style,
}: SelectMenuProps) {
  const [internalSearch, setInternalSearch] = useState('')
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)

  const isControlledOpen = open !== undefined
  const resolvedOpen = isControlledOpen ? open : uncontrolledOpen

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

  const itemByValue = useMemo(() => {
    const map = new Map<string, SelectMenuItem>()
    flattenItems(filteredSections.flatMap((s) => s.items)).forEach((item) => {
      map.set(item.value, item)
    })
    return map
  }, [filteredSections])

  const menuItems: NonNullable<MenuProps['items']> = useMemo(() => {
    const entries: NonNullable<MenuProps['items']> = []
    filteredSections.forEach((section, sectionIndex) => {
      section.items.forEach((item) => {
        entries.push(toMenuItem(item, { showIcons, showCascading, disabled, selectedValue }))
      })
      if (showDividers && sectionIndex < filteredSections.length - 1) {
        entries.push({ type: 'divider' })
      }
    })
    return entries
  }, [filteredSections, showIcons, showCascading, disabled, showDividers, selectedValue])

  const hasSelection = Boolean(selectedValue)

  // ── Panel ──────────────────────────────────────────────────────────────────

  const panel = (
    <div
      className={cx('gradient-select-menu-panel', className)}
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

      <div className="gradient-select-menu-body" style={{ maxHeight, overflowY: 'auto' }}>
        <Menu
          mode="vertical"
          selectable={false}
          triggerSubMenuAction="hover"
          onOpenChange={(keys) => {
            const latest = (keys as string[]).at(-1)
            if (latest) onCascadeOpen?.(latest)
          }}
          items={menuItems}
          onClick={({ key }) => {
            const val = String(key)
            const item = itemByValue.get(val)
            if (!item || item.children?.length) return
            onSelect?.(val)
          }}
          className="gradient-select-menu"
        />
      </div>

      {showBottomBar && (
        <div
          style={{
            backgroundColor: 'var(--color-neutral-950)',
            borderTop: '1px solid var(--color-neutral-800)',
            paddingInline: 8,
            paddingTop: 8,
            paddingBottom: 12,
          }}
        >
          <button
            type="button"
            disabled={!hasSelection || disabled}
            onClick={() => {
              if (!hasSelection || disabled) return
              onClearSelection?.()
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
        </div>
      )}
    </div>
  )

  // ── Dropdown mode — trigger provided ──────────────────────────────────────

  if (trigger) {
    const setOpen = (nextOpen: boolean) => {
      if (!isControlledOpen) setUncontrolledOpen(nextOpen)
      onOpenChange?.(nextOpen)
    }

    return (
      <Dropdown
        trigger={['click']}
        open={resolvedOpen}
        onOpenChange={setOpen}
        placement={placement}
        dropdownRender={() => <div style={{ paddingTop: 4 }}>{panel}</div>}
      >
        <span style={{ display: 'inline-flex' }}>{trigger}</span>
      </Dropdown>
    )
  }

  // ── Panel-only mode — embedded by SingleSelect / MultiSelect / etc. ────────

  return panel
}

export default SelectMenu
