import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { TagOutlined, StarOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Tag } from './Tag'
import type { TagSize, TagTone } from './Tag'

const tones: TagTone[] = ['turquoise', 'warning', 'lime', 'success', 'neutral', 'error', 'plum', 'violet']
const sizes: TagSize[] = ['xs', 'sm', 'md']

const iconOptions = ['none', 'tag', 'star', 'check'] as const
const iconMap = {
  none: undefined,
  tag: <TagOutlined />,
  star: <StarOutlined />,
  check: <CheckCircleOutlined />,
}

const meta: Meta<typeof Tag> = {
  title: 'UI/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    label: { control: 'text' },
    tone: { control: 'select', options: tones },
    size: { control: 'select', options: sizes },
    icon: { control: 'select', options: iconOptions },
    removable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Tag>

export const Playground: Story = {
  args: {
    label: 'Label',
    tone: 'neutral',
    size: 'xs',
    icon: 'none',
    removable: false,
    disabled: false,
  },
  render: (args) => {
    const { icon: iconKey, ...tagArgs } = args as typeof args & { icon?: (typeof iconOptions)[number] }
    const key: (typeof iconOptions)[number] = iconKey ?? 'none'
    return <Tag {...tagArgs} icon={iconMap[key]} />
  },
}

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {tones.map((tone) => (
        <Tag key={tone} tone={tone} label="Label" />
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {sizes.map((size) => (
        <Tag key={size} size={size} label={`Label ${size.toUpperCase()}`} tone="turquoise" />
      ))}
    </div>
  ),
}

export const Removable: Story = {
  render: () => {
    const [items, setItems] = useState([
      { key: 't1', label: 'Alpha', tone: 'turquoise' as TagTone },
      { key: 't2', label: 'Warning', tone: 'warning' as TagTone },
      { key: 't3', label: 'Error', tone: 'error' as TagTone },
    ])

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {items.map((item) => (
          <Tag
            key={item.key}
            label={item.label}
            tone={item.tone}
            removable
            onRemove={() => {
              setItems((prev) => prev.filter((current) => current.key !== item.key))
            }}
          />
        ))}
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {tones.map((tone) => (
        <Tag key={tone} tone={tone} label="Label" removable disabled />
      ))}
    </div>
  ),
}
