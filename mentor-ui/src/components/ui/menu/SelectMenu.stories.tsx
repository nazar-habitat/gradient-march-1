import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlusOutlined } from '@ant-design/icons'
import { SelectMenu } from './SelectMenu'
import type { SelectMenuItem, SelectMenuSection } from './SelectMenu'

// ── Shared trigger button ────────────────────────────────────────────────────

function TriggerButton({ label = 'Open menu' }: { label?: string }) {
  return (
    <button
      type="button"
      style={{
        alignItems: 'center',
        background: '#191919',
        border: '1px solid #313131',
        borderRadius: 8,
        color: '#ffffff',
        cursor: 'pointer',
        display: 'inline-flex',
        fontSize: 13,
        fontWeight: 500,
        gap: 6,
        paddingBlock: 6,
        paddingInline: 12,
        userSelect: 'none',
      }}
    >
      {label}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M5 7L8 10L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────

const baseItems: SelectMenuItem[] = [
  { key: 'k1', label: 'List item' },
  { key: 'k2', label: 'List item' },
  { key: 'k3', label: 'List item' },
  { key: 'k4', label: 'List item' },
  { key: 'k5', label: 'List item', disabled: true },
]

const dividedSections: SelectMenuSection[] = [
  { key: 's1', items: baseItems.slice(0, 3) },
  { key: 's2', items: baseItems.slice(3, 5) },
]

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof SelectMenu> = {
  title: 'UI/SelectMenu',
  component: SelectMenu,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof SelectMenu>

// ── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string | null>('k1')
    return (
      <SelectMenu
        trigger={<TriggerButton />}
        defaultOpen
        items={baseItems}
        selectedKey={selectedKey}
        onSelect={setSelectedKey}
        showIcons={false}
      />
    )
  },
}

export const WithIcons: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string | null>('k2')
    const items = baseItems.map((item) => ({ ...item, icon: <PlusOutlined /> }))
    return (
      <SelectMenu
        trigger={<TriggerButton />}
        defaultOpen
        items={items}
        selectedKey={selectedKey}
        onSelect={setSelectedKey}
        showIcons
      />
    )
  },
}

export const WithDividers: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string | null>('k2')
    return (
      <SelectMenu
        trigger={<TriggerButton />}
        defaultOpen
        sections={dividedSections}
        selectedKey={selectedKey}
        onSelect={setSelectedKey}
        showIcons={false}
        showDividers
      />
    )
  },
}

export const WithCascading: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string | null>('k2-a')
    const cascadingItems: SelectMenuItem[] = [
      {
        key: 'k1',
        label: 'List item',
        children: [
          { key: 'k1-a', label: 'Subitem A' },
          { key: 'k1-b', label: 'Subitem B' },
          { key: 'k1-c', label: 'Subitem C' },
        ],
      },
      {
        key: 'k2',
        label: 'List item',
        children: [
          { key: 'k2-a', label: 'Subitem A' },
          { key: 'k2-b', label: 'Subitem B' },
        ],
      },
      { key: 'k3', label: 'List item' },
    ]
    return (
      <SelectMenu
        trigger={<TriggerButton label="Open (hover for submenus)" />}
        defaultOpen
        items={cascadingItems}
        selectedKey={selectedKey}
        onSelect={setSelectedKey}
        showIcons
        showCascading
      />
    )
  },
}

export const WithHeader: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string | null>('k2')
    return (
      <SelectMenu
        trigger={<TriggerButton />}
        defaultOpen
        items={baseItems}
        selectedKey={selectedKey}
        onSelect={setSelectedKey}
        showHeader
        headerTitle="Title"
      />
    )
  },
}

export const WithSearch: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string | null>('k1')
    return (
      <SelectMenu
        trigger={<TriggerButton />}
        defaultOpen
        items={baseItems}
        selectedKey={selectedKey}
        onSelect={setSelectedKey}
        showSearch
      />
    )
  },
}

export const WithBottomBar: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string | null>('k3')
    return (
      <SelectMenu
        trigger={<TriggerButton />}
        defaultOpen
        items={baseItems}
        selectedKey={selectedKey}
        onSelect={setSelectedKey}
        showSearch
        showBottomBar
        onClearSelection={() => setSelectedKey(null)}
      />
    )
  },
}

export const WithOverflowScrollbar: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string | null>('long-4')
    const longItems: SelectMenuItem[] = Array.from({ length: 14 }).map((_, index) => ({
      key: `long-${index + 1}`,
      label: `List item ${index + 1}`,
    }))
    return (
      <SelectMenu
        trigger={<TriggerButton />}
        defaultOpen
        items={longItems}
        selectedKey={selectedKey}
        onSelect={setSelectedKey}
        showIcons={false}
        maxHeight={156}
      />
    )
  },
}

export const ItemStates: Story = {
  name: 'Item States',
  render: () => {
    const labeledItems: SelectMenuItem[] = baseItems.map((item, i) => ({
      ...item,
      label: ['Default', 'Default', 'Default', 'Default', 'Disabled'][i],
    }))
    return (
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
          <span style={{ color: '#949494', fontSize: 12 }}>None selected</span>
          <SelectMenu
            trigger={<TriggerButton label="Open" />}
            defaultOpen
            items={labeledItems}
            selectedKey={null}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
          <span style={{ color: '#949494', fontSize: 12 }}>With selection</span>
          <SelectMenu
            trigger={<TriggerButton label="Open" />}
            defaultOpen
            items={labeledItems}
            selectedKey="k2"
          />
        </div>
      </div>
    )
  },
}

export const Playground: Story = {
  render: () => {
    const [selectedKey, setSelectedKey] = useState<string | null>(null)
    const [open, setOpen] = useState(false)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <SelectMenu
          trigger={<TriggerButton label="Select item" />}
          open={open}
          onOpenChange={setOpen}
          items={baseItems}
          selectedKey={selectedKey}
          onSelect={(key) => {
            setSelectedKey(key)
            setOpen(false)
          }}
          showSearch
          showBottomBar
          onClearSelection={() => setSelectedKey(null)}
        />
        <div style={{ color: '#949494', fontSize: 12 }}>
          Selected: {selectedKey ?? 'none'} | Open: {String(open)}
        </div>
      </div>
    )
  },
}
