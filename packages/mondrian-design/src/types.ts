export type ComponentSize = 'sm' | 'md' | 'lg';
export type ComponentVariant = 'primary' | 'secondary' | 'outlined';
export type ComponentTone = 'default' | 'red' | 'yellow' | 'blue' | 'white' | 'black';

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<string, unknown> ? DeepPartial<T[K]> : T[K];
};

export interface MondrianTheme {
  palette: {
    red: string;
    yellow: string;
    blue: string;
    white: string;
    black: string;
    canvas: string;
  };
  border: {
    width: string;
    strongWidth: string;
    radius: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadow: {
    sm: string;
    md: string;
  };
  motion: {
    fast: string;
    normal: string;
  };
}

