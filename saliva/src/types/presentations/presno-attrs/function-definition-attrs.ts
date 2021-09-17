import type { PresnoRef } from 'saliva-repl/dist/types/presenter/presno-ref';

export type FunctionDefPresAttrs = {
  readonly syntype: 'functionDefinition';
  readonly name: (null | PresnoRef);
  readonly parameters: PresnoRef[];
  readonly body: (null | PresnoRef);
};
