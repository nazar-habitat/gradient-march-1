import React, { useEffect, useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Plus, X, Settings, Trash2, Bell, Search, Download, Upload,
  ChevronRight, Edit, Copy, Star, Heart, Bookmark,
} from 'lucide-react'
import { IconButton } from './IconButton'
import type { IconButtonVariant, IconButtonSize } from './IconButton'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <span style={{ color: '#636363', fontSize: 12, width: 120, flexShrink: 0 }}>{label}</span>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>{children}</div>
  </div>
)

const Col = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
    <span style={{ color: '#636363', fontSize: 11 }}>{label}</span>
    {children}
  </div>
)

/** Renders a pre-focused IconButton to show the focus ring in Storybook. */
const Focused = (props: React.ComponentProps<typeof IconButton>) => {
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => { ref.current?.focus() }, [])
  return <IconButton ref={ref} {...props} />
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof IconButton> = {
  title:     'UI/IconButton',
  component: IconButton,
  parameters: { layout: 'padded' },
  argTypes: {
    variant:  { control: 'select', options: ['primary', 'secondary', 'transparent', 'removable'] },
    size:     { control: 'select', options: ['xl', 'md', 'sm'] },
    disabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof IconButton>

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant:    'primary',
    size:       'md',
    disabled:   false,
    icon:       <Plus />,
    'aria-label': 'Add',
  },
}

export const Variants: Story = {
  render: () => (
    <Row label="">
      <Col label="Primary">
        <IconButton variant="primary"     icon={<Plus />}     aria-label="Add" />
      </Col>
      <Col label="Secondary">
        <IconButton variant="secondary"   icon={<Plus />}     aria-label="Add" />
      </Col>
      <Col label="Transparent">
        <IconButton variant="transparent" icon={<Settings />} aria-label="Settings" />
      </Col>
      <Col label="Removable">
        <IconButton variant="removable"   icon={<X />}        aria-label="Remove" />
      </Col>
    </Row>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['primary', 'secondary'] as IconButtonVariant[]).map(variant => (
        <Row key={variant} label={variant}>
          {(['xl', 'md', 'sm'] as IconButtonSize[]).map(size => (
            <Col key={size} label={size}>
              <IconButton variant={variant} size={size} icon={<Plus />} aria-label="Add" />
            </Col>
          ))}
        </Row>
      ))}
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ width: 120 }} />
        {(['Primary', 'Secondary', 'Transparent', 'Removable']).map(v => (
          <span key={v} style={{ color: '#636363', fontSize: 11, width: 48, textAlign: 'center' }}>{v}</span>
        ))}
      </div>

      {/* Default */}
      <Row label="Default">
        <IconButton variant="primary"     icon={<Plus />}     aria-label="Add" />
        <IconButton variant="secondary"   icon={<Plus />}     aria-label="Add" />
        <IconButton variant="transparent" icon={<Settings />} aria-label="Settings" />
        <IconButton variant="removable"   icon={<X />}        aria-label="Remove" />
      </Row>

      {/* Focused */}
      <Row label="Focused">
        <Focused variant="primary"     icon={<Plus />}     aria-label="Add" />
        <Focused variant="secondary"   icon={<Plus />}     aria-label="Add" />
        <Focused variant="transparent" icon={<Settings />} aria-label="Settings" />
        <Focused variant="removable"   icon={<X />}        aria-label="Remove" />
      </Row>

      {/* Disabled */}
      <Row label="Disabled">
        <IconButton variant="primary"     icon={<Plus />}     aria-label="Add"      disabled />
        <IconButton variant="secondary"   icon={<Plus />}     aria-label="Add"      disabled />
        <IconButton variant="transparent" icon={<Settings />} aria-label="Settings" disabled />
        <IconButton variant="removable"   icon={<X />}        aria-label="Remove"   disabled />
      </Row>
    </div>
  ),
}

export const IconSampler: Story = {
  name: 'Icon Sampler (lucide-react)',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {[
        [<Plus />,         'Plus'],
        [<X />,            'X'],
        [<Settings />,     'Settings'],
        [<Trash2 />,       'Trash2'],
        [<Bell />,         'Bell'],
        [<Search />,       'Search'],
        [<Download />,     'Download'],
        [<Upload />,       'Upload'],
        [<ChevronRight />, 'ChevronRight'],
        [<Edit />,         'Edit'],
        [<Copy />,         'Copy'],
        [<Star />,         'Star'],
        [<Heart />,        'Heart'],
        [<Bookmark />,     'Bookmark'],
      ].map(([ic, label]) => (
        <Col key={label as string} label={label as string}>
          <IconButton variant="secondary" icon={ic} aria-label={label as string} />
        </Col>
      ))}
    </div>
  ),
}
