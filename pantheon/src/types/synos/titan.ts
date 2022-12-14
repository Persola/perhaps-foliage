import type { SynoId } from 'perhaps-foliage/dist/types/syntactic/syno-id';
import type { SynoRef } from 'perhaps-foliage/dist/types/syntactic/syno-ref';

export type Titan = {
  readonly id: SynoId;
  readonly syntype: 'titan';
  readonly parent: null;
  readonly child: SynoRef;
  readonly name: string;
};
