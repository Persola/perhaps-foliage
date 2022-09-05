import Syno from './syno';

import type { RawSyntaxTree } from '../../../types/syntactic/newnew/raw/raw-syntax-tree';

export default class SyntaxTree {
// this isn't written to work across state updates--reinstantiate instead
  readonly id: string;
  readonly raw: RawSyntaxTree;
  readonly rootId: number;

  constructor(
    raw: RawSyntaxTree,
    id: string,
  ) {
    this.id = id;
    this.raw = raw;
    this.rootId = raw.rootId;
  }

  hasSyno(synoId: number): boolean {
    return this.raw.synoMap[synoId] !== undefined;
  }

  getSyno(synoId: number): Syno {
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
