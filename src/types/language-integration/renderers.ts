import * as React from 'react';

export type Renderers = Readonly<{
  [syntype: string]: React.ComponentType<{
    [propName: string]: unknown;
  }>;
}>;
