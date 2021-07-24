import type { SynoRef } from './syntactic/syno-ref';

export type NamePartRef = {
  readonly synoRef: false;
  readonly parent: SynoRef;
  readonly index: number;
};
