import type { SynoId } from '../../syntactic/syno-id';
import type { NamePartArgs } from './name-part-args';
import type { GapArgs } from './gap-args';

export type UnindexedNonSynPresnoArgs = {
  type: 'nonSynPresno',
  parentId: SynoId,
  nonSynoArgs: (
    | NamePartArgs
    | GapArgs
  ),
};
