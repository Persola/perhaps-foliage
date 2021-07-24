import type { SynoId } from '../syntactic/syno-id';

export type PresnoRef = {
  readonly presnoRef: boolean; // always true! but TS won't accept the true literal without this
  readonly id: SynoId;
};
