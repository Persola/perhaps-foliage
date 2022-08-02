import type { PresnoRef } from 'perhaps-foliage/dist/types/presenter/presno-ref';

export type VariableRefPresAttrs = {
  readonly syntype: 'variableRef';
  readonly valueSyntype: 'booleanLiteral';
  readonly name: (null | PresnoRef);
};
