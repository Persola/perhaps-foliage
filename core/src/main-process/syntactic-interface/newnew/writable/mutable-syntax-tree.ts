import AbstractSyntaxTree from '../abstract/abstract-syntax-tree';
import MutableSyno from './mutable-syno';

import type { MutableTreeList } from '../../../../types/syntactic/newnew/mutables/mutable-tree-list';
import type { RawSyntaxTree } from '../../../../types/syntactic/newnew/raw/raw-syntax-tree';
import type { RawSyno } from '../../../../types/syntactic/newnew/raw/raw-syno';
import type { InverseEdgeMapEntry } from '../../../../types/syntactic/newnew/raw/inverse-edge-map';

export default class MutableSyntaxTree extends AbstractSyntaxTree<MutableSyno> {
  /*
    The raw property and treeList constructor arg are immer'd proxies.

    MutableSyntaxTree instances can only be used from when they are instantiated until
    the next state update because they reference a specific version of the state
  */
  readonly id: string;
  readonly treeList: MutableTreeList;
  readonly raw: RawSyntaxTree; // see above
  readonly rootId: string;

  constructor(
    id: string,
    treeList: MutableTreeList, // see above
  ) {
    super(id, treeList);
    this.SynoClass = MutableSyno;
  }

  deleteExtratreeRefsTo(synoId: string): void {
    const findKey = (obj, valTest) => {
      for (const key of Object.keys(obj)) {
        if (valTest(obj[key])) {
          return key;
        }
      }

      return null;
    };

    const removeRef = (rawReferer: RawSyno, referentId: string): void => {
      const key = findKey(rawReferer.intratreeRefs, val => val === referentId);

      if (key === null) {
        throw new Error();
      }
      delete rawReferer.intratreeRefs[key];
    };

    const refererIds: InverseEdgeMapEntry = this.raw.inverseExtratreeEdges[synoId];

    if (refererIds !== undefined) {
      for (const refererId of Object.keys(refererIds)) {
        const rawReferer = this.raw.synoMap[refererId];
        removeRef(rawReferer, synoId);
      }
      delete this.raw.inverseExtratreeEdges[synoId];
    }
  }

  deleteExtratreeRefsFrom(synoId: string): void {
    const rawSyno = this.raw.synoMap[synoId];

    for (const [label, referentId] of Object.entries(rawSyno.intratreeRefs)) {
      delete this.raw.inverseExtratreeEdges[referentId][rawSyno.id];
      delete rawSyno.intratreeRefs[label];
    }

    rawSyno.intertreeRefs = {};
  }
}
