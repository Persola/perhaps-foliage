import type { PresnoRef } from '../presno-ref';
import type { PresnoAttrVal } from './presno-attrs';
import type { Gap } from './non-syn-presnos/gap';
import type { Bud } from './non-syn-presnos/bud';
import type { NamePart } from './non-syn-presnos/name-part';

export type LabledChildPresno = Readonly<{
  edgeLabel: string;
  childRef: PresnoRef;
}>;

export type SynPresno = Readonly<{
  id: string;
  prestype: string;
  children: LabledChildPresno[];
  // prestypeSpecificPresnoAttr shouldn't include LabledChildPresno[] but how to type?
  [prestypeSpecificPresnoAttr: string]: (PresnoAttrVal | LabledChildPresno[]);
}>;

export type NonSynPresno = (
  | NamePart
  | Gap
  | Bud
);

export type Presno = (SynPresno | NonSynPresno); // n.b.: presno attributes are ordered
