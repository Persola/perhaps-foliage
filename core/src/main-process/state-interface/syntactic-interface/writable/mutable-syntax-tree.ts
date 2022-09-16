import SyntaxTree from '../readable/syntax-tree';
import MutableSyno from './mutable-syno';

import type { MutableTreeList } from '../../../../types/syntactic/mutables/mutable-tree-list';
import type { RawSyntaxTree } from '../../../../types/syntactic/raw/raw-syntax-tree';
import type { RawSyno } from '../../../../types/syntactic/raw/raw-syno';
import type { InverseEdgeMapEntry } from '../../../../types/syntactic/raw/inverse-edge-map';
import type { SerializedSyno } from '../../../../types/syntactic/serialized-syno';
import { AbsoluteSynoUri } from '../../../../types/syntactic/syno-uri';

export default class MutableSyntaxTree {
  /*
    The raw property and treeList constructor arg are immer'd proxies.

    MutableSyntaxTree instances can only be used from when they are instantiated until
    the next state update because they reference a specific version of the state
  */
  readonly id: string;
  readonly treeList: MutableTreeList;
  readonly raw: RawSyntaxTree; // see above
  readonly readable: SyntaxTree;
  readonly dependencyTrees: { [treeHost: string]: RawSyntaxTree };

  constructor(
    id: string,
    treeList: MutableTreeList,
  ) {
    this.id = id;
    this.treeList = treeList;
    this.raw = treeList[id];
    this.readable = new SyntaxTree(id, treeList);
    this.dependencyTrees = {};
    for (const uri of this.raw.dependencies) {
      const strTreeHost = uri.treeHost.join('.');
      if (treeList[strTreeHost] === undefined) {
        throw new Error(`Cannot link unloaded dependency tree '${strTreeHost}'`);
      }
      this.dependencyTrees[strTreeHost] = treeList[strTreeHost];
    }
  }

  nextId(): string {
    this.raw.lastId += 1;
    return String(this.raw.lastId);
  }

  addSyno(
    parentId: string,
    insertIndex: number,
    edgeLabel: string,
    syno: SerializedSyno,
  ): string {
    // update inverse refs based on extratree refs
    // update dependency trees
    // update rootid
    // validate raw syno?
    const newId = this.nextId();
    const parent = this.getSyno(parentId);
    parent.raw.childIds.splice(insertIndex, 0, newId);
    this.raw.synoMap[newId] = {
      attrs: {},
      ...syno,
      id: newId,
      parentId,
      rootwardEdgeLabel: edgeLabel,
      childIds: [],
      intratreeRefs: {},
      intertreeRefs: {},
    };

    return newId;
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
      rawReferer.intratreeRefs[key] = null;
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

  // forwards

  rootId(): string { return this.readable.rootId(); }

  dependencies(): AbsoluteSynoUri[] { return this.readable.dependencies(); }

  is(tree: SyntaxTree): boolean { return this.readable.is(tree); }

  hasSyno(synoId: string): boolean { return this.readable.hasSyno(synoId); }

  getSyno(synoId: string): MutableSyno {
    return new MutableSyno(synoId, this); // NOT FORWARDED
  }

  getSynoByPath(synoPath: number[]): MutableSyno {
    const readable = this.readable.getSynoByPath(synoPath);
    return new MutableSyno(readable.id, this); // NOT FORWARDED
  }

  root(): MutableSyno {
    return new MutableSyno(this.rootId(), this); // NOT FORWARDED
  }
}
