import type { SynoId } from "../../../../types/syno-id";
import type { SynoRef } from "../../../../types/syno-ref";
export type Olympian = {
  readonly id: SynoId;
  readonly parent: SynoRef;
  readonly child: SynoRef;
  readonly name: string;
};
