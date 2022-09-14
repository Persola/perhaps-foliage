import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syno';
import SyntaxTree from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syntax-tree';

import FunctionDefinition from './function-definition';
import Argument from './argument';

import { RawFunctionCall } from '../types/synos/raw/function-call';

export default class FunctionCall extends Syno {
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

  callee(): FunctionDefinition | null {
    return (
      this.hasRef('callee')
        ? this.followRef('callee')
        : this.children({ label: 'callee' })[0] || null
    ) as unknown as FunctionDefinition | null;
  }

  argumentz(): Argument[] {
    return this.children({ label: 'argument' }) as unknown as Argument[];
  }
}
