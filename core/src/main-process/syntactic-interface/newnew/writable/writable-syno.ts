import WritableSyntaxTree from './writable-syntax-tree';

import subtreeSynoIds from '../utils/subtree-syno-ids';

import type { RawSyno } from '../../../../types/syntactic/newnew/raw/raw-syno';
import Syno from '../readable/syno';

export default class WritableSyno {
// this isn't written to work across state updates--reinstantiate instead
  protected id: string;
  protected tree: WritableSyntaxTree;
  protected raw: RawSyno;
  protected readable: Syno;

  constructor(
    tree: WritableSyntaxTree,
    id: string,
  ) {
    this.tree = tree;
    this.id = id;
    if (!tree.readable.hasSyno(id)) {
      throw new Error(`Syno constructor found no syno data in tree for ID '${id}'`);
    }
    this.raw = tree.raw.synoMap[id];
    this.readable = new Syno(this.tree.readable, id);
  }

  destroy(): void {
    for (const descendantId of subtreeSynoIds(this.id, this.tree.raw)) {
      delete this.tree.raw.synoMap[descendantId];
    }

    this.readable.parent().raw.childIds.splice(this.readable.index(), 1);
  }
}
