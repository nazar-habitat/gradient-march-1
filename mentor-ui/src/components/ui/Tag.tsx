import React from 'react'
import { Tag as AntTag } from 'antd'
import type { TagProps as AntTagProps } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

export type TagTone =
  | 'turquoise'
  | 'warning'
  | 'lime'
  | 'success'
  | 'neutral'
  | 'error'
  | 'plum'
  | 'violet'

export type TagSize = 'xs' | 'sm' | 'md'

export interface TagProps extends Omit<AntTagProps, 'color' | 'children' | 'closable' | 'onClose'> {
  label: React.ReactNode
  tone?: TagTone
  size?: TagSize
  removable?: boolean
  onRemove?: () => void
  disabled?: boolean
}

type ToneStyle = {
  backgroundColor: string
  color: string
}

const toneStyles: Record<TagTone, ToneStyle> = {
  turquoise: { backgroundColor: '#063435', color: '#8ce8e9' },
  warning: { backgroundColor: '#402c06', color: '#ffd280' },
  lime: { backgroundColor: '#324010', color: '#daff7d' },
  success: { backgroundColor: '#044015', color: '#7af59d' },
  neutral: { backgroundColor: '#313131', color: '#dedede' },
  error: { backgroundColor: '#510f02', color: '#fcb7a9' },
  plum: { backgroundColor: '#350635', color: '#e98ce9' },
  violet: { backgroundColor: '#160635', color: '#ab8ce9' },
}

const sizeStyles: Record<TagSize, React.CSSProperties> = {
  xs: {
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '16px',
    minHeight: 16,
    paddingInline: 4,
    paddingBlock: 0,
  },
  sm: {
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '16px',
    minHeight: 20,
    paddingInline: 4,
    paddingBlock: 2,
  },
  md: {
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '24px',
    minHeight: 28,
    paddingInline: 6,
    paddingBlock: 2,
  },
}

export function Tag({
  label,
  tone = 'neutral',
  size = 'xs',
  removable = false,
  onRemove,
  disabled = false,
  style,
  ...rest
}: TagProps) {
  const toneStyle = toneStyles[tone]

  return (
    <AntTag
      {...rest}
      closable={removable && !disabled}
      onClose={(event) => {
        event.preventDefault()
        onRemove?.()
      }}
      closeIcon={
        <CloseOutlined
          style={{
            color: toneStyle.color,
            fontSize: size === 'md' ? 10 : 8,
            lineHeight: 1,
          }}
        />
      }
      style={{
        ...toneStyle,
        ...sizeStyles[size],
        alignItems: 'center',
        border: 'none',
        display: 'inline-flex',
        fontFamily: 'Inter, sans-serif',
        gap: 2,
        marginInlineEnd: 0,
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : undefined,
        userSelect: 'none',
        ...style,
      }}
    >
      {label}
    </AntTag>
  )
}

export default Tag
