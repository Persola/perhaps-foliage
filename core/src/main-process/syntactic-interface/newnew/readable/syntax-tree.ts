import Syno from './syno';

import AbstractSyntaxTree from '../abstract/abstract-syntax-tree';

import { TreeList } from '../../../../types/syntactic/newnew/tree-list';

export default class SyntaxTree extends AbstractSyntaxTree<Syno> {
  /*
    SyntaxTree instances can only be used from when they are instantiated until
    the next state update because they reference a specific version of the state
  */

  constructor(
    id: string,
    treeList: TreeList,
  ) {
    super(id, treeList);
    this.SynoClass = Syno;
  }
}
