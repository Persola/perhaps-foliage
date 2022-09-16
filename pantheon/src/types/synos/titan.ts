import SyntaxTree from 'perhaps-foliage/dist/main-process/state-interface/syntactic-interface/readable/syntax-tree';

import { RawTitan } from './raw/titan';

export type Titan = {
  readonly id: string;
  readonly tree: SyntaxTree;
  readonly raw: RawTitan;
  readonly type: 'titan';
  readonly rootwardEdgeLabel: null;
  readonly parentId: null;
  readonly childIds: string[];
  readonly intratreeRefs: Record<string, never>;
  readonly intertreeRefs: Record<string, never>;
  readonly attrs: { name: string };
};
