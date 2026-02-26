import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlusOutlined } from '@ant-design/icons'
import { MultiSelect } from './MultiSelect'
import type { MultiSelectItem, MultiSelectSize } from './MultiSelect'

const items: MultiSelectItem[] = [
  { key: 'alice', label: 'Alice Martin' },
  { key: 'bob', label: 'Bob Chen' },
  { key: 'carol', label: 'Carol Davies' },
  { key: 'dan', label: 'Dan Nguyen' },
  { key: 'eve', label: 'Eve Kowalski', disabled: true },
]

const meta: Meta<typeof MultiSelect> = {
  title: 'UI/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: { control: 'select', options: ['md', 'sm'] },
    disabled: { control: 'boolean' },
    prefix: { control: 'text' },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof MultiSelect>

export const Playground: Story = {
  args: {
    items,
    placeholder: 'Select people',
    size: 'md',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>([])
    return (
      <MultiSelect
        {...args}
        value={value}
        onChange={setValue}
      />
    )
  },
}

export const WithSelections: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['alice', 'bob', 'carol'])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
        <MultiSelect items={items} value={value} onChange={setValue} />
        <div style={{ color: '#949494', fontSize: 12 }}>
          Selected: {value.length > 0 ? value.join(', ') : 'none'}
        </div>
      </div>
    )
  },
}

export const WithPrefix: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['alice'])
    return (
      <MultiSelect
        items={items}
        value={value}
        onChange={setValue}
        prefix="Assign to:"
        placeholder="Nobody"
      />
    )
  },
}

export const WithLeadingIcon: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return (
      <MultiSelect
        items={items}
        value={value}
        onChange={setValue}
        leadingIcon={<PlusOutlined />}
        placeholder="Add people"
      />
    )
  },
}

export const WithApply: Story = {
  render: () => {
    const [draft, setDraft] = useState<string[]>(['alice'])
    const [applied, setApplied] = useState<string[]>(['alice'])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', maxWidth: 320 }}>
        <MultiSelect
          items={items}
          value={draft}
          onChange={setDraft}
          onApply={(keys) => setApplied(keys)}
          placeholder="Filter by person"
        />
        <div style={{ color: '#949494', fontSize: 12 }}>
          Applied: {applied.length > 0 ? applied.join(', ') : 'none'}
        </div>
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['md', 'sm'] as MultiSelectSize[]).map((size) => (
        <MultiSelect
          key={size}
          items={items}
          value={['alice', 'bob']}
          size={size}
          onChange={() => {}}
        />
      ))}
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 280 }}>
      {/* Empty */}
      <MultiSelect items={items} value={[]} onChange={() => {}} placeholder="No selection" />
      {/* With value */}
      <MultiSelect items={items} value={['alice', 'bob']} onChange={() => {}} />
      {/* Open */}
      <MultiSelect items={items} value={['alice']} onChange={() => {}} open />
      {/* Disabled */}
      <MultiSelect items={items} value={['alice', 'carol']} disabled onChange={() => {}} />
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['alice'])
    const [open, setOpen] = useState(false)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
        <MultiSelect
          items={items}
          value={value}
          onChange={setValue}
          open={open}
          onOpenChange={setOpen}
          leadingIcon={<PlusOutlined />}
          prefix="Assign:"
        />
        <div style={{ color: '#949494', fontSize: 12 }}>
          Value: [{value.join(', ')}] | Open: {String(open)}
        </div>
      </div>
    )
  },
}
