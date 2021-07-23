import type { MutableSynoMap } from "../mutable-syno-map";
export type EndAsyncSyntreeLoad = {
  readonly type: "END_SYNTREE_LOAD";
  readonly newSynoMap: MutableSynoMap;
};