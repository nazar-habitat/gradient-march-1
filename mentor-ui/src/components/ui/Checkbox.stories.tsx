import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { TreeSelect } from 'antd'
import { Checkbox } from './Checkbox'
import type { CheckboxVisualState } from './Checkbox'

type MatrixState = 'default' | 'hover' | 'pressed' | 'focus' | 'error' | 'disabled'
type MatrixSelection = 'unchecked' | 'checked' | 'intermediate'

const matrixStates: MatrixState[] = ['default', 'hover', 'pressed', 'focus', 'error', 'disabled']
const matrixSelections: MatrixSelection[] = ['unchecked', 'checked', 'intermediate']

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    visualState: {
      control: 'select',
      options: ['default', 'hover', 'pressed', 'focus'],
    },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Playground: Story = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    error: false,
    visualState: 'default',
    label: 'Checkbox label',
    description: '',
  },
}

export const Layout: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 40, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ color: '#949494', fontSize: 12 }}>Simple</div>
        <Checkbox />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ color: '#949494', fontSize: 12 }}>With label</div>
        <Checkbox label="Checkbox label" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ color: '#949494', fontSize: 12 }}>With label and description</div>
        <Checkbox label="Checkbox label" description="Description text" />
      </div>
    </div>
  ),
}

function matrixProps(state: MatrixState, selection: MatrixSelection) {
  const checked = selection === 'checked'
  const indeterminate = selection === 'intermediate'
  const disabled = state === 'disabled'
  const error = state === 'error'
  const visualState: CheckboxVisualState =
    state === 'hover' || state === 'pressed' || state === 'focus' ? state : 'default'

  return {
    checked,
    indeterminate,
    disabled,
    error,
    visualState,
  }
}

export const StatesMatrix: Story = {
  name: 'States Matrix',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(3, 140px)', border: '1px solid #313131' }}>
      <div style={{ borderBottom: '1px solid #313131', borderRight: '1px solid #313131', minHeight: 48 }} />
      <div style={{ borderBottom: '1px solid #313131', borderRight: '1px solid #313131', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Default</div>
      <div style={{ borderBottom: '1px solid #313131', borderRight: '1px solid #313131', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Selected</div>
      <div style={{ borderBottom: '1px solid #313131', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Intermediate</div>
      {matrixStates.map((state) => (
        <div key={state} style={{ display: 'contents' }}>
          <div style={{ borderBottom: '1px solid #313131', borderRight: '1px solid #313131', color: '#ffffff', display: 'flex', alignItems: 'center', paddingInline: 12, minHeight: 56, textTransform: 'capitalize' }}>
            {state}
          </div>
          {matrixSelections.map((selection, index) => (
            <div
              key={`${state}-${selection}`}
              style={{
                borderBottom: '1px solid #313131',
                borderRight: index < matrixSelections.length - 1 ? '1px solid #313131' : undefined,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 56,
              }}
            >
              <Checkbox {...matrixProps(state, selection)} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}

const treeData = [
  {
    title: 'Site A',
    value: 'site-a',
    key: 'site-a',
    children: [
      { title: 'Chiller 1', value: 'site-a-chiller-1', key: 'site-a-chiller-1' },
      { title: 'Chiller 2', value: 'site-a-chiller-2', key: 'site-a-chiller-2' },
    ],
  },
  {
    title: 'Site B',
    value: 'site-b',
    key: 'site-b',
    children: [
      { title: 'Cooling Tower 1', value: 'site-b-cooling-tower-1', key: 'site-b-cooling-tower-1' },
    ],
  },
]

export const InTreeSelect: Story = {
  name: 'In TreeSelect',
  render: () => {
    const [value, setValue] = useState<string[]>(['site-a-chiller-1'])

    return (
      <div style={{ width: 360 }}>
        <TreeSelect
          treeCheckable
          treeDefaultExpandAll
          value={value}
          onChange={(nextValue) => setValue((nextValue as string[]) ?? [])}
          treeData={treeData}
          className="gradient-tree-select"
          popupClassName="gradient-tree-select-dropdown"
          style={{ width: '100%' }}
          placeholder="Select assets"
        />
      </div>
    )
  },
}
