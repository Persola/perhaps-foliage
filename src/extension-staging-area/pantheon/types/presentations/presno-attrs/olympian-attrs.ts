import type { PresnoRef } from '../../../../../types/presenter/presno-ref';

export type OlympianPresAttrs = {
  readonly syntype: 'olympian';
  readonly name: string;
  readonly child: PresnoRef | null;
  readonly focused: boolean;
  readonly presnoFocused: number | null;
  readonly charFocused: number | null;
  readonly valid: boolean;
};
