import Syno from './syno';

import type { RawSyntaxTree } from '../../../../types/syntactic/newnew/raw/raw-syntax-tree';

export default class SyntaxTree {
// this isn't written to work across state updates--reinstantiate instead
  readonly raw: RawSyntaxTree;
  readonly id: string;
  readonly rootId: string;

  constructor(
    raw: RawSyntaxTree,
    id: string,
  ) {
    this.id = id;
    this.raw = raw;
    this.rootId = raw.rootId;
  }

  is(tree: SyntaxTree): boolean {
    return this.id === tree.id;
  }

  hasSyno(synoId: string): boolean {
    return this.raw.synoMap[synoId] !== undefined;
  }

  getSyno(synoId: string): Syno {
    // cache them?
    if (this.raw.synoMap[synoId] === undefined) {
      throw new Error(`Syno of ID '${synoId}' not found in tree '${this.id}'`);
    }
    return new Syno(this, synoId);
  }

  root(): Syno {
    return this.getSyno(this.rootId);
  }
}
