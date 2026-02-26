import React from 'react'

interface ChevronProps {
  open:   boolean
  color:  string
  style?: React.CSSProperties
}

/**
 * Animated chevron indicator shared by Select and MultiSelect.
 * Rotates 180° when open. Uses currentColor so the parent controls the tint.
 */
export function Chevron({ open, color, style }: ChevronProps) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      style={{
        color,
        display:    'block',
        flexShrink: 0,
        transform:  open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 120ms ease',
        ...style,
      }}
    >
      <path
        d="M6.25 8.75L10 12.5L13.75 8.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
