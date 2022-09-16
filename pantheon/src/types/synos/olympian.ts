import SyntaxTree from 'perhaps-foliage/dist/main-process/state-interface/syntactic-interface/readable/syntax-tree';

import { RawOlympian } from './raw/olympian';

export type Olympian = {
  readonly id: string;
  readonly tree: SyntaxTree;
  readonly raw: RawOlympian;
  readonly type: 'olympian';
  readonly rootwardEdgeLabel: 'child';
  readonly parentId: string;
  readonly childIds: string[];
  readonly intratreeRefs: Record<string, never>;
  readonly intertreeRefs: Record<string, never>;
  readonly attrs: { name: string };
};
