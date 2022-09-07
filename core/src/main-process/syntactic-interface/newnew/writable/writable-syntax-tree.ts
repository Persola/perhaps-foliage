import type { RawSyntaxTree } from '../../../../types/syntactic/newnew/raw/raw-syntax-tree';
import SyntaxTree from '../readable/syntax-tree';

export default class WritableSyntaxTree {
// this isn't written to work across state updates--reinstantiate instead
  readonly raw: RawSyntaxTree;
  readonly readable: SyntaxTree;
  readonly id: string;

  constructor(
    raw: RawSyntaxTree, // must come from MutableState
    id: string,
  ) {
    this.raw = raw;
    this.id = id;
    this.readable = new SyntaxTree(raw, id);
  }

  is(tree: WritableSyntaxTree): boolean {
    return this.raw === tree.raw;
  }
}
