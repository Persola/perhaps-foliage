import type { Syno } from "../syno";
export type EndInterpretation = {
  readonly type: "END_INTERPRETATION";
  readonly result: Syno;
};