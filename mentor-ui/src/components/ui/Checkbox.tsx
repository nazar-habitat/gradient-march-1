import React from 'react'
import { Checkbox as AntCheckbox } from 'antd'
import type { CheckboxProps as AntCheckboxProps } from 'antd'
import './checkbox.css'

export type CheckboxVisualState = 'default' | 'hover' | 'pressed' | 'focus'

export interface CheckboxProps extends Omit<AntCheckboxProps, 'children'> {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: boolean
  visualState?: CheckboxVisualState
}

function cx(...classNames: Array<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(' ')
}

export function Checkbox({
  label,
  description,
  error = false,
  visualState = 'default',
  className,
  ...props
}: CheckboxProps) {
  return (
    <AntCheckbox
      className={cx(
        'gradient-checkbox',
        error && 'gradient-checkbox--error',
        visualState !== 'default' && `gradient-checkbox--${visualState}`,
        className,
      )}
      {...props}
    >
      {(label || description) && (
        <span className="gradient-checkbox__text">
          {label && <span className="gradient-checkbox__label">{label}</span>}
          {description && <span className="gradient-checkbox__description">{description}</span>}
        </span>
      )}
    </AntCheckbox>
  )
}

export default Checkbox
