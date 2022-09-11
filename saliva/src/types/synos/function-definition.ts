import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syno';
import SyntaxTree from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syntax-tree';

import { RawFunctionDefinition } from './raw/function-definition';

export type FunctionDefinition = Syno & {
  readonly id: string;
  readonly tree: SyntaxTree;
  readonly raw: RawFunctionDefinition;
  readonly type: RawFunctionDefinition['type'];
  readonly rootwardEdgeLabel: RawFunctionDefinition['rootwardEdgeLabel'];
  readonly parentId: RawFunctionDefinition['parentId'];
  readonly childIds: RawFunctionDefinition['childIds'];
  readonly intratreeRefs: RawFunctionDefinition['intratreeRefs'];
  readonly intertreeRefs: RawFunctionDefinition['intertreeRefs'];
  readonly attrs: RawFunctionDefinition['attrs'];
};
