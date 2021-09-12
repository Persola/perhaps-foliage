import type { PresnoRef } from 'saliva-repl/dist/types/presenter/presno-ref';

export type TitanPresAttrs = {
  readonly syntype: 'titan';
  readonly name: string;
  readonly child: PresnoRef | null;
};
