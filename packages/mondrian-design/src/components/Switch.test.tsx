import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  it('toggles and emits state changes', async () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="Enable mode" onCheckedChange={onCheckedChange} />);
    const switchControl = screen.getByRole('switch', { name: 'Enable mode' });
    expect(switchControl).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(switchControl);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});

