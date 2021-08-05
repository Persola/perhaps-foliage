import type { SynoId } from '../../../src/types/syntactic/syno-id';
import type { PresnoRef } from '../../../src/types/presenter/presno-ref';

export type CorePresnoAttrs = {
  readonly synoId: SynoId;
  readonly parent: PresnoRef;
};
