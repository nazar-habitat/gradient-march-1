import React from 'react'
import { SingleSelect, type SingleSelectProps } from './SingleSelect'
import { MultiSelect, type MultiSelectProps } from './MultiSelect'

type SelectSingleProps = SingleSelectProps & { mode?: undefined }
type SelectMultiProps  = MultiSelectProps  & { mode: 'multiple' }

export type SelectProps = SelectSingleProps | SelectMultiProps

export function Select(props: SelectProps) {
  if (props.mode === 'multiple') {
    const { mode, ...rest } = props
    return <MultiSelect {...rest} />
  }
  const { mode, ...rest } = props as SelectSingleProps
  return <SingleSelect {...rest} />
}

export default Select
