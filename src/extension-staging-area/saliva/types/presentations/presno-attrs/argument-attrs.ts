import type { PresnoRef } from '../../../../../types/presenter/presno-ref';

export type ArgumentPresAttrs = {
  readonly syntype: 'argument';
  readonly focused: boolean;
  readonly presnoFocused: number | null;
  readonly charFocused: number | null;
  readonly valid: boolean;
  readonly name: string | null;
  readonly value: PresnoRef | null;
};
