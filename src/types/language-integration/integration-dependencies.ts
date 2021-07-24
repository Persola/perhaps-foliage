import * as React from 'react';
import type { ReactType } from '../react';
import type { NamePartProps } from '../renderer/name-part-props';

export type IntegrationDependencies = {
  readonly React: ReactType;
  readonly components: {
    readonly NamePart: React.ComponentType<NamePartProps>;
  };
};
