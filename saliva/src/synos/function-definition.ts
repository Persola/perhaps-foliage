import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syno';
import SyntaxTree from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syntax-tree';

import type FunctionParameter from './function-parameter';
import type { RawFunctionDefinition } from '../types/synos/raw/function-definition';

export default class FunctionDefinition extends Syno {
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

  parameters(): FunctionParameter[] {
    return this.children({ label: 'parameter' }) as unknown as FunctionParameter[];
  }
}
