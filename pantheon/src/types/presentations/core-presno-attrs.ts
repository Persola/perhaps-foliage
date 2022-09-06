import type { PresnoRef } from 'perhaps-foliage/dist/types/presenter/presno-ref';

export type CorePresnoAttrs = {
  readonly synoId: string;
  readonly parent: PresnoRef;
  readonly focused: boolean;
  readonly presnoFocused: number | null;
  readonly charFocused: number | null;
  readonly valid: boolean;
};
