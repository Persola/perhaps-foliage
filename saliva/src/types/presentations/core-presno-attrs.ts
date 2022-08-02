import type { SynoId } from 'perhaps-foliage/dist/types/syntactic/syno-id';
import type { PresnoRef } from 'perhaps-foliage/dist/types/presenter/presno-ref';

export type CorePresnoAttrs = {
  readonly synoId: SynoId;
  readonly parent: PresnoRef | null;
  readonly focused: boolean;
  readonly presnoFocused: number | null;
  readonly charFocused: number | null;
  readonly valid: boolean;
};
