import type { ExtraTreeRefs } from '../../syntactic/newnew/serialized-syno';
import type { SynoAttrVal } from '../../syntactic/newnew/syno-attr-val';

export type RawSynoWithStructuralRefs = {
  id: string;
  pathFromRoot: number[];
  // should be include a ref to the raw tree?
  type: string;
  attrs: {[syntypeSpecificSynoAttr: string]: SynoAttrVal};
  rootwardEdgeLabel: string; // 'labelOfEdgeToParent'? 'toParentEdgeLabel'? 'parentwardEdgeLabel'?
  parentId: string; // sync with childIds
  childIds: string[]; // sync with childIds
  extratreeRefs: ExtraTreeRefs;
}
