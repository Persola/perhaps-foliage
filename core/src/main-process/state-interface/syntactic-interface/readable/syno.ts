import SyntaxTree from './syntax-tree';

import type { IntertreeRefs, IntratreeRefs, RawSyno } from '../../../../types/syntactic/raw/raw-syno';
import type { SynoAttrVal } from '../../../../types/syntactic/syno-attr-val';

export default class Syno {
  /*
    Syno instances can only be used from when they are instantiated until
    the next state update because they reference a specific version of the state

    But wait even then they're not really up to date if you modify things in multiple steps...
  */
  readonly id: string;
  readonly tree: SyntaxTree;
  readonly raw: RawSyno;
  readonly type: string;
  readonly rootwardEdgeLabel: string;
  readonly parentId: string | null;
  readonly childIds: string[];
  readonly intratreeRefs: IntratreeRefs;
  readonly intertreeRefs: IntertreeRefs;
  readonly attrs: {[synoAttr: string]: SynoAttrVal};

  constructor(
    id: string,
    tree: SyntaxTree,
  ) {
    this.id = id;
    this.tree = tree;
    if (!tree.hasSyno(id)) {
      throw new Error(`Syno constructor found no syno data in tree for ID '${id}'`);
    }
    this.raw = tree.raw.synoMap[id];
    this.type = this.raw.type;
    this.rootwardEdgeLabel = this.raw.rootwardEdgeLabel;
    this.parentId = this.raw.parentId;
    this.childIds = this.raw.childIds;
    this.intratreeRefs = this.raw.intratreeRefs; // unique vs inter
    this.intertreeRefs = this.raw.intertreeRefs; // unique vs intra
    this.attrs = this.raw.attrs;
  }

  is(syno: Syno): boolean {
    return (
      this.tree.raw === syno.tree.raw
      && this.id === syno.id
    );
  }

  isRoot(): boolean {
    return this.id === this.tree.rootId();
  }

  parent(): Syno {
    if (this.parentId === null) {
      return null;
    }

    return this.tree.getSyno(this.parentId) as this;
  }

  index(): number {
    return this.parent().childIds.indexOf(this.id);
  }

  children(filter?: { label?: string, type?: string }): Syno[] {
    return this.childIds.map(
      id => this.tree.getSyno(id),
    ).filter(
      child => (
        (!filter?.label || filter.label === child.rootwardEdgeLabel)
        && (!filter?.type || filter.type === child.type)
      ),
    ) as this[];
  }

  hasChildAt(index: number): boolean {
    return index < this.childIds.length;
  }

  childAt(index: number): Syno {
    if (this.hasChildAt(index)) {
      return this.tree.getSyno(this.childIds[index]) as this;
    }

    throw new Error(
      `Syno ('${this.id}') has ${this.childIds.length} children`
      + ` but was asked for child at (0-based) index ${index}`,
    );
  }

  hasRef(refName: string): (false | 'intratree' | 'intertree') {
    if (Object.keys(this.intratreeRefs).includes(refName)) {
      return 'intratree';
    }

    if (Object.keys(this.intertreeRefs).includes(refName)) {
      return 'intertree';
    }

    return false;
  }

  followIntratreeRef(refLabel: string): Syno | null {
    if (!(refLabel in this.intratreeRefs)) {
      throw new Error(`Syno (ID ${this.id}) has no intratree reference labeled '${refLabel}'`);
    }

    if (this.intratreeRefs[refLabel] === null) {
      return null;
    }

    return this.tree.getSyno(this.intratreeRefs[refLabel]) as this;
  }

  followIntertreeRef(refLabel: string): Syno | null {
    if (!(refLabel in this.intertreeRefs)) {
      throw new Error(`Syno (ID ${this.id}) has no intertree reference labeled '${refLabel}'`);
    }

    const synoUri = this.intertreeRefs[refLabel];
    if (synoUri === null) {
      return null;
    }
    const treeId = synoUri.treeHost.join('.');
    const refTree = new SyntaxTree(treeId, this.tree.treeList);
    return refTree.getSynoByPath(synoUri.path);
  }

  followRef(refLabel: string): Syno | null {
    if (refLabel in this.intratreeRefs) {
      return this.followIntratreeRef(refLabel);
    }

    if (refLabel in this.intertreeRefs) {
      return this.followIntertreeRef(refLabel);
    }

    throw new Error(`Syno (ID ${this.id}) has no reference labeled '${refLabel}'`);
  }
}
