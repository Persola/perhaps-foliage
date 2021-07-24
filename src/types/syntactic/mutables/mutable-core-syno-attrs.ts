import type { SynoId } from '../syno-id';
import type { SynoRef } from '../syno-ref';

export type MutableCoreSynoAttrs = {
  id: SynoId;
  parent: SynoRef | null;
};
