import type { PresnoRef } from 'saliva-repl/dist/types/presenter/presno-ref';

export type TitanPresAttrs = {
  readonly syntype: 'titan';
  readonly name: (null | PresnoRef);
  readonly child: (null | PresnoRef);
};
