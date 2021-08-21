import type { SynoId } from './syno-id';

// compare: code-loader/graph-validator/schemas/syno-ref

export type SynoRef = {
  readonly synoRef: true;
  readonly relation: ('parent' | 'child' | 'non-tree');
  readonly id: SynoId;
};
