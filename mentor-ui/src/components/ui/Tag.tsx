import React from 'react'
import { Tag as AntTag } from 'antd'
import type { TagProps as AntTagProps } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './Tag.css'

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

function cx(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(' ')
}

export function Tag({
  label,
  tone = 'neutral',
  size = 'xs',
  removable = false,
  onRemove,
  disabled = false,
  className,
  style,
  ...rest
}: TagProps) {
  return (
    <AntTag
      {...rest}
      className={cx(
        'gradient-tag',
        `gradient-tag--${tone}`,
        `gradient-tag--${size}`,
        disabled && 'gradient-tag--disabled',
        className,
      )}
      closable={removable && !disabled}
      onClose={(event) => {
        event.preventDefault()
        onRemove?.()
      }}
      closeIcon={<CloseOutlined />}
      style={style}
    >
      {label}
    </AntTag>
  )
}

export default Tag
