import type { RawSyntaxTree } from '../syntactic/newnew/raw/raw-syntax-tree';

export type EndAsyncSyntreeLoad = {
  readonly type: 'END_SYNTREE_LOAD';
  readonly newIngestedTree: RawSyntaxTree | null; // null on failure
};
