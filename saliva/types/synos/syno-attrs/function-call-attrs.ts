import type { SynoRef } from '../../../../src/types/syntactic/syno-ref';

export type FunctionCallAttrs = {
  syntype: 'functionCall';
  callee: SynoRef | null;
  argumentz: SynoRef[];
};
