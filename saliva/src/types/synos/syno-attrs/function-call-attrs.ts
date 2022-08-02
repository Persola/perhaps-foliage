import type { SynoRef } from 'perhaps-foliage/dist/types/syntactic/syno-ref';

export type FunctionCallAttrs = {
  syntype: 'functionCall';
  callee: SynoRef | null;
  argumentz: SynoRef[];
};
