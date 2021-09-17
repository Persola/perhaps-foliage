import type { SynoId } from '../syntactic/syno-id';

export type NonSynPresnoArgs = {
  type: 'nonSynPresno',
  parentId: SynoId,
  presnoArgs: {
    // reserved: 'synoRef'
    presnoIndex: number,
    valid: boolean,
    prestype: 'NamePart',
    text: string,
  },
};
