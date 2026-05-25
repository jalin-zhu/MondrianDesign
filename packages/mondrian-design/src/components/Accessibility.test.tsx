import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';

describe('Accessibility baseline', () => {
  it('button has no obvious axe violations', async () => {
    const { container } = render(<Button>A11y</Button>);
    const results = await axe(container);
    expect(results.violations.length).toBe(0);
  });
});
