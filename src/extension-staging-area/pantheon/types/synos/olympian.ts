import type { SynoId } from '../../../../types/syntactic/syno-id';
import type { SynoRef } from '../../../../types/syntactic/syno-ref';

export type Olympian = {
  readonly id: SynoId;
  readonly parent: SynoRef;
  readonly child: SynoRef;
  readonly name: string;
};
