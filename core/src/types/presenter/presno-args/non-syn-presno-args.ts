import type { SynoId } from '../../syntactic/syno-id';

export interface NonSynPresnoArgs<SyntypeArgs> {
  type: 'nonSynPresno',
  parentId: SynoId,
  presnoIndex: number,
  nonSynoArgs: SyntypeArgs,
}
