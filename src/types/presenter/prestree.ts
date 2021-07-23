import type { PresnoMap } from "./presno-map";
import type { SynoId } from "../syno-id";
export type Prestree = {
  readonly presnos: PresnoMap;
  readonly rootId: SynoId;
};