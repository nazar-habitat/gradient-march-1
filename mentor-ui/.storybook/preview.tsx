import React from 'react'
import type { Preview } from '@storybook/react-vite'
import '../src/index.css'
import { GradientProvider } from '../src/components/GradientProvider'

const preview: Preview = {
  decorators: [
    (Story) => (
      <GradientProvider>
        <div style={{ padding: '2rem' }}>
          <Story />
        </div>
      </GradientProvider>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark',    value: '#000000' },
        { name: 'surface', value: '#141414' },
        { name: 'light',   value: '#ffffff' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
  },
}

export default preview
