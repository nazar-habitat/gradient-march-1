import React, { useEffect, useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TextButton } from './TextButton'
import type { ButtonIntent, ButtonSize } from './Button'

// ─── Layout helpers ───────────────────────────────────────────────────────────

const Row = ({ children, label }: { children: React.ReactNode; label?: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
    {label && (
      <span style={{ color: '#636363', fontSize: 12, width: 56, flexShrink: 0, textTransform: 'capitalize' }}>
        {label}
      </span>
    )}
    {children}
  </div>
)

const Col = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    {children}
  </div>
)

const FocusedTextButton = (props: React.ComponentProps<typeof TextButton>) => {
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => { ref.current?.focus() }, [])
  return <TextButton ref={ref} {...props} />
}

// ─── Stand-in icons ───────────────────────────────────────────────────────────

const PlusIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="100%" height="100%">
    <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
  </svg>
)

const ChevronIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="100%" height="100%">
    <path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0L13.414 9l-4.707 4.707a1 1 0 01-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
)

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof TextButton> = {
  title: 'UI/TextButton',
  component: TextButton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size:     { control: 'select', options: ['xl', 'md', 'sm'] },
    intent:   { control: 'select', options: ['default', 'success', 'warning', 'error'] },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof TextButton>

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    size:     'md',
    intent:   'default',
    children: 'Action',
    disabled: false,
  },
}

// ── Intents ───────────────────────────────────────────────────────────────────
export const Intents: Story = {
  render: () => (
    <Row>
      <TextButton intent="default">Default</TextButton>
      <TextButton intent="success">Success</TextButton>
      <TextButton intent="warning">Warning</TextButton>
      <TextButton intent="error">Error</TextButton>
    </Row>
  ),
}

// ── Sizes ─────────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <Row>
      <TextButton size="xl">XLarge</TextButton>
      <TextButton size="md">Medium</TextButton>
      <TextButton size="sm">Small</TextButton>
    </Row>
  ),
}

// ── States ────────────────────────────────────────────────────────────────────
export const States: Story = {
  render: () => (
    <Col>
      {(['default', 'success', 'warning', 'error'] as const).map((intent: ButtonIntent) => (
        <Row key={intent} label={intent}>
          <TextButton intent={intent}>Default</TextButton>
          <TextButton intent={intent} disabled>Disabled</TextButton>
        </Row>
      ))}
    </Col>
  ),
}

// ── Focus states ──────────────────────────────────────────────────────────────
export const FocusStates: Story = {
  name: 'States · Focus',
  render: () => (
    <Col>
      {(['default', 'success', 'warning', 'error'] as const).map((intent: ButtonIntent) => (
        <Row key={intent} label={intent}>
          {(['xl', 'md', 'sm'] as const).map((size: ButtonSize) => (
            <FocusedTextButton key={size} intent={intent} size={size}>
              Action
            </FocusedTextButton>
          ))}
        </Row>
      ))}
    </Col>
  ),
}

// ── Icons ─────────────────────────────────────────────────────────────────────
export const WithIcons: Story = {
  name: 'Layout · Icons',
  render: () => (
    <Col>
      {(['xl', 'md', 'sm'] as const).map((size: ButtonSize) => (
        <Row key={size} label={size}>
          <TextButton size={size}>No icon</TextButton>
          <TextButton size={size} leadingIcon={<PlusIcon />}>Leading</TextButton>
          <TextButton size={size} trailingIcon={<ChevronIcon />}>Trailing</TextButton>
          <TextButton size={size} leadingIcon={<PlusIcon />} trailingIcon={<ChevronIcon />}>Both</TextButton>
        </Row>
      ))}
    </Col>
  ),
}
