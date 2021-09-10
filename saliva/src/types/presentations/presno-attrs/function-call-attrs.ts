import type { PresnoRef } from 'saliva-repl/dist/types/presenter/presno-ref';

export type FunctionCallPresAttrs = {
  readonly syntype: 'functionCall';
  readonly name: string | null;
  readonly argumentz: PresnoRef[];
  readonly callee: PresnoRef | null;
  readonly resolved: boolean;
};
