import type { SynoId } from 'saliva-repl/dist/types/syntactic/syno-id';
import type { SynoRef } from 'saliva-repl/dist/types/syntactic/syno-ref';

export type Titan = {
  readonly id: SynoId;
  readonly parent: null;
  readonly child: SynoRef;
  readonly name: string;
};
