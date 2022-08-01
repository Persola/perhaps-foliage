import * as React from 'react';

export type Renderer = React.ComponentType<{
  [propName: string]: unknown;
}>;
