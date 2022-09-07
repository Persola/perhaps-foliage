import type { SynoAttrVal } from '../syno-attr-val';
import type { AbsoluteSynoUri } from '../syno-uri';

export type IntratreeRefs = {[edgeLabel: string]: null | string};

export type IntertreeRefs = {[edgeLabel: string]: null | AbsoluteSynoUri};

export type RawSyno = {
  id: string;
  // should include a ref to its raw tree?
  type: string;
  attrs: {[syntypeSpecificSynoAttr: string]: SynoAttrVal};
  rootwardEdgeLabel: string; // 'labelOfEdgeToParent'? 'toParentEdgeLabel'? 'parentEdgeLabel'?
  parentId: string; // sync with childIds
  childIds: string[]; // sync with childIds
  intratreeRefs: IntratreeRefs;
  intertreeRefs: IntertreeRefs;
}
