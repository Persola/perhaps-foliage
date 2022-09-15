import SyntaxTree from './syntax-tree';

import AbstractSyno from '../abstract/abstract-syno';

export default class Syno extends AbstractSyno<SyntaxTree> {
  /*
    MutableSyno instances can only be used from when they are instantiated until
    the next state update because they reference a specific version of the state
  */

  constructor(
    id: string,
    tree: SyntaxTree,
  ) {
    super(id, tree);
    this.SynoClass = Syno;
    this.TreeClass = SyntaxTree;
  }
}
