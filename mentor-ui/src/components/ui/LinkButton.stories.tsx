import React, { useEffect, useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { LinkButton } from './LinkButton'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
    <span style={{ color: '#636363', fontSize: 12, width: 80, flexShrink: 0 }}>{label}</span>
    {children}
  </div>
)

/** Renders a LinkButton that is pre-focused (shows the focus ring in Storybook). */
const Focused = (props: React.ComponentProps<typeof LinkButton>) => {
  const ref = useRef<HTMLAnchorElement>(null)
  useEffect(() => { ref.current?.focus() }, [])
  return <LinkButton ref={ref} {...props} />
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof LinkButton> = {
  title:     'UI/LinkButton',
  component: LinkButton,
  parameters: { layout: 'padded' },
  argTypes: {
    disabled: { control: 'boolean' },
    href:     { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof LinkButton>

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    children:  'Action',
    disabled:  false,
    href:      '#',
  },
}

export const States: Story = {
  name: 'States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Row label="Default">
        <LinkButton href="#">Action</LinkButton>
      </Row>
      <Row label="Hover">
        {/* Hover is purely interactive — shown here with a note */}
        <LinkButton href="#" style={{ color: '#ffffff' }}>Action</LinkButton>
      </Row>
      <Row label="Pressed">
        <LinkButton href="#" style={{ color: '#adadad' }}>Action</LinkButton>
      </Row>
      <Row label="Disabled">
        <LinkButton disabled>Action</LinkButton>
      </Row>
    </div>
  ),
}

export const FocusState: Story = {
  name: 'Focus State',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Row label="Focused">
        <Focused href="#">Action</Focused>
      </Row>
      <Row label="Disabled">
        <LinkButton disabled>Action</LinkButton>
      </Row>
    </div>
  ),
}

export const InContext: Story = {
  name: 'In Context (inline text)',
  render: () => (
    <p style={{ color: '#dedede', fontSize: 14, lineHeight: '20px', maxWidth: 400 }}>
      By continuing you agree to our{' '}
      <LinkButton href="#">Terms of Service</LinkButton>
      {' '}and{' '}
      <LinkButton href="#">Privacy Policy</LinkButton>.
    </p>
  ),
}
