import type { SynoRef } from 'perhaps-foliage/dist/types/syntactic/syno-ref';

export type VariableRefAttrs = {
  syntype: 'variableRef';
  valueSyntype: 'booleanLiteral';
  referent: SynoRef | null;
};
