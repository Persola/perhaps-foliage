import type { PresnoRef } from '../../../../../types/presenter/presno-ref';

export type FunctionDefPresAttrs = {
  readonly syntype: 'functionDefinition';
  readonly focused: boolean;
  readonly presnoFocused: number | null;
  readonly charFocused: number | null;
  readonly valid: boolean;
  readonly name: string;
  readonly parameters: PresnoRef[];
  readonly body: PresnoRef | null;
};
