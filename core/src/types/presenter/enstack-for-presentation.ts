import type { PresnoRef } from './presno-ref';
import type { UnindexedPresnoArgs } from './presno-args/unindexed-presno-args';

export type EnstackForPresentation = (
  presnoIndex: number,
  presnoArgs: UnindexedPresnoArgs
) => PresnoRef;
