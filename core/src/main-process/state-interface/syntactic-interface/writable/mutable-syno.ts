import AbstractSyno from '../abstract/abstract-syno';
import MutableSyntaxTree from './mutable-syntax-tree';

import subtreeSynoIds from '../utils/subtree-syno-ids';

export default class MutableSyno extends AbstractSyno<MutableSyntaxTree> {
  /*
    The raw property and tree.raw are immer'd proxies.

    MutableSyno instances can only be used from when they are instantiated until
    the next state update because they reference a specific version of the state
  */

  constructor(
    id: string,
    tree: MutableSyntaxTree,
  ) {
    super(id, tree);
    this.SynoClass = MutableSyno;
    this.TreeClass = MutableSyntaxTree;
  }

  destroy(): void {
    if (this.isRoot()) {
      throw new Error(`Cannot destroy root syno (${this.id})`);
    }

    for (const descendantId of subtreeSynoIds(this.id, this.tree.raw)) {
      this.tree.deleteExtratreeRefsTo(descendantId);
      this.tree.deleteExtratreeRefsFrom(descendantId);
      delete this.tree.raw.synoMap[descendantId];
    }

    this.parent().raw.childIds.splice(this.index(), 1);
  }
}
