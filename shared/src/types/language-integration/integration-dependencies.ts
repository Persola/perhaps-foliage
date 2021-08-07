import * as React from 'react';
import type { NamePartProps } from '../renderer/name-part-props';

export type IntegrationDependencies = {
  readonly React: (typeof React);
  readonly components: {
    readonly NamePart: React.ComponentType<NamePartProps>;
  };
};
