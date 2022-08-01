import type { SynoRef } from '../syntactic/syno-ref';
import type { Syno } from '../syntactic/syno';
import type { NonSynPresnoArgs } from './non-syn-presno-args';
import type { PresnoRef } from './presno-ref';

export type PresentAndReturnRef = (
  synoOrArgs: (SynoRef | NonSynPresnoArgs['presnoArgs']),
  parentOrUndefined?: Syno,
) => PresnoRef;
