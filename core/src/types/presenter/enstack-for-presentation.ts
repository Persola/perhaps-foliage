import type { SynoRef } from '../syntactic/syno-ref';
import type { Syno } from '../syntactic/syno';
import type { NonSynPresnoArgs } from './presno-args/non-syn-presno-args';
import type { PresnoRef } from './presno-ref';

export type EnstackForPresentation = (
  synoOrArgs: (SynoRef | NonSynPresnoArgs['nonSynoArgs']),
  parentOrUndefined?: Syno,
) => PresnoRef;
