import type { PresnoRef } from 'saliva-repl/dist/types/presenter/presno-ref';

export type OlympianPresAttrs = {
  readonly syntype: 'olympian';
  readonly name: (null | PresnoRef);
  readonly child: (null | PresnoRef);
};
