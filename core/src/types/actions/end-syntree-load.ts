import type { IngestedTree } from '../code-loader/ingested-tree';

export type EndAsyncSyntreeLoad = {
  readonly type: 'END_SYNTREE_LOAD';
  readonly newIngestedTree: IngestedTree | null; // null on failure
};
