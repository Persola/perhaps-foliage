import type { PresnoRef } from 'saliva-repl/dist/types/presenter/presno-ref';

export type VariableRefPresAttrs = {
  readonly syntype: 'variableRef';
  readonly valueSyntype: 'booleanLiteral';
  readonly name: (null | PresnoRef);
};
