import type { SynoId } from "../../../../types/syno-id";
import type { SynoRef } from "../../../../types/syno-ref";
export type Titan = {
  readonly id: SynoId;
  readonly parent: null;
  readonly child: SynoRef;
  readonly name: string;
};