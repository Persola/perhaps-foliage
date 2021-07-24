import type { SynoId } from './syno-id';

export type SynoRef = {
  readonly synoRef: true;
  readonly relation: ('parent' | 'child' | 'non-tree');
  readonly id: SynoId;
};
