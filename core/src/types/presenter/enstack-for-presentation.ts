import type { PresnoRef } from './presno-ref';
import { PresnoArgs } from './presno-args/presno-args';

export type EnstackForPresentation = (
  presnoIndex: number,
  presnoArgs: PresnoArgs
) => PresnoRef;
