import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlusOutlined } from '@ant-design/icons'
import { Select } from './Select'
import type { SelectOption, SelectSize } from './SingleSelect'

const options: SelectOption[] = [
  { value: 'a', label: 'Select A' },
  { value: 'b', label: 'Select B' },
  { value: 'c', label: 'Select C' },
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
    options,
    placeholder: 'Select',
    size: 'md',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState<string | undefined>()
    return <Select {...args} value={value} onChange={setValue} />
  },
}

export const Layouts: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Select options={options} value="a" />
      <Select options={options} value="a" leadingIcon={<PlusOutlined />} />
      <Select options={options} value="a" leadingIcon={<PlusOutlined />} prefix="Prefix:" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['md', 'sm'] as const).map((size: SelectSize) => (
        <Select key={size} options={options} value="a" size={size} />
      ))}
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 240 }}>
      <Select options={options} />
      <Select options={options} value="a" />
      <Select options={options} value="a" open />
      <Select options={options} value="a" disabled />
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
          options={options}
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

export const MultiMode: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['a'])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
        <Select
          mode="multiple"
          options={options}
          value={value}
          onChange={setValue}
          placeholder="Pick options"
        />
        <div style={{ color: '#949494', fontSize: 12 }}>
          Selected: {value.length > 0 ? value.join(', ') : 'none'}
        </div>
      </div>
    )
  },
}
