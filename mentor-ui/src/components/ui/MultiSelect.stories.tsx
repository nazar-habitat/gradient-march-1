import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlusOutlined } from '@ant-design/icons'
import { MultiSelect } from './MultiSelect'
import type { MultiSelectSize } from './MultiSelect'
import type { SelectOption } from './SingleSelect'

const options: SelectOption[] = [
  { value: 'alice', label: 'Alice Martin' },
  { value: 'bob', label: 'Bob Chen' },
  { value: 'carol', label: 'Carol Davies' },
  { value: 'dan', label: 'Dan Nguyen' },
  { value: 'eve', label: 'Eve Kowalski', disabled: true },
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
    options,
    placeholder: 'Select people',
    size: 'md',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>([])
    return <MultiSelect {...args} value={value} onChange={setValue} />
  },
}

export const WithSelections: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['alice', 'bob', 'carol'])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
        <MultiSelect options={options} value={value} onChange={setValue} />
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
        options={options}
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
        options={options}
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
          options={options}
          value={draft}
          onChange={setDraft}
          onApply={(values) => setApplied(values)}
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
          options={options}
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
      <MultiSelect options={options} value={[]} onChange={() => {}} placeholder="No selection" />
      <MultiSelect options={options} value={['alice', 'bob']} onChange={() => {}} />
      <MultiSelect options={options} value={['alice']} onChange={() => {}} open />
      <MultiSelect options={options} value={['alice', 'carol']} disabled onChange={() => {}} />
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
          options={options}
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
