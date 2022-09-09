import type { RawSyntaxTree } from '../../../../types/syntactic/newnew/raw/raw-syntax-tree';
import type { TreeList } from '../../../../types/syntactic/newnew/tree-list';
import AbstractSyno from './abstract-syno';

export default class AbstractSyntaxTree<
  // this types uses recursively-bounded (F-bounded) quantification
  SynoType extends AbstractSyno<
    AbstractSyntaxTree<SynoType>
  >
> {
  /*
    AbstractSyntaxTree instances can only be used from when they are instantiated until
    the next state update because they reference a specific version of the state
  */
  readonly id: string;
  readonly treeList: TreeList;
  readonly raw: RawSyntaxTree;
  readonly rootId: string;
  SynoClass;

  constructor(
    id: string,
    treeList: TreeList,
  ) {
    this.id = id;
    this.treeList = treeList;
    this.raw = treeList[id];
    this.rootId = this.raw.rootId;
  }

  is(tree: AbstractSyntaxTree<SynoType>): boolean {
    return this.id === tree.id;
  }

  hasSyno(synoId: string): boolean {
    return this.raw.synoMap[synoId] !== undefined;
  }

  getSyno(synoId: string): SynoType {
    // cache them?
    if (this.raw.synoMap[synoId] === undefined) {
      throw new Error(`Syno of ID '${synoId}' not found in tree '${this.id}'`);
    }

    return new this.SynoClass(synoId, this);
  }

  root(): SynoType {
    return this.getSyno(this.rootId);
  }
}
