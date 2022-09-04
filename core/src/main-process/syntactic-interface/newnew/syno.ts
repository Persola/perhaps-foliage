import SyntaxTree from './syntax-tree';

import type { RawSyno } from '../../../types/syntactic/newnew/raw/raw-syno';
import type { AbsoluteSynoUri } from '../../../types/syntactic/newnew/syno-uri';
import type { SynoAttrVal } from '../../../types/syntactic/newnew/syno-attr-val';

export default class Syno {
// this isn't written to work across state updates--reinstantiate instead
  readonly id: number;
  readonly tree: SyntaxTree;
  readonly raw: RawSyno;
  readonly type: string;
  readonly rootwardEdgeLabel: string;
  readonly parentId: number | null;
  readonly childIds: number[];
  readonly intratreeRefs: {[edgeLabel: string]: number};
  readonly intertreeRefs: {[edgeLabel: string]: AbsoluteSynoUri};
  readonly attrs: {[synoAttr: string]: SynoAttrVal};

  constructor(
    tree: SyntaxTree,
    id: number,
  ) {
    this.tree = tree;
    this.id = id;
    if (tree.raw[id] === undefined) {
      throw new Error(`Syno constructor found no syno data in tree for ID '${id}'`);
    }
    this.raw = tree.raw[id];
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

  hasRef(refName: string): (false | 'intratree' | 'intertree') {
    if (Object.keys(this.intratreeRefs).includes(refName)) {
      return 'intratree';
    }

    if (Object.keys(this.intertreeRefs).includes(refName)) {
      return 'intertree';
    }

    return false;
  }

  parent(): Syno {
    // TODO: cache?
    return new Syno(this.tree, this.parentId);
  }

  children(filter?: { label: string, type: string }): Syno[] {
    // TODO: cache?
    return this.childIds.map(
      id => this.tree.getSyno(id),
    ).filter(
      child => (
        !filter
        || (
          (!filter.label || filter.label === child.rootwardEdgeLabel)
          && (!filter.type || filter.type === child.type)
        )
      ),
    );
  }

  childAt(index: number): Syno {
    return new Syno(this.tree, this.childIds[index]);
  }

  index(): number {
    return this.parent().childIds.indexOf(this.id);
  }
}
