import * as React from 'react';
import type { TextProps } from '../renderer/components/text-props';

export type IntegrationDependencies = {
  readonly React: (typeof React);
  readonly components: {
    readonly Text: React.ComponentType<TextProps>;
  };
};
