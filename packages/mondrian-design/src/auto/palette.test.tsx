import { describe, expect, it } from 'vitest';
import {
  generateMondrianPalette,
  hexToHsl,
  hslToHex,
  getContrastRatio,
} from '../auto/palette';

describe('palette engine', () => {
  describe('hexToHsl / hslToHex round-trip', () => {
    it('converts pure red correctly', () => {
      const hsl = hexToHsl('#ff0000');
      expect(hsl.h).toBe(0);
      expect(hsl.s).toBe(100);
      expect(hsl.l).toBe(50);
      expect(hslToHex(hsl)).toBe('#ff0000');
    });

    it('converts pure black correctly', () => {
      const hsl = hexToHsl('#000000');
      expect(hsl.s).toBe(0);
      expect(hsl.l).toBe(0);
      expect(hslToHex(hsl)).toBe('#000000');
    });

    it('converts pure white correctly', () => {
      const hsl = hexToHsl('#ffffff');
      expect(hsl.s).toBe(0);
      expect(hsl.l).toBe(100);
      expect(hslToHex(hsl)).toBe('#ffffff');
    });

    it('round-trips a mid-tone color within small delta', () => {
      const original = '#3b82f6';
      const hsl = hexToHsl(original);
      const hex = hslToHex(hsl);
      // HSL round-trip has inherent precision loss from integer rounding;
      // verify each RGB channel differs by at most 2
      const parseCh = (h: string, i: number) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
      for (let c = 0; c < 3; c++) {
        expect(Math.abs(parseCh(original, c) - parseCh(hex, c))).toBeLessThanOrEqual(2);
      }
    });
  });

  describe('getContrastRatio', () => {
    it('black on white = 21:1', () => {
      const ratio = getContrastRatio('#000000', '#ffffff');
      expect(ratio).toBeCloseTo(21, 0);
    });

    it('white on white = 1:1', () => {
      const ratio = getContrastRatio('#ffffff', '#ffffff');
      expect(ratio).toBeCloseTo(1, 1);
    });

    it('red on white meets WCAG AA', () => {
      const ratio = getContrastRatio('#d62828', '#ffffff');
      expect(ratio).toBeGreaterThan(4.5);
    });
  });

  describe('generateMondrianPalette', () => {
    it('returns all 6 palette keys', () => {
      const palette = generateMondrianPalette('#d62828');
      expect(palette).toHaveProperty('red');
      expect(palette).toHaveProperty('yellow');
      expect(palette).toHaveProperty('blue');
      expect(palette).toHaveProperty('white');
      expect(palette).toHaveProperty('black');
      expect(palette).toHaveProperty('canvas');
    });

    it('returns valid hex colors', () => {
      const palette = generateMondrianPalette('#3b82f6');
      const hexRe = /^#[0-9a-f]{6}$/;
      for (const [, v] of Object.entries(palette)) {
        expect(v).toMatch(hexRe);
      }
    });

    it('warm seed produces red-ish dominant', () => {
      const palette = generateMondrianPalette('#d62828');
      const redHsl = hexToHsl(palette.red);
      // Red should be in warm range (0-30 or 330-360)
      expect(redHsl.h >= 330 || redHsl.h <= 30).toBe(true);
    });

    it('cool seed produces blue-ish dominant', () => {
      const palette = generateMondrianPalette('#1d4ed8');
      const blueHsl = hexToHsl(palette.blue);
      // Blue should be in cool range (180-270)
      expect(blueHsl.h).toBeGreaterThanOrEqual(180);
      expect(blueHsl.h).toBeLessThanOrEqual(270);
    });

    it('yellow is distinct from red and blue', () => {
      const palette = generateMondrianPalette('#d62828');
      // All 3 primary colors should be different
      expect(palette.red).not.toBe(palette.yellow);
      expect(palette.red).not.toBe(palette.blue);
      expect(palette.yellow).not.toBe(palette.blue);
    });

    it('forceWarm flag works with cool seed', () => {
      const palette = generateMondrianPalette('#1d4ed8', { forceWarm: true });
      const redHsl = hexToHsl(palette.red);
      expect(redHsl.h >= 330 || redHsl.h <= 30).toBe(true);
    });

    it('canvas is lighter than black', () => {
      const palette = generateMondrianPalette('#d62828');
      const canvasL = hexToHsl(palette.canvas).l;
      const blackL = hexToHsl(palette.black).l;
      expect(canvasL).toBeGreaterThan(blackL);
    });
  });
});
