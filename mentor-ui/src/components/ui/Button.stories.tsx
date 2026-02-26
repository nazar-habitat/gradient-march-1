import React, { useEffect, useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import type { ButtonIntent, ButtonSize } from './Button'

// ─── Layout helpers ───────────────────────────────────────────────────────────

const Row = ({ children, label }: { children: React.ReactNode; label?: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
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

/** Renders a single button and immediately focuses it so the focus ring is visible. */
const FocusedButton = (props: React.ComponentProps<typeof Button>) => {
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => { ref.current?.focus() }, [])
  return <Button ref={ref} {...props} />
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

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
    size:    { control: 'select', options: ['xl', 'md', 'sm'] },
    intent:  { control: 'select', options: ['default', 'success', 'warning', 'error'] },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof Button>

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    variant:  'primary',
    size:     'md',
    intent:   'default',
    children: 'Action',
    disabled: false,
  },
}

// ── Types ─────────────────────────────────────────────────────────────────────
export const Types: Story = {
  render: () => (
    <Row>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary" intent="success">Success</Button>
      <Button variant="secondary" intent="warning">Warning</Button>
      <Button variant="secondary" intent="error">Error</Button>
    </Row>
  ),
}

// ── Sizes ─────────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <Row>
      <Button variant="primary" size="xl">XLarge</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="sm">Small</Button>
    </Row>
  ),
}

// ── States — Primary ──────────────────────────────────────────────────────────
export const PrimaryStates: Story = {
  name: 'States · Primary',
  render: () => (
    <Row>
      <Button variant="primary">Default</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </Row>
  ),
}

// ── States — Secondary ────────────────────────────────────────────────────────
export const SecondaryStates: Story = {
  name: 'States · Secondary',
  render: () => (
    <Col>
      {(['default', 'success', 'warning', 'error'] as const).map((intent: ButtonIntent) => (
        <Row key={intent} label={intent}>
          <Button variant="secondary" intent={intent}>Default</Button>
          <Button variant="secondary" intent={intent} disabled>Disabled</Button>
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
      <Row label="primary">
        {(['xl', 'md', 'sm'] as const).map((size: ButtonSize) => (
          <FocusedButton key={size} variant="primary" size={size}>
            Action
          </FocusedButton>
        ))}
      </Row>
      {(['default', 'success', 'warning', 'error'] as const).map((intent: ButtonIntent) => (
        <Row key={intent} label={intent}>
          {(['xl', 'md', 'sm'] as const).map((size: ButtonSize) => (
            <FocusedButton key={size} variant="secondary" intent={intent} size={size}>
              Action
            </FocusedButton>
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
          <Button size={size}>No icon</Button>
          <Button size={size} leadingIcon={<PlusIcon />}>Leading</Button>
          <Button size={size} trailingIcon={<ChevronIcon />}>Trailing</Button>
          <Button size={size} leadingIcon={<PlusIcon />} trailingIcon={<ChevronIcon />}>Both</Button>
        </Row>
      ))}
    </Col>
  ),
}

// ── Full matrix ───────────────────────────────────────────────────────────────
export const FullMatrix: Story = {
  name: 'Full matrix',
  render: () => (
    <Col>
      {(['xl', 'md', 'sm'] as const).map((size: ButtonSize) => (
        <Row key={size} label={size}>
          <Button variant="primary" size={size}>Primary</Button>
          <Button variant="secondary" size={size}>Secondary</Button>
          <Button variant="secondary" size={size} intent="success">Success</Button>
          <Button variant="secondary" size={size} intent="warning">Warning</Button>
          <Button variant="secondary" size={size} intent="error">Error</Button>
        </Row>
      ))}
    </Col>
  ),
}
