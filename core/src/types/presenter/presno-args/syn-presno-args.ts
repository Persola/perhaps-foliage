import type { SynoId } from '../../syntactic/syno-id';

export type SynPresnoArgs = {
  type: 'synPresno',
  synoId: SynoId, // implicit graph OK?
};
