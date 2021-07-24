import type { PresnoRef } from './presno-ref';

export type Presno = Readonly<{
  parent: null | PresnoRef;
  synoId: string;
  syntype: string;
  [index: string]: unknown;
}>;
