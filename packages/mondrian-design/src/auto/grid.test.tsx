import { describe, expect, it } from 'vitest';
import { generateGridLayout } from '../auto/grid';

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
  });
});
