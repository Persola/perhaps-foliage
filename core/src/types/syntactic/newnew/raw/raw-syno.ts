import type { SynoAttrVal } from '../syno-attr-val';
import type { AbsoluteSynoUri } from '../syno-uri';

export type IntratreeRefs = {[edgeLabel: string]: null | number};

export type IntertreeRefs = {[edgeLabel: string]: null | AbsoluteSynoUri};

export type RawSyno = {
  id: number;
  // should be include a ref to the raw tree?
  type: string;
  attrs: {[syntypeSpecificSynoAttr: string]: SynoAttrVal};
  rootwardEdgeLabel: string; // 'labelOfEdgeToParent'? 'toParentEdgeLabel'? 'parentwardEdgeLabel'?
  parentId: number; // sync with childIds
  childIds: number[]; // sync with childIds
  intratreeRefs: IntratreeRefs;
  intertreeRefs: IntertreeRefs;
}
