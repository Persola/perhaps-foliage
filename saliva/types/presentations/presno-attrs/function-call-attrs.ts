import type { PresnoRef } from '../../../../src/types/presenter/presno-ref';

export type FunctionCallPresAttrs = {
  readonly syntype: 'functionCall';
  readonly focused: boolean;
  readonly presnoFocused: number | null;
  readonly charFocused: number | null;
  readonly valid: boolean;
  readonly name: string | null;
  readonly argumentz: PresnoRef[];
  readonly callee: PresnoRef | null;
  readonly resolved: boolean;
};
