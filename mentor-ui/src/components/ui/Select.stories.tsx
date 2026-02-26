import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlusOutlined } from '@ant-design/icons'
import { Select } from './Select'
import type { SelectItem, SelectSize } from './Select'

const items: SelectItem[] = [
  { key: 'a', label: 'Select A' },
  { key: 'b', label: 'Select B' },
  { key: 'c', label: 'Select C' },
]

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
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
type Story = StoryObj<typeof Select>

export const Playground: Story = {
  args: {
    items,
    placeholder: 'Select',
    size: 'md',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState<string | undefined>()
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
      />
    )
  },
}

export const Layouts: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Select items={items} value="a" />
      <Select items={items} value="a" leadingIcon={<PlusOutlined />} />
      <Select items={items} value="a" leadingIcon={<PlusOutlined />} prefix="Prefix:" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['md', 'sm'] as const).map((size: SelectSize) => (
        <Select key={size} items={items} value="a" size={size} />
      ))}
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 240 }}>
      <Select items={items} />
      <Select items={items} value="a" />
      <Select items={items} value="a" open />
      <Select items={items} value="a" disabled />
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>('a')
    const [open, setOpen] = useState(false)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 260 }}>
        <Select
          items={items}
          value={value}
          onChange={setValue}
          open={open}
          onOpenChange={setOpen}
          leadingIcon={<PlusOutlined />}
          prefix="Mode:"
        />
        <div style={{ color: '#949494', fontSize: 12 }}>
          Value: {value ?? 'none'} | Open: {String(open)}
        </div>
      </div>
    )
  },
}
