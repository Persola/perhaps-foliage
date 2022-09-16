import Syno from './syno';

import type { RawSyntaxTree } from '../../../../types/syntactic/raw/raw-syntax-tree';
import type { AbsoluteSynoUri } from '../../../../types/syntactic/syno-uri';
import type { TreeList } from '../../../../types/syntactic/tree-list';

export default class SyntaxTree {
  /*
    SyntaxTree instances can only be used from when they are instantiated until
    the next state update because they reference a specific version of the state
  */
  readonly id: string;
  readonly treeList: TreeList;
  readonly raw: RawSyntaxTree;
  readonly lastId: number;
  readonly dependencyTrees: { [treeHost: string]: RawSyntaxTree };

  constructor(
    id: string,
    treeList: TreeList,
  ) {
    this.id = id;
    this.treeList = treeList;
    this.raw = treeList[id];
    this.lastId = this.raw.lastId;
    this.dependencyTrees = {};
    for (const uri of this.raw.dependencies) {
      const strTreeHost = uri.treeHost.join('.');
      if (treeList[strTreeHost] === undefined) {
        throw new Error(`Cannot link unloaded dependency tree '${strTreeHost}'`);
      }
      this.dependencyTrees[strTreeHost] = treeList[strTreeHost];
    }
  }

  rootId(): string { return this.raw.rootId; }

  dependencies(): AbsoluteSynoUri[] { return this.raw.dependencies; }

  is(tree: SyntaxTree): boolean {
    return this.id === tree.id;
  }

  hasSyno(synoId: string): boolean {
    return this.raw.synoMap[synoId] !== undefined;
  }

  getSyno(synoId: string): Syno {
    // cache them?
    if (this.raw.synoMap[synoId] === undefined) {
      throw new Error(`Syno of ID '${synoId}' not found in tree '${this.id}'`);
    }

    return new Syno(synoId, this);
  }

  getSynoByPath(synoPath: number[]): Syno {
    let currentSyno = this.root();
    for (const step of synoPath) {
      if (!currentSyno.hasChildAt(step)) {
        throw new TypeError(`Tree ('${this.id}') has no syno at '${synoPath.join('/')}'`);
      }
      currentSyno = currentSyno.childAt(step);
    }

    return currentSyno;
  }

  root(): Syno {
    return this.getSyno(this.rootId());
  }

  // getDependencyTree(uri: AbsoluteSynoUri): this {
  //   if (uri.path.length !== 0) {
  //     throw new Error('Unimplemented: retrieving subtree of dependency tree');
  //   }

  //   return new this()
  //   // (this.dependencyTrees[uri.treeHost.join('.')]);
  // }
}
