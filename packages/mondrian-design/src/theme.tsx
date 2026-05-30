import React, { createContext, useContext, useMemo } from 'react';
import { classicMondrianTheme } from './tokens';
import type { DeepPartial, MondrianTheme } from './types';
import type { AutoThemeOptions } from './auto/types';
import { useMondrianAutoTheme } from './auto/use-auto-theme';

const MondrianThemeContext = createContext<MondrianTheme>(classicMondrianTheme);

function mergeTheme(base: MondrianTheme, overrides: DeepPartial<MondrianTheme> = {}): MondrianTheme {
  return {
    palette: { ...base.palette, ...overrides.palette },
    border: { ...base.border, ...overrides.border },
    spacing: { ...base.spacing, ...overrides.spacing },
    shadow: { ...base.shadow, ...overrides.shadow },
    motion: { ...base.motion, ...overrides.motion },
  };
}

function toCSSVars(theme: MondrianTheme): React.CSSProperties {
  return {
    '--md-red': theme.palette.red,
    '--md-yellow': theme.palette.yellow,
    '--md-blue': theme.palette.blue,
    '--md-white': theme.palette.white,
    '--md-black': theme.palette.black,
    '--md-canvas': theme.palette.canvas,
    '--md-border-width': theme.border.width,
    '--md-border-strong-width': theme.border.strongWidth,
    '--md-radius': theme.border.radius,
    '--md-space-xs': theme.spacing.xs,
    '--md-space-sm': theme.spacing.sm,
    '--md-space-md': theme.spacing.md,
    '--md-space-lg': theme.spacing.lg,
    '--md-space-xl': theme.spacing.xl,
    '--md-shadow-sm': theme.shadow.sm,
    '--md-shadow-md': theme.shadow.md,
    '--md-motion-fast': theme.motion.fast,
    '--md-motion-normal': theme.motion.normal,
  } as React.CSSProperties;
}

export function createMondrianTheme(overrides?: DeepPartial<MondrianTheme>): MondrianTheme {
  return mergeTheme(classicMondrianTheme, overrides);
}

export interface MondrianProviderProps {
  children: React.ReactNode;
  theme?: DeepPartial<MondrianTheme>;
  /** 自动主题模式：提供种子颜色，自动生成完整调色板 */
  autoTheme?: AutoThemeOptions;
}

export function MondrianProvider({ children, theme, autoTheme }: MondrianProviderProps): React.JSX.Element {
  const autoResult = useMondrianAutoTheme(autoTheme);
  const resolvedTheme = useMemo(
    () => (autoTheme ? autoResult.theme : createMondrianTheme(theme)),
    [theme, autoTheme, autoResult.theme],
  );

  return (
    <MondrianThemeContext.Provider value={resolvedTheme}>
      <div style={toCSSVars(resolvedTheme)}>{children}</div>
    </MondrianThemeContext.Provider>
  );
}

export function useMondrianTheme(): MondrianTheme {
  return useContext(MondrianThemeContext);
}

