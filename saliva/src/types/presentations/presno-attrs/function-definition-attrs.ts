import type { PresnoRef } from 'saliva-repl/dist/types/presenter/presno-ref';

export type FunctionDefPresAttrs = {
  readonly syntype: 'functionDefinition';
  readonly name: string;
  readonly parameters: PresnoRef[];
  readonly body: PresnoRef | null;
};
