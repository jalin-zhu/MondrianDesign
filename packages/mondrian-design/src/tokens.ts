import type { MondrianTheme } from './types';

export const classicMondrianTheme: MondrianTheme = {
  palette: {
    red: '#d62828',
    yellow: '#f7d038',
    blue: '#1d4ed8',
    white: '#ffffff',
    black: '#111111',
    canvas: '#f2f2f2',
  },
  border: {
    width: '2px',
    strongWidth: '4px',
    radius: '6px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  shadow: {
    sm: '0 1px 0 rgba(17, 17, 17, 0.08)',
    md: '0 4px 0 rgba(17, 17, 17, 0.2)',
  },
  motion: {
    fast: '120ms',
    normal: '200ms',
  },
};

