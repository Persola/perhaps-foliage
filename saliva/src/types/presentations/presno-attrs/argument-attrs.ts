import type { PresnoRef } from 'saliva-repl/dist/types/presenter/presno-ref';

export type ArgumentPresAttrs = {
  readonly syntype: 'argument';
  readonly name: string | null;
  readonly value: PresnoRef | null;
};
