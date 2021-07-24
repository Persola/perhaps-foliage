import type { SynoId } from '../../../../types/syntactic/syno-id';
import type { PresnoRef } from '../../../../types/presenter/presno-ref';

export type CorePresnoAttrs = {
  readonly synoId: SynoId;
  readonly parent: PresnoRef | null;
};
