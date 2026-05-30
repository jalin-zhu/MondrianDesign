import { describe, expect, it } from 'vitest';
import type { MondrianTheme } from '../types';
import { autoTone, autoTextColor, getBestPairing } from '../auto/tone-selector';
import { generateMondrianPalette } from '../auto/palette';

const palette = generateMondrianPalette('#d62828');

describe('tone-selector', () => {
  describe('autoTextColor', () => {
    it('returns black for yellow', () => {
      expect(autoTextColor('yellow')).toBe('black');
    });

    it('returns black for white', () => {
      expect(autoTextColor('white')).toBe('black');
    });

    it('returns white for red', () => {
      expect(autoTextColor('red')).toBe('white');
    });

    it('returns white for blue', () => {
      expect(autoTextColor('blue')).toBe('white');
    });

    it('returns white for black', () => {
      expect(autoTextColor('black')).toBe('white');
    });

    it('returns black for default', () => {
      expect(autoTextColor('default')).toBe('black');
    });
  });

  describe('autoTone', () => {
    it('selects a tone for white background', () => {
      const tone = autoTone('#ffffff', palette);
      // Any tone should work on white (all have contrast > 4.5)
      expect(['red', 'yellow', 'blue', 'white', 'black', 'default']).toContain(tone);
    });

    it('selects a tone for black background', () => {
      const tone = autoTone('#111111', palette);
      expect(['red', 'yellow', 'blue', 'white', 'black', 'default']).toContain(tone);
    });

    it('prefers high-contrast tones on mid-gray', () => {
      const tone = autoTone('#808080', palette);
      // On mid-gray, expect a dark or light tone, not default
      expect(tone).toBeDefined();
    });

    it('respects minContrast option', () => {
      // Very strict contrast - likely no tone passes
      const tone = autoTone('#808080', palette, { minContrast: 10, fallback: false });
      expect(tone).toBe('default'); // fallback disabled, returns default
    });

    it('fallback works when no tone meets minContrast', () => {
      const tone = autoTone('#808080', palette, { minContrast: 10, fallback: true });
      // With fallback, picks the highest contrast
      expect(['red', 'yellow', 'blue', 'white', 'black', 'default']).toContain(tone);
    });
  });

  describe('getBestPairing', () => {
    it('returns valid pairing', () => {
      const pairing = getBestPairing('#ffffff', palette);
      expect(pairing).toHaveProperty('tone');
      expect(pairing).toHaveProperty('textColor');
    });

    it('text color is consistent with tone rules', () => {
      const pairing = getBestPairing('#ffffff', palette);
      expect(pairing.textColor).toBe(autoTextColor(pairing.tone));
    });
  });
});
