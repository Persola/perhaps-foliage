import type { MutableSynoMap } from '../syntactic/mutables/mutable-syno-map';

export type EndAsyncSyntreeLoad = {
  readonly type: 'END_SYNTREE_LOAD';
  readonly newSynoMap: (MutableSynoMap | null); // null on failure
};
