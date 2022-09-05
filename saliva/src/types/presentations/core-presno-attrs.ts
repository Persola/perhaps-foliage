import type { PresnoRef } from 'perhaps-foliage/dist/types/presenter/presno-ref';

export type CorePresnoAttrs = {
  readonly preasnoId: string;
  readonly parent: PresnoRef | null;
  readonly focused: boolean;
  readonly presnoFocused: number | null;
  readonly charFocused: number | null;
  readonly valid: boolean;
};
