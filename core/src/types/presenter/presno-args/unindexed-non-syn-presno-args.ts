import type { SynoId } from '../../syntactic/syno-id';
import type { NamePartArgs } from './name-part-args';
import type { BudArgs } from './bud-args';

export type UnindexedNonSynPresnoArgs = {
  type: 'nonSynPresno',
  parentId: SynoId,
  nonSynoArgs: (
    | NamePartArgs
    | BudArgs
  ),
};
