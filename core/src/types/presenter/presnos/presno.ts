import type { PresnoRef } from '../presno-ref';
import type { PresnoAttrVal } from './presno-attrs';
import type { Bud } from './non-syn-presnos/bud';
import type { NamePart } from './non-syn-presnos/name-part';

export type LabledChildPresno = Readonly<{
  edgeLabel: string;
  childRef: PresnoRef;
}>;

// export type SynPresnoChildren = Readonly<{
//   children: LabledChildPresno[];
// }>;

export type SynPresno = Readonly<{
  id: string;
  prestype: string;
  parent: (null | PresnoRef);
  children: LabledChildPresno[];
  [prestypeSpecificPresnoAttr: string]: (PresnoAttrVal | LabledChildPresno[]);
}>;

export type NonSynPresno = (
  | Bud
  | NamePart
);

export type Presno = (SynPresno | NonSynPresno); // n.b.: presno attributes are ordered
