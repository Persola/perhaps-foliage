import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syno';
import SyntaxTree from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syntax-tree';

import { RawFunctionParameter } from '../types/synos/raw/function-parameter';

export default class FunctionParameter extends Syno {
  readonly id: string;
  readonly tree: SyntaxTree;
  readonly raw: RawFunctionParameter;
  readonly type: RawFunctionParameter['type'];
  readonly rootwardEdgeLabel: RawFunctionParameter['rootwardEdgeLabel'];
  readonly parentId: RawFunctionParameter['parentId'];
  readonly childIds: RawFunctionParameter['childIds'];
  readonly intratreeRefs: RawFunctionParameter['intratreeRefs'];
  readonly intertreeRefs: RawFunctionParameter['intertreeRefs'];
  readonly attrs: RawFunctionParameter['attrs'];
}
