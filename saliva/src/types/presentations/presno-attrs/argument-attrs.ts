import type { PresnoRef } from 'saliva-repl/dist/types/presenter/presno-ref';

export type ArgumentPresAttrs = {
  readonly syntype: 'argument';
  readonly name: (null | PresnoRef);
  readonly value: (null | PresnoRef);
};
