import type { SynoId } from "../../../../types/syno-id";
import type { PresnoRef } from "../../../../types/presenter/presno-ref";
export type CorePresnoAttrs = {
  readonly synoId: SynoId;
  readonly parent: PresnoRef;
};
