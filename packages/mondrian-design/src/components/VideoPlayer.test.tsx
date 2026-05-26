import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VideoPlayer } from './VideoPlayer';

describe('VideoPlayer', () => {
  it('renders title and video element', () => {
    const { container } = render(<VideoPlayer title="Clip A" src="demo.mp4" />);
    expect(screen.getByText('Clip A')).toBeInTheDocument();
    expect(container.querySelector('video')).toBeTruthy();
  });
});

