import Syno from 'perhaps-foliage/dist/main-process/state-interface/syntactic-interface/readable/syno';
import SyntaxTree from 'perhaps-foliage/dist/main-process/state-interface/syntactic-interface/readable/syntax-tree';

import { RawBooleanLiteral } from '../types/synos/raw/boolean-literal';

export default class BooleanLiteral extends Syno {
  readonly id: string;
  readonly tree: SyntaxTree;
  readonly raw: RawBooleanLiteral;
  readonly type: RawBooleanLiteral['type'];
  readonly rootwardEdgeLabel: RawBooleanLiteral['rootwardEdgeLabel'];
  readonly parentId: RawBooleanLiteral['parentId'];
  readonly childIds: RawBooleanLiteral['childIds'];
  readonly intratreeRefs: RawBooleanLiteral['intratreeRefs'];
  readonly intertreeRefs: RawBooleanLiteral['intertreeRefs'];
  readonly attrs: RawBooleanLiteral['attrs'];
}
