import type { SynoRef } from '../../../../../types/syntactic/syno-ref';

export type FunctionCallAttrs = {
  syntype: 'functionCall';
  callee: SynoRef | null;
  argumentz: SynoRef[];
};
