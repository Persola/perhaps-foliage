import findRoot from './find-root';
import Syno from './syno';

import type { RawSyntaxTree } from '../../../types/syntactic/newnew/raw/raw-syntax-tree';
import type { TreeList } from '../../../types/syntactic/newnew/tree-list';
import { InverseEdgeMap } from '../../../types/syntactic/newnew/inverse-edge-map';

export default class SyntaxTree {
// this isn't written to work across state updates--reinstantiate instead
  readonly id: string;
  readonly raw: RawSyntaxTree;
  readonly rootId: number;
  readonly inverseExtraTreeRefs: InverseEdgeMap;

  constructor(
    trees: TreeList,
    id: string,
    rootId?: number,
  ) {
    this.id = id;
    this.raw = trees[id];
    this.rootId = rootId || findRoot(this.raw).id;
  }

  hasSyno(synoId: number): boolean {
    return this.raw[synoId] !== undefined;
  }

  getSyno(synoId: number): Syno {
    if (this.raw[synoId] === undefined) {
      throw new Error(`Syno of ID '${synoId}' not found in tree '${this.id}'`);
    }
    return new Syno(this, synoId);
  }

  root(): Syno {
    return this.getSyno(this.rootId);
  }
}
