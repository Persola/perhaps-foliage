import type { PresnoRef } from './presno-ref';

export type SynPresno = Readonly<{
  id: string;
  parent: (null | PresnoRef);
  prestype: string;
  [index: string]: unknown;
}>;

export type NonSynPresno = Readonly<{
  id: string;
  parent: PresnoRef;
  prestype: 'NamePart';
  [index: string]: unknown;
}>;

export type Presno = (SynPresno | NonSynPresno); // n.b.: presno attributes are ordered
