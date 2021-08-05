import type { SynoRef } from '../../../../src/types/syntactic/syno-ref';

export type VariableRefAttrs = {
  syntype: 'variableRef';
  valueSyntype: 'booleanLiteral';
  referent: SynoRef | null;
};
