import { useEffect, useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons'
import { Input } from './Input'
import type { InputSize } from './Input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: { control: 'select', options: ['md', 'sm'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    required: { control: 'boolean' },
    info: { control: 'boolean' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Playground: Story = {
  args: {
    size: 'md',
    label: 'Email',
    placeholder: 'you@company.com',
    required: false,
    info: false,
    disabled: false,
    error: '',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      {(['md', 'sm'] as const).map((size: InputSize) => (
        <Input key={size} size={size} label={`Size: ${size.toUpperCase()}`} placeholder="Type here" />
      ))}
    </div>
  ),
}

export const Layouts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <Input placeholder="Text input" />
      <Input placeholder="Leading icon" leadingIcon={<UserOutlined />} />
      <Input placeholder="Trailing icon" trailingIcon={<SearchOutlined />} />
      <Input placeholder="Both icons" leadingIcon={<UserOutlined />} trailingIcon={<EyeOutlined />} />
    </div>
  ),
}

const FocusedInput = () => {
  const [value, setValue] = useState('')
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = wrapperRef.current?.querySelector('input')
    element?.focus()
  }, [])

  return (
    <div ref={wrapperRef}>
      <Input value={value} onChange={setValue} placeholder="Focused state" />
    </div>
  )
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <Input placeholder="Default (empty)" />
      <Input value="Filled value" readOnly />
      <FocusedInput />
      <Input disabled value="Disabled value" />
      <Input value="Invalid value" error="This field contains invalid data" />
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <Input label="Project name" placeholder="New cooling baseline" required info infoTooltip="This field is required." />
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <Input label="Email" value="nazar@" error="Please enter a valid email address." />
    </div>
  ),
}
