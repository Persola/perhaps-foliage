import type { SynoId } from 'saliva-repl/dist/types/syntactic/syno-id';
import type { PresnoRef } from 'saliva-repl/dist/types/presenter/presno-ref';

export type CorePresnoAttrs = {
  readonly synoId: SynoId;
  readonly parent: PresnoRef;
};
