import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syno';
import SyntaxTree from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syntax-tree';

import { RawFunctionCall } from './raw/function-call';

export type FunctionCall = Syno & {
  readonly id: string;
  readonly tree: SyntaxTree;
  readonly raw: RawFunctionCall;
  readonly type: RawFunctionCall['type'];
  readonly rootwardEdgeLabel: RawFunctionCall['rootwardEdgeLabel'];
  readonly parentId: RawFunctionCall['parentId'];
  readonly childIds: RawFunctionCall['childIds'];
  readonly intratreeRefs: RawFunctionCall['intratreeRefs'];
  readonly intertreeRefs: RawFunctionCall['intertreeRefs'];
  readonly attrs: RawFunctionCall['attrs'];
};
