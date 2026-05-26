import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { useMondrianAutoTheme } from '../auto/use-auto-theme';
import { MondrianProvider } from '../theme';

/** 测试辅助：渲染一个使用 useMondrianAutoTheme 的组件 */
function TestConsumer({
  seedColor,
  onResult,
}: {
  seedColor: string;
  onResult: (r: ReturnType<typeof useMondrianAutoTheme>) => void;
}) {
  const result = useMondrianAutoTheme({ seedColor });
  onResult(result);
  return null;
}

describe('auto-theme', () => {
  describe('useMondrianAutoTheme', () => {
    it('generates theme from seed color', () => {
      let captured: ReturnType<typeof useMondrianAutoTheme> | null = null;
      render(
        <MondrianProvider>
          <TestConsumer
            seedColor="#d62828"
            onResult={(r) => {
              captured = r;
            }}
          />
        </MondrianProvider>,
      );

      expect(captured).not.toBeNull();
      expect(captured!.theme).toBeDefined();
      expect(captured!.theme.palette.red).toBeDefined();
      expect(captured!.theme.palette.yellow).toBeDefined();
      expect(captured!.theme.palette.blue).toBeDefined();
    });

    it('palette and theme.palette are consistent', () => {
      let captured: ReturnType<typeof useMondrianAutoTheme> | null = null;
      render(
        <MondrianProvider>
          <TestConsumer
            seedColor="#3b82f6"
            onResult={(r) => {
              captured = r;
            }}
          />
        </MondrianProvider>,
      );

      expect(captured!.palette).toEqual(captured!.theme.palette);
    });
  });
});
