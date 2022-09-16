import Syno from 'perhaps-foliage/dist/main-process/state-interface/syntactic-interface/readable/syno';

import type SyntaxTree from 'perhaps-foliage/dist/main-process/state-interface/syntactic-interface/readable/syntax-tree';

import FunctionParameter from './function-parameter';
import reinstantiateAsExpression from './reinstantiate-as-expression';

import type { Expression } from '../types/synos/expression';
import type { RawArgument } from '../types/synos/raw/argument';

export default class Argument extends Syno {
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

  value(): Expression | null {
    const valueChildren = this.children({ label: 'value' });

    return valueChildren.length === 1
      ? reinstantiateAsExpression(valueChildren[0]) as unknown as Expression
      : null;
  }

  parameter(): FunctionParameter | null {
    const param = this.followRef('parameter');

    if (param === null) {
      return null;
    }

    return new FunctionParameter(param.id, param.tree);
  }
}
