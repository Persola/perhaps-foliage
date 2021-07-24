import type { SynoId } from '../../../../types/syntactic/syno-id';
import type { SynoRef } from '../../../../types/syntactic/syno-ref';

export type Titan = {
  readonly id: SynoId;
  readonly parent: null;
  readonly child: SynoRef;
  readonly name: string;
};
