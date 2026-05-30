import './styles.css';

export type { ComponentSize, ComponentTone, ComponentVariant, MondrianTheme } from './types';
export * from './components';
export * from './tokens';
export * from './auto';
export { MondrianProvider, createMondrianTheme, useMondrianTheme } from './theme';

// Web Components 提供独立入口 mondrian-design/web-components
// 使用方式: import 'mondrian-design/web-components'

