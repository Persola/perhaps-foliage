import type { SyntypeNonTreeRefs } from './syntype-non-tree-refs';
import type { SyntypeProperties } from './syntype-properties';

export type SyntypeSchema = Readonly<{
  [syntypeName: string]: Readonly<{
    readonly nonTreeRefs: Readonly<SyntypeNonTreeRefs>;
    readonly properties: Readonly<SyntypeProperties>;
  }>;
}>;
