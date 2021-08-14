import type { SynoRef } from 'saliva-repl/dist/types/syntactic/syno-ref';

export type VariableRefAttrs = {
  syntype: 'variableRef';
  valueSyntype: 'booleanLiteral';
  referent: SynoRef | null;
};
