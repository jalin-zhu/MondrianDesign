import { describe, expect, it } from 'vitest';
import { generateGridLayout, responsiveMaxColumns, responsiveGap } from '../auto/grid';

describe('grid engine', () => {
  describe('generateGridLayout', () => {
    it('returns empty config for 0 children', () => {
      const config = generateGridLayout(0);
      expect(config.columns).toBe('1fr');
      expect(config.rows).toBe('1fr');
      expect(config.cells).toHaveLength(0);
    });

    it('returns 1 cell for 1 child', () => {
      const config = generateGridLayout(1);
      expect(config.cells).toHaveLength(1);
      expect(config.cells[0].area).toBe('a0');
    });

    it('returns correct cell count for 5 children', () => {
      const config = generateGridLayout(5);
      expect(config.cells).toHaveLength(5);
    });

    it('generates grid-template-areas for 4 children', () => {
      const config = generateGridLayout(4);
      // 4 children → cols=2, rows=2
      expect(config.areas).toContain('a0');
      expect(config.areas).toContain('a1');
      expect(config.areas).toContain('a2');
      expect(config.areas).toContain('a3');
    });

    it('respects custom columns', () => {
      const config = generateGridLayout(6, { columns: 3 });
      // 3 columns for 6 children → 2 rows
      const rowLines = config.areas.split('\n');
      expect(rowLines).toHaveLength(2);
    });

    it('cells have valid tones', () => {
      const config = generateGridLayout(8);
      const validTones = ['red', 'yellow', 'blue', 'white', 'black', 'default'];
      for (const cell of config.cells) {
        expect(validTones).toContain(cell.tone);
      }
    });

    it('at least one cell is dominant', () => {
      const config = generateGridLayout(4);
      const dominants = config.cells.filter((c) => c.dominant);
      expect(dominants.length).toBeGreaterThan(0);
    });

    it('respects custom ratio', () => {
      const config = generateGridLayout(3, { ratio: 2.0, columns: 2 });
      expect(config.columns).toBeDefined();
      // With ratio 2.0, first column should be larger
      expect(config.columns).toContain('fr');
    });

    it('respects maxColumns constraint', () => {
      // 12 children → ideal cols = 4, but maxColumns = 2 → cols = 2
      const config = generateGridLayout(12, {}, 2);
      const rowLines = config.areas.split('\n');
      expect(rowLines.length).toBe(6); // 12 items / 2 cols = 6 rows
    });

    it('maxColumns does not exceed item count', () => {
      // 3 children, maxColumn = 5 → cols should be capped by item count
      const config = generateGridLayout(3, {}, 5);
      // ideal = ceil(sqrt(3)) = 2, max = 5 → cols = 2
      const rowLines = config.areas.split('\n');
      expect(rowLines.length).toBe(2); // 3 items / 2 cols = 2 rows
    });
  });

  describe('responsiveMaxColumns', () => {
    it('returns 2 for mobile width (< 480px)', () => {
      expect(responsiveMaxColumns(375)).toBe(2);
      expect(responsiveMaxColumns(320)).toBe(2);
    });

    it('returns 3 for tablet width (480-767px)', () => {
      expect(responsiveMaxColumns(500)).toBe(3);
      expect(responsiveMaxColumns(760)).toBe(3);
    });

    it('returns 4 for small desktop (768-1023px)', () => {
      expect(responsiveMaxColumns(800)).toBe(4);
      expect(responsiveMaxColumns(1000)).toBe(4);
    });

    it('returns 6 for full desktop (>= 1024px)', () => {
      expect(responsiveMaxColumns(1200)).toBe(6);
      expect(responsiveMaxColumns(1920)).toBe(6);
    });

    it('respects custom breakpoints', () => {
      const bp = { mobile: 600, tablet: 900, desktop: 1200 };
      expect(responsiveMaxColumns(500, 12, bp)).toBe(2);
      expect(responsiveMaxColumns(800, 12, bp)).toBe(3);
      expect(responsiveMaxColumns(1000, 12, bp)).toBe(4);
    });
  });

  describe('responsiveGap', () => {
    it('halves gap on mobile', () => {
      expect(responsiveGap(375, 12)).toBe(6);
    });

    it('reduces gap on tablet', () => {
      const gap = responsiveGap(600, 12);
      expect(gap).toBeLessThan(12);
      expect(gap).toBeGreaterThanOrEqual(6);
    });

    it('keeps original gap on desktop', () => {
      expect(responsiveGap(1200, 12)).toBe(12);
    });
  });
});
