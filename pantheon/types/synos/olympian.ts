import type { SynoId } from 'saliva-repl/dist/types/syntactic/syno-id';
import type { SynoRef } from 'saliva-repl/dist/types/syntactic/syno-ref';

export type Olympian = {
  readonly id: SynoId;
  readonly parent: SynoRef;
  readonly child: SynoRef;
  readonly name: string;
};
