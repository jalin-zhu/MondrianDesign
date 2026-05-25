import type { Preview } from '@storybook/react';
import React from 'react';
import { MondrianProvider } from 'mondrian-design';
import 'mondrian-design/styles.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <MondrianProvider>
        <div style={{ padding: 24, background: '#f6f6f6', minHeight: '100vh' }}>
          <Story />
        </div>
      </MondrianProvider>
    ),
  ],
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default preview;

