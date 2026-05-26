import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AudioPlayer } from './AudioPlayer';

describe('AudioPlayer', () => {
  it('renders title and audio element', () => {
    const { container } = render(<AudioPlayer title="Track A" src="demo.mp3" />);
    expect(screen.getByText('Track A')).toBeInTheDocument();
    expect(container.querySelector('audio')).toBeTruthy();
  });
});

