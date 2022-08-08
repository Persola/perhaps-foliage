import type { PresnoRef } from '../presno-ref';
import type { PresnoAttrVal } from './presno-attr-val';
import type { Bud } from './non-syn-presnos/bud';
import type { NamePart } from './non-syn-presnos/name-part';

export type SynPresno = Readonly<{
  id: string;
  parent: (null | PresnoRef);
  prestype: string;
  [index: string]: PresnoAttrVal;
}>;

export type NonSynPresno = (
  | Bud
  | NamePart
);

export type Presno = (SynPresno | NonSynPresno); // n.b.: presno attributes are ordered
