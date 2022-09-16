import Syno from '../readable/syno';
import MutableSyntaxTree from './mutable-syntax-tree';

import subtreeSynoIds from '../utils/subtree-syno-ids';
import { IntertreeRefs, IntratreeRefs, RawSyno } from '../../../../types/syntactic/raw/raw-syno';
import { SynoAttrVal } from '../../../../types/syntactic/syno-attr-val';

export default class MutableSyno {
  /*
    The raw property and tree.raw are immer'd proxies.

    MutableSyno instances can only be used from when they are instantiated until
    the next state update because they reference a specific version of the state
  */
  readonly id: string;
  readonly tree: MutableSyntaxTree;
  readonly raw: RawSyno;
  readonly readable: Syno;
  readonly type: string;
  readonly rootwardEdgeLabel: string;
  readonly parentId: string | null;
  readonly childIds: string[];
  readonly intratreeRefs: IntratreeRefs;
  readonly intertreeRefs: IntertreeRefs;
  readonly attrs: {[synoAttr: string]: SynoAttrVal};

  constructor(
    id: string,
    tree: MutableSyntaxTree,
  ) {
    this.id = id;
    this.tree = tree;
    if (!tree.hasSyno(id)) {
      throw new Error(`Syno constructor found no syno data in tree for ID '${id}'`);
    }
    this.raw = tree.raw.synoMap[id];
    this.readable = new Syno(id, tree.readable);
    this.type = this.raw.type;
    this.rootwardEdgeLabel = this.raw.rootwardEdgeLabel;
    this.parentId = this.raw.parentId;
    this.childIds = this.raw.childIds;
    this.intratreeRefs = this.raw.intratreeRefs; // unique vs inter
    this.intertreeRefs = this.raw.intertreeRefs; // unique vs intra
    this.attrs = this.raw.attrs;
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

  // forwards

  is(syno: MutableSyno): boolean { return this.readable.is(syno as unknown as Syno); }

  isRoot(): boolean { return this.readable.isRoot(); }

  parent(): MutableSyno {
    return new MutableSyno(this.parentId, this.tree);
  }

  index(): number { return this.readable.index(); }

  children(filter?: { label?: string, type?: string }): MutableSyno[] {
    return this.readable.children(filter).map(c => new MutableSyno(c.id, this.tree));
  }

  hasChildAt(index: number): boolean { return this.readable.hasChildAt(index); }

  childAt(index: number): MutableSyno {
    return new MutableSyno(this.childIds[index], this.tree);
  }

  hasRef(refName: string): (false | 'intratree' | 'intertree') { return this.readable.hasRef(refName); }

  followIntratreeRef(refLabel: string): (MutableSyno | null) {
    const result = this.readable.followIntratreeRef(refLabel);
    return new MutableSyno(result.id, this.tree);
  }

  followIntertreeRef(refLabel: string): (MutableSyno | null) {
    const result = this.readable.followIntratreeRef(refLabel);
    const tree = new MutableSyntaxTree(result.tree.id, result.tree.treeList);
    return new MutableSyno(result.id, tree);
  }

  followRef(refLabel: string): (MutableSyno | null) {
    if (refLabel in this.intratreeRefs) {
      return this.followIntratreeRef(refLabel);
    }

    if (refLabel in this.intertreeRefs) {
      return this.followIntertreeRef(refLabel);
    }

    throw new Error();
  }
}
