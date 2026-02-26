import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlusOutlined } from '@ant-design/icons'
import { MultiSelectMenu } from './MultiSelectMenu'
import type { MultiSelectMenuItem, MultiSelectMenuSection } from './MultiSelectMenu'

const baseItems: MultiSelectMenuItem[] = [
  { key: 'k1', label: 'List item one' },
  { key: 'k2', label: 'List item two' },
  { key: 'k3', label: 'List item three' },
  { key: 'k4', label: 'List item four' },
  { key: 'k5', label: 'List item five', disabled: true },
]

const dividedSections: MultiSelectMenuSection[] = [
  { key: 's1', items: baseItems.slice(0, 3) },
  { key: 's2', items: baseItems.slice(3, 5) },
]

const meta: Meta<typeof MultiSelectMenu> = {
  title: 'UI/MultiSelectMenu',
  component: MultiSelectMenu,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof MultiSelectMenu>

export const Default: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['k1', 'k3'])
    return (
      <MultiSelectMenu
        items={baseItems}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      />
    )
  },
}

export const WithIcons: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['k2'])
    const items = baseItems.map((item) => ({ ...item, icon: <PlusOutlined /> }))
    return (
      <MultiSelectMenu
        items={items}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        showIcons
      />
    )
  },
}

export const WithDividers: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['k2', 'k4'])
    return (
      <MultiSelectMenu
        sections={dividedSections}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        showDividers
      />
    )
  },
}

export const WithHeader: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['k1'])
    return (
      <MultiSelectMenu
        items={baseItems}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        showHeader
        headerTitle="Filter by"
      />
    )
  },
}

export const WithSearch: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['k1'])
    return (
      <MultiSelectMenu
        items={baseItems}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        showSearch
      />
    )
  },
}

export const WithApply: Story = {
  render: () => {
    const [committed, setCommitted] = useState<string[]>(['k1'])
    const [draft, setDraft] = useState<string[]>(['k1'])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <MultiSelectMenu
          items={baseItems}
          selectedKeys={draft}
          onSelectionChange={setDraft}
          onApply={(keys) => setCommitted(keys)}
          showSearch
        />
        <div style={{ color: '#949494', fontSize: 12 }}>
          Applied: {committed.length > 0 ? committed.join(', ') : 'none'}
        </div>
      </div>
    )
  },
}

export const NoneSelected: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    return (
      <MultiSelectMenu
        items={baseItems}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        showSearch
        showHeader
        headerTitle="Assign to"
      />
    )
  },
}

export const WithOverflowScrollbar: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['long-2', 'long-5'])
    const longItems: MultiSelectMenuItem[] = Array.from({ length: 14 }).map((_, i) => ({
      key: `long-${i + 1}`,
      label: `List item ${i + 1}`,
    }))
    return (
      <MultiSelectMenu
        items={longItems}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        maxHeight={160}
      />
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <MultiSelectMenu
      items={baseItems}
      selectedKeys={['k1', 'k3']}
      disabled
    />
  ),
}
