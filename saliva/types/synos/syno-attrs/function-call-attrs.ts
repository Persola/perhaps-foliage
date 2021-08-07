import type { SynoRef } from 'saliva-repl/dist/types/syntactic/syno-ref';

export type FunctionCallAttrs = {
  syntype: 'functionCall';
  callee: SynoRef | null;
  argumentz: SynoRef[];
};
