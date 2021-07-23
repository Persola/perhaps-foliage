import type { SynoId } from "../syno-id";
export type DestroyFocusedSyno = {
  readonly type: "DESTROY_FOCUSED_SYNO";
  readonly focusedPresnoId: SynoId;
};