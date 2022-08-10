import type { SyntypeChildren } from './syntype-children';
import type { SyntypeNonTreeRefs } from './syntype-non-tree-refs';
import type { SyntypeProperties } from './syntype-properties';

export type GrammarSyntypeEntry = Readonly<{
  readonly rootable: boolean;
  readonly children: Readonly<SyntypeChildren>;
  readonly nonTreeRefs: Readonly<SyntypeNonTreeRefs>;
  readonly properties: Readonly<SyntypeProperties>;
}>;
