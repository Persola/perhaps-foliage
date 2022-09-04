import type { NamePartArgs } from './name-part-args';
import type { GapArgs } from './gap-args';
import type { BudArgs } from './bud-args';

export type UnindexedNonSynPresnoArgs = {
  type: 'nonSynPresno',
  parentId: number,
  nonSynoArgs: (
    | NamePartArgs
    | GapArgs
    | BudArgs
  ),
};
