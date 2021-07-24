import * as React from 'react';

export type Renderers = Readonly<
  Record<string, React.ComponentType<Record<string, any>>>
>;
