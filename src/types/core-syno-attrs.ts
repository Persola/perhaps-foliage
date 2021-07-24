import type { SynoId } from './syno-id';
import type { SynoRef } from './syno-ref';

export type CoreSynoAttrs = {
  readonly id: SynoId;
  readonly parent: SynoRef | null | undefined;
};
