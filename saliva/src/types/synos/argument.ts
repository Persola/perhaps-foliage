import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syno';
import SyntaxTree from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syntax-tree';

import { RawArgument } from './raw/argument';

export type Argument = Syno & {
  readonly id: string;
  readonly tree: SyntaxTree;
  readonly raw: RawArgument;
  readonly type: RawArgument['type'];
  readonly rootwardEdgeLabel: RawArgument['rootwardEdgeLabel'];
  readonly parentId: RawArgument['parentId'];
  readonly childIds: RawArgument['childIds'];
  readonly intratreeRefs: RawArgument['intratreeRefs'];
  readonly intertreeRefs: RawArgument['intertreeRefs'];
  readonly attrs: RawArgument['attrs'];
};
