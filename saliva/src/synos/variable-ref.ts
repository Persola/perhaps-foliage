import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syno';
import SyntaxTree from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syntax-tree';

import { RawVariableRef } from '../types/synos/raw/variable-ref';

export default class VariableRef extends Syno {
  readonly id: string;
  readonly tree: SyntaxTree;
  readonly raw: RawVariableRef;
  readonly type: RawVariableRef['type'];
  readonly rootwardEdgeLabel: RawVariableRef['rootwardEdgeLabel'];
  readonly parentId: RawVariableRef['parentId'];
  readonly childIds: RawVariableRef['childIds'];
  readonly intratreeRefs: RawVariableRef['intratreeRefs'];
  readonly intertreeRefs: RawVariableRef['intertreeRefs'];
  readonly attrs: RawVariableRef['attrs'];
}
