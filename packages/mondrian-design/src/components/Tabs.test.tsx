import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Tabs } from './Tabs';

describe('Tabs', () => {
  it('switches panel when tab is clicked', async () => {
    render(
      <Tabs
        items={[
          { key: 'one', label: 'One', content: 'Panel One' },
          { key: 'two', label: 'Two', content: 'Panel Two' },
        ]}
      />,
    );
    expect(screen.getByText('Panel One')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(screen.getByText('Panel Two')).toBeInTheDocument();
  });
});

