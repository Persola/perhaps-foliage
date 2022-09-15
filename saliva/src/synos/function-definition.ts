import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syno';
import SyntaxTree from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syntax-tree';

import FunctionParameter from './function-parameter';
import type { RawFunctionDefinition } from '../types/synos/raw/function-definition';
import { Expression } from '../types/synos/expression';
import reinstantiateAsExpression from './reinstantiate-as-expression';

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

  body(): Expression | null {
    const body = this.children({ label: 'body' })[0] || null;

    if (body === null) {
      return null;
    }

    return reinstantiateAsExpression(body);
  }

  parameters(): FunctionParameter[] {
    return this.children({ label: 'parameter' }).map(arg => new FunctionParameter(arg.id, arg.tree));
  }
}
