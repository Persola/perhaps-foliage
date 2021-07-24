import type { SynoRef } from "../../../../../types/syno-ref";
import type { Syntype } from "../syntype";
export type ArgumentAttrs = {
  syntype: "argument";
  valueSyntype: Syntype | null | undefined;
  value: SynoRef | null | undefined;
  parameter: SynoRef | null | undefined;
};
