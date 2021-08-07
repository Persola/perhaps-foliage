import type { PresnoRef } from 'saliva-repl/dist/types/presenter/presno-ref';

export type TitanPresAttrs = {
  readonly syntype: 'titan';
  readonly name: string;
  readonly child: PresnoRef | null;
  readonly focused: boolean;
  readonly presnoFocused: number | null;
  readonly charFocused: number | null;
  readonly valid: boolean;
};
