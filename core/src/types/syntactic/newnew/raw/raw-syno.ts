import type { SynoAttrVal } from '../syno-attr-val';
import type { AbsoluteSynoUri } from '../syno-uri';

export type RawSyno = {
  id: number;
  // should be include a ref to the raw tree?
  type: string;
  rootwardEdgeLabel: string; // 'labelOfEdgeToParent'? 'toParentEdgeLabel'? 'parentwardEdgeLabel'?
  parentId: number; // sync with childIds
  childIds: number[]; // sync with childIds
  intratreeRefs: {[edgeLabel: string]: null | number};
  intertreeRefs: {[edgeLabel: string]: null | AbsoluteSynoUri};
  attrs: {[syntypeSpecificSynoAttr: string]: SynoAttrVal};
}
