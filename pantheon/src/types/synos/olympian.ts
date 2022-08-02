import type { SynoId } from 'perhaps-foliage/dist/types/syntactic/syno-id';
import type { SynoRef } from 'perhaps-foliage/dist/types/syntactic/syno-ref';

export type Olympian = {
  readonly id: SynoId;
  readonly syntype: 'olympian';
  readonly parent: SynoRef;
  readonly child: SynoRef;
  readonly name: string;
};
